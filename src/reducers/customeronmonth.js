let initialState = [];
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_CUSTOMERONMONTH": {
            return [...action.customeronmonth]
        }
    }
    return [...state]
}
export default myReducer;