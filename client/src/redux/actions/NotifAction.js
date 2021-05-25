import { GLOBALTYPES } from './globalTypes'
import { postDataAPI, deleteDataAPI, getDataAPI, patchDataAPI } from '../../utils/fetchData'

export const NOTIF_TYPES = {
    GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
    CREATE_NOTIF: 'CREATE_NOTIF',
    REMOVE_NOTIF: 'REMOVE_NOTIF',
    UPDATE_NOTIF: 'UPDATE_NOTIF',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFICATIONS: 'DELETE_ALL_NOTIFICATIONS'
}

export const createNotif = ({msg, auth, socket}) => async (dispatch) => {
    try {
        const res = await postDataAPI('notif', msg, auth.token)

        socket.emit('createNotif', {
            ...res.data.notif,
            user: {
                username: auth.user.username,
                avatar: auth.user.avatar
            }
        })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const removeNotif = ({msg, auth, socket}) => async (dispatch) => {
    try {
        await deleteDataAPI(`notif/${msg.id}?url=${msg.url}`, auth.token)
        
        socket.emit('removeNotif', msg)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const getNotifications = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('notifications', token)
        
        dispatch({ type: NOTIF_TYPES.GET_NOTIFICATIONS, payload: res.data.notifications })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}


export const isReadNotif = ({msg, auth}) => async (dispatch) => {
    dispatch({type: NOTIF_TYPES.UPDATE_NOTIF, payload: {...msg, isRead: true}})
    try {
        await patchDataAPI(`/isReadNotif/${msg._id}`, null, auth.token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteAllNotifications = (token) => async (dispatch) => {
    dispatch({type: NOTIF_TYPES.DELETE_ALL_NOTIFICATIONS, payload: []})
    try {
        await deleteDataAPI('deleteAllNotif', token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}