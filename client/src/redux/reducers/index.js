import {combineReducers} from 'redux'
import auth from './AuthReducer'
import notify from '../actions/notifyReducer'

export default combineReducers({

    auth,
    notify

})