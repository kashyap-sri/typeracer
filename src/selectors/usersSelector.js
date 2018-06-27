// to show the filtered users on the screen all the time

export default ( users, { query } ) => {
    const filteredUsers = users.filter((user) => {
        const userName = `${user.firstName}${user.lastName}`;
        const userEmail = user.email;
        return userName.toLowerCase().includes(query.toLowerCase()) 
                || userEmail.toLowerCase().includes(query.toLowerCase());
    });
    return filteredUsers;
}