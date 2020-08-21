let initialState = [];
const myReducer = (state= initialState, action) =>{
    switch (action.type){
        case "UPDATE_DEVICE":{
            return [...action.devices]
        }
    }
    return [...state]
}
export default myReducer;