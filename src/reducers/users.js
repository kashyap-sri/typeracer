//users reducer

const usersDefaultState = [];

export default (state = usersDefaultState, action) => {
    switch (action.type) {
        case 'ADD_USER': 
            return [...state, action.user];
        case 'EDIT_USER': return state.map((item) => {
            if(item.id === action.user.id) {
                return action.user;
            } else {
                return item;
            }
        });
        case 'REMOVE_USER': return state.filter((user) => {
            return user.id != action.id;
        });
        case 'ACTIVATE_USER': return state.map((item) => {
            if(item.id === action.user.id) {
                return {
                    ...item,
                    active: !item.active
                };
            } else {
                return item;
            }
        });
        default:
            return state;
    }
};