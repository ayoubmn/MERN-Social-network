import { NOTIF_TYPES } from '../actions/NotifAction'
import { EditData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    data: [],
    sound: false
}

const notifReducer = (state = initialState, action) => {
    switch (action.type){
        case NOTIF_TYPES.GET_NOTIFICATIONS:
            return {
                ...state,
                data: action.payload
            };
        case NOTIF_TYPES.CREATE_NOTIF:
            return {
                ...state,
                data: [action.payload, ...state.data]
            };
        case NOTIF_TYPES.REMOVE_NOTIF:
            return {
                ...state,
                data: state.data.filter(item => (
                    item.id !== action.payload.id || item.url !== action.payload.url
                ))
            };
        case NOTIF_TYPES.UPDATE_NOTIF:
            return {
                ...state,
                data: EditData(state.data, action.payload._id, action.payload)
            };
        case NOTIF_TYPES.UPDATE_SOUND:
            return {
                ...state,
                sound: action.payload
            };
        case NOTIF_TYPES.DELETE_ALL_NOTIFICATIONS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}


export default notifReducer