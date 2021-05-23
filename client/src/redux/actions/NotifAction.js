import { GLOBALTYPES} from './globalTypes'
import {postDataAPI, deleteDataAPI} from '../../utils/fetchData'

export const createNotif = ({msg, auth, socket}) => async (dispatch) => {
    try {
        const res = await postDataAPI('notif', msg, auth.token)
        console.log(res)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const removeNotif = ({msg, auth, socket}) => async (dispatch) => {
    try {
        const res = await deleteDataAPI(`notif/${msg.id}?url=${msg.url}`, auth.token)
        console.log(res)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}