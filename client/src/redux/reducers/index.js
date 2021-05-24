import {combineReducers} from 'redux'
import auth from './AuthReducer'
import alert from '../actions/alertReducer'

import theme from './themeReducer'
import profile from './profileReducer'
import status from './statusReducer'
import homePosts from './postReducer'
import modal from './modalReducer'
import socket from "./socketReducer";
import message from "./messageReducer";
import detailPost from "./detailPostReducer";
import notif from "./notifReducer";


export default combineReducers({

    auth,
    alert,
    theme,
    profile,
    status,
    homePosts,
    modal,
    socket,
    message,
    detailPost,
    notif
})


