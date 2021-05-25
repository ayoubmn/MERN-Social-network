import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POST_TYPES } from './redux/actions/postAction'
import { NOTIF_TYPES } from './redux/actions/NotifAction'
import { MESS_TYPES } from './redux/actions/messageAction'

import audio from './audio/notif_sound.mp3'


const spawnNotification = (body, icon, url, title) => {
    let options = {
        body, icon
    }
    let n = new Notification(title, options)

    n.onclick = e => {
        e.preventDefault()
        window.open(url, '_blank')
    }
}
const SocketClient = () => {
  const { auth, socket, notif } = useSelector((state) => state);
  const dispatch = useDispatch();

    const audioRef = useRef()

  useEffect(() => {
    socket.emit("joinUser", auth.user._id);
  }, [socket, auth.user._id]);

  //chat
  useEffect(() => {
    socket.on("addMessageToClient", (msg) => {
      console.log("socketClient " + JSON.stringify(msg));
      dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });
    });

    return () => socket.off("addMessageToClient");
  }, [socket, dispatch]);


    // joinUser
    useEffect(() => {
        socket.emit('joinUser', auth.user)
    },[socket, auth.user])

    // Likes
    useEffect(() => {
        socket.on('likeToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('likeToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('unLikeToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('unLikeToClient')
    },[socket, dispatch])


    // Comments
    useEffect(() => {
        socket.on('createCommentToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('createCommentToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('deleteCommentToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('deleteCommentToClient')
    },[socket, dispatch])


    // Notification
    useEffect(() => {
        socket.on('createNotifToClient', msg =>{
            dispatch({type: NOTIF_TYPES.CREATE_NOTIF, payload: msg})

            if(notif.sound) audioRef.current.play()
            spawnNotification(
                msg.user.username + ' ' + msg.text,
                msg.user.avatar,
                msg.url,
                'Garfieldo'
            )
        })

        return () => socket.off('createNotifToClient')
    },[socket, dispatch, notif.sound])

    useEffect(() => {
        socket.on('removeNotifToClient', msg =>{
            dispatch({type: NOTIF_TYPES.REMOVE_NOTIF, payload: msg})
        })

        return () => socket.off('removeNotifToClient')
    },[socket, dispatch])

    return (
      <>
          <audio controls ref={audioRef} style={{display: 'none'}} >
              <source src={audio} type="audio/mp3" />
          </audio>
      </>
  )
};

export default SocketClient;
