import { combineReducers } from 'redux';
import devices from './device';
import buscounter from './buscounter';
const myReducer = combineReducers({
    devices,
    buscounter
})
 
 export default myReducer;