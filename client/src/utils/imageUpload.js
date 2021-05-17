export  const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist !! "

    if(file.size > 1024* 1024)
    err = "File too large ! the limit is 1mb"

    if(file.type !== 'image/jpeg' && file.type !== 'image/png')
    err = "Image format not correct"

    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    for (const item of images){
        const formData = new FormData()
        if(item.camera){
            formData.append("file", item.camera)
        }else {
        formData.append("file", item)}
        formData.append("upload_preset", "whhr74mw")
        formData.append("cloud_name", "socialnetcloud")

        const res = await fetch("https://api.cloudinary.com/v1_1/socialnetcloud/image/upload",{
            method: "POST",
            body: formData
        })

        const data= await res.json()
        imgArr.push({public_id: data.public_id, url:data.secure_url})
    }
    return imgArr;

}

//export const deleteImage = async (images) => {
//    await cloudinary.uploader.destroy(user.cloudinary_id);
//}