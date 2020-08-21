let initialState = [];
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_BUSCOUNTER": {
            return [...action.buscounter]
        }
    }
    return [...state]
}
export default myReducer;