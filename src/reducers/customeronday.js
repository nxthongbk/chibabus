let initialState = [];
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_CUSTOMERONDAY": {
            return [...action.customeronday]
        }
    }
    return [...state]
}
export default myReducer;