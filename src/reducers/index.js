import { combineReducers } from 'redux';
import devices from './device';
import buscounter from './buscounter';
import customeronday from './customeronday';
import customeronmonth from './customeronmonth';

const myReducer = combineReducers({
    devices,
    buscounter,
    customeronday,
    customeronmonth
})
 
 export default myReducer;