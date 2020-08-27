import { combineReducers } from 'redux';
import devices from './device';
import buscounter from './buscounter';
import customeronday from './customeronday';
import customeronmonth from './customeronmonth';
import isLogin from './login';

const myReducer = combineReducers({
    devices,
    buscounter,
    customeronday,
    customeronmonth,
    isLogin
})
 
 export default myReducer;