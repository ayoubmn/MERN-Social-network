import {combineReducers} from 'redux'
import auth from './AuthReducer'
import alert from '../actions/alertReducer'
import theme from '../reducers/themeReducer'


export default combineReducers({

    auth,
    alert,
    theme

})