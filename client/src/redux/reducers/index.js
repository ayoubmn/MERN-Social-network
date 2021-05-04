import {combineReducers} from 'redux'
import auth from './AuthReducer'
import alert from '../actions/alertReducer'

export default combineReducers({

    auth,
    alert

})