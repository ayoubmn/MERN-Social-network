import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../redux/actions/globalTypes'
import cloudinary from '../utils/cloudinary'
import {createPost, updatePost} from '../redux/actions/postAction'


const StatusModal = () => {
    const {auth, theme, status, socket} = useSelector(state=>state)
    const dispatch = useDispatch()
    const [content, setContent]= useState('')
    const [images, setImages] = useState([])
    const[stream, setStream]=useState(false)
    const videoRef = useRef()
    const refCanvas= useRef()
    const [tracks, setTracks] = useState('')
    let oldImages = status.images

    const handleChangeImages = e => {
        const files = [...e.target.files]
        console.log(files)
        let err=""
        let newImages=[]
        files.forEach(file => {
            if(!file) return err = "File doesn't exist!"
            if(file.type !== 'image/jpeg' &&file.type !== 'image/png'){
                return err = "Incorrect format, please choose another image"
            }
            return newImages.push(file)
        })
        if(err) dispatch({type: GLOBALTYPES.ALERT, payload: {error: err} })
        setImages([...images, ...newImages])
    }
    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }
    const handleStream =() => {
        setStream(true)
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({video: true})
            .then(mediaStream => {
                videoRef.current.srcObject = mediaStream
                videoRef.current.play()
                const tracks= mediaStream.getTracks()
                setTracks(tracks[0])
            }).catch(err => console.log(err))
        }
    }
    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)
        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, {camera: URL}])
    }
    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(images.length === 0)
        return dispatch({
            type: GLOBALTYPES.ALERT, payload: {error: "please add a photo"}
        })
            if(status.onEdit){
                let imgOldUrl = images.filter(img => img.url) 
                if(oldImages.length !== imgOldUrl.length){
                    
                    oldImages = oldImages.filter(val => !imgOldUrl.includes(val));
                   console.log(oldImages)
                   oldImages.map(item => {
                        cloudinary.uploader.destroy(
                            item.public_id,
                            {
                                invalidate: true
                            }, 
                            function(error, result) {
                                console.log(result, error)
                                return error;
                            }
                        );
                    })
                }
                dispatch(updatePost({content, images, auth, status}))

            }else{
                dispatch(createPost({content, images, auth, socket}))
            }

        setContent('')
        setImages([])
        if(tracks) tracks.stop()
        dispatch({type: GLOBALTYPES.STATUS, payload:false})
    }
    useEffect(() =>{
        if(status.onEdit){
            setContent(status.content)
            setImages(status.images)
            console.log(oldImages)
        }
    },[status])

         return (
             <div className="status_modal">
                 <form onSubmit={handleSubmit}>
                     <div className="status_header">
                         <h5 className="m-0">Create a post </h5>
                         <span onClick={() => dispatch({
                             type: GLOBALTYPES.STATUS, payload:false
                         })}> &times;</span>
                     </div>

                     <div className="status_body">
                         <textarea name="content" value={content}
                         placeholder={`${ auth.user.username }, whatcha thinking about ?` } 
                         onChange={e => setContent(e.target.value)} />

                         <div className="show_images">
                            {
                                images.map((img, index) => (
                                    <div key={index} id="file_img">
                                        <img src={img.camera ? img.camera : 
                                        img.url ? img.url : URL.createObjectURL(img)} alt="images"
                                        style={{filter: theme?'invert(1)':'invert(0)'}}
                                        className="img-thumbnail" />
                                        <span onClick={() => deleteImages(index)}> &times;</span>
                                    </div>
                                ))
                            }
                         </div>
                            {
                                stream && 
                                <div className="stream position-relative">
                                    <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                    style={{filter: theme? 'invert(1)' : 'invert(0)'}} />
                                    <span onClick={handleStopStream}>&times;</span>
                                    <canvas ref={refCanvas} style={{display: 'none'}}/>
                                </div>
                            }
                        <div className="input_images">
                        {
                            stream ? <i className="fas fa-camera" onClick={handleCapture} />
                            : <><i className="fas fa-camera" onClick={handleStream} />
                            <div className="file_upload">
                                <i className="fas fa-image" />
                                <input type="file" name="file" id="file" 
                                multiple accept="image/*" onChange= {handleChangeImages}/>
                                </div>
                                </>

                        }

                            
                            
                        </div>
                     </div>

                     <div className="status_footer">
                         <button className="btn btn-secondary w-100" type="submit">Post</button>

                     </div>
                 </form>

             </div>

         )   
}

export default StatusModal;