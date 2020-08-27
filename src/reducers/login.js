let initialState = true;
const myReducer = (state= initialState, action) =>{
    switch (action.type){
        case "SET_LOGIN":{
            return action.login
        }
    }
    return state
}
export default myReducer;