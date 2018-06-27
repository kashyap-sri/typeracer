import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addUser } from './actions/actions';
import uuid from 'uuid';
import { fetchUsers } from './apiCalls/requests';
import moment from 'moment';

const store = configureStore();


let users = localStorage.getItem("users");
if(users) {
    users = JSON.parse(users).users;
    users = users.map((user) => {
        return {
            firstName: user.first_name, 
            lastName: user.last_name,
            phone: user.phone, 
            DOB: moment(user.dob).format('DD-MM-YYYY'), 
            email: user.email, 
            age: null, 
            'active': user.active,
            'id': uuid()  
        };
    });
    users.forEach((user) => {
        store.dispatch(addUser(user));
    });
} else {
    fetchUsers().then((response) => {
        localStorage.setItem("users", JSON.stringify(response.data));
        const users = response.data.users.map((user) => {
            return {
                firstName: user.first_name, 
                lastName: user.last_name,
                phone: user.phone, 
                DOB: moment(user.dob).format('DD-MM-YYYY'), 
                email: user.email, 
                age: null, 
                'active': user.active,
                'id': uuid()  
            };
        });
        users.forEach((user) => {
            store.dispatch(addUser(user));
        });
    });
}

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
