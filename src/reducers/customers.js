let initialState = [];
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_CUSTOMERS": {
            return [...action.customers]
        }
    }
    return [...state]
}
export default myReducer;