let initialState = false;
const myReducer = (state= initialState, action) =>{
    switch (action.type){
        case "SET_LOGIN":{
            return action.login
        }
    }
    return state
}
export default myReducer;