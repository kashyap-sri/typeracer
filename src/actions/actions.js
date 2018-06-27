// Add user
export const addUser = (
    {
        firstName = '',
        lastName = '', 
        phone = null, 
        email = '',
        DOB = '',
        active = true,
        age = null,
        id

    } = {}) => {
    return {
        type: 'ADD_USER',
        user: {
            firstName,
            lastName,
            phone,
            email,
            age,
            DOB,
            active,
            id
        }
    };
};

export const editUser = (
    {
        firstName = '',
        lastName = '', 
        phone = null, 
        email = '',
        DOB = '',
        active = true,
        age = null,
        id

    } = {}) => {
    return {
        type: 'EDIT_USER',
        user: {
            firstName,
            lastName,
            phone,
            email,
            age,
            DOB,
            active,
            id
        }
    };
};

export const removeUser = ( id ) => {
    return {
        type: 'REMOVE_USER',
        id
    };
};

export const activateUser = ( user ) => {
    return {
        type: 'ACTIVATE_USER',
        user
    };
}

//Apply filter
export const applyFilter = ( query ) => {
    return {
        type: 'APPLY_FILTER',
        query
    }
}