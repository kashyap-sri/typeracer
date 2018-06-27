//users reducer

const filtersDefaultState = {
    query: ''
};

export default (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'APPLY_FILTER': 
            return {
                ...state,
                query: action.query
            };
        default:
            return state;
    }
};