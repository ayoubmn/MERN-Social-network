let users = [];
const SocketServer = (socket) => {
  socket.on("joinUser", (id) => {
    //console.log("SocketServer " + id);
    users.push({ id, socketId: socket.id });
  });
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    //console.log({ users });
  });

  //chat
  socket.on("addMessage", (msg) => {
    const user = users.find((user) => user.id === msg.recipient);
    user && socket.to(`${user.socketId}`).emit("addMessageToClient", msg);
  });

  //room
  socket.on("join_room", (data) => {
    socket.join(data);
    users.push({ socketId: socket.id });
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data.content);
  });



// Likes
socket.on('likePost', (newPost) => {
    console.log(newPost.user.friends)
    const ids = [...newPost.user.friends, newPost.user._id]
    
    const clients = users.filter(user => ids.includes(user.id))

    if(clients.length > 0){
        clients.forEach(client => {
            socket.to(`${client.socketId}`).emit('likeToClient', newPost)
        })
    }
})

socket.on('unLikePost', (newPost) => {
    const ids = [...newPost.user.friends, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))

    if(clients.length > 0){
        clients.forEach(client => {
            socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
        })
    }
})


// Comments
socket.on('createComment', (newPost) => {
    const ids = [...newPost.user.friends, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))

    if(clients.length > 0){
        clients.forEach(client => {
            socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
        })
    }
})

socket.on('deleteComment', (newPost) => {
    const ids = [...newPost.user.friends, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))

    if(clients.length > 0){
        clients.forEach(client => {
            socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
        })
    }
})

// Notification
socket.on('createNotif', msg => {
    const client = users.find(user => msg.recipients.includes(user.id))
    client && socket.to(`${client.socketId}`).emit('createNotifToClient', msg)
})

socket.on('removeNotif', msg => {
    const client = users.find(user => msg.recipients.includes(user.id))
    client && socket.to(`${client.socketId}`).emit('removeNotifToClient', msg)

})
};

module.exports = SocketServer;
