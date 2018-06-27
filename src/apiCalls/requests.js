import axios from 'axios';

export const fetchUsers = () => {
    return axios.get('https://api.myjson.com/bins/czfgy');
}