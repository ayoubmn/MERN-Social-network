import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NoNotif from '../images/no_notif1.png'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import moment from 'moment'
import { isReadNotif, NOTIF_TYPES, deleteAllNotifications } from '../redux/actions/NotifAction'

const NotifModal = () => {
    const { auth, notif } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleIsRead = (msg) => {
        dispatch(isReadNotif({msg, auth}))
    }

    const handleSound = () => {
        dispatch({type: NOTIF_TYPES.UPDATE_SOUND, payload: !notif.sound})
    }

    const handleDeleteAll = () => {
        const newArr = notif.data.filter(item => item.isRead === false)
        if(newArr.length === 0) return dispatch(deleteAllNotifications(auth.token))

        if(window.confirm(`You have ${newArr.length} unread notifications. Are you sure you want to delete all?`)){
            return dispatch(deleteAllNotifications(auth.token))
        }
    }

    return (
        <div style={{minWidth: '300px'}}>
            <div className="d-flex justify-content-between align-items-center px-3">
                <h3>Notification</h3>
                {
                    notif.sound 
                    ? <i className="fas fa-volume-up text-info" 
                    style={{fontSize: '1.2rem', cursor: 'pointer'}}
                    onClick={handleSound} />

                    : <i className="fas fa-volume-mute text-dark"
                    style={{fontSize: '1.2rem', cursor: 'pointer'}}
                    onClick={handleSound} />
                }
            </div>
            <hr className="mt-0" />

            {
                notif.data.length === 0 &&
                <img src={NoNotif} alt="NoNotice" className="w-100" />
            }

            <div style={{maxHeight: 'calc(100vh - 200px)', overflow: 'auto'}}>
                {
                    notif.data.map((msg, index) => (
                        <div key={index} className="px-2 mb-3" style={{backgroundColor: msg.text.includes("mention") ?'#D7CCC8': msg.text.includes("like") ? '#FFCA28':'#80D8FF'}} >
                            <Link to={`${msg.url}`} className="d-flex text-dark align-items-center"
                            onClick={() => handleIsRead(msg)}>
                                <Avatar src={msg.user.avatar} size="big-avatar" />

                                <div className="mx-1 flex-fill">
                                    <div>
                                        <strong className="mr-1">{msg.user.username}</strong>
                                        <span>{msg.text}</span>
                                    </div>
                                    {msg.content && <small>{msg.content.slice(0,20)}...</small>}
                                </div>

                                {
                                    msg.image &&
                                    <div style={{width: '30px'}}>
                                        {
                                            msg.image.match(/video/i)
                                            ? <video src={msg.image} width="100%" />
                                            : <Avatar src={msg.image} size="medium-avatar" />
                                        }
                                    </div>
                                }
                                
                            </Link>
                            <small className="text-muted d-flex justify-content-between px-2">
                                {moment(msg.createdAt).fromNow()}
                                {
                                    !msg.isRead && <i className="fas fa-circle text-primary" />
                                }
                            </small>
                        </div>
                    ))
                }

            </div>

            <hr className="my-1" />
            <div className="text-right text-danger mr-2" style={{cursor: 'pointer'}}
            onClick={handleDeleteAll}>
                Delete All
            </div>

        </div>
    )
}
export default NotifModal