import React, { Component } from 'react';
import {fetchUsers} from '../apiCalls/requests';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { applyFilter, removeUser, activateUser } from '../actions/actions';
import userSelector from '../selectors/usersSelector';
import UserModal from './UserModal';
import moment from 'moment';

class ListingPage extends Component {
	constructor(props) {
        super(props);
        this.fetchUserData = this.fetchUserData.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.computeAge = this.computeAge.bind(this);
        this.activateUser = this.activateUser.bind(this);
    }

    applyFilter(event) {
        const inputQuery = event.target.value;
        this.props.dispatch(applyFilter(inputQuery));
    }

    removeUser( id ) {
        this.props.dispatch(removeUser(id));
    }

    activateUser(user) {
        this.props.dispatch(activateUser(user));
    }

    computeAge(dob) {
        const age = moment().diff(dob, 'years', true);
        return Math.round(age) ;        
    }

    fetchUserData() {
        if(this.props.users && this.props.users.length) {
            const filteredUsers = userSelector(this.props.users, this.props.filters);
            var usersData = filteredUsers.map((user) => {
                return (
                    <tr key={`user-${user.id}`}>
                        <td>
                            <Link className="table__content" to={`/details/${user.id}`}>{`${user.firstName} ${user.lastName}`}</Link>
                        </td>
                        <td className="table__content" id={`userDOB-${user.id}`}>{moment(user.DOB, 'DD-MM-YYYY').format('DD MMM YYYY')}</td>
                        <td className="table__content" id={`userAge-${user.id}`}>{this.computeAge(moment(user.DOB, 'DD-MM-YYYY').format('MM DD YYYY'))}</td>
                        <td className="table__content" id={`userEmail-${user.id}`}>{user.email}</td>
                        <td className="table__content" id={`userPhone-${user.id}`}>{user.phone}</td>
                        <td className="table__content" id={`userActive-${user.id}`}>
                            <span className={user.active === true ? "greenDot" : "redDot"}></span>
                        </td>
                        <td className="table__content">
                            <UserModal title='Edit' type='edit' user={user}/>
                        </td>
                        <td className="table__content">
                            <button className="button" onClick={() => this.removeUser(user.id)} >Remove</button>
                        </td>
                        <td className="table__content">
                            <button className="button activateButton" onClick={() => this.activateUser(user)} >{user.active ? 'De-activate' : 'Activate'}</button>
                        </td>
                    </tr>
                );
            });
            return usersData;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <div className="header__content">
                        <h1 className="header__title">User Management System</h1>
                        <h2 className="header__subtitle">
                            An easy way to view and manage your users!
                        </h2>
                    </div>
                </div>
                <div className="body__content">   
                    <input className="searchbar" type='text' placeholder='Search based on name or email...' onChange={this.applyFilter}/>
                    <div className="table">
                        <table>
                            <thead>
                                <tr className="table__headerRow">
                                    <th className="table__content"> Name </th>
                                    <th className="table__content"> DOB </th>
                                    <th className="table__content"> Age </th>
                                    <th className="table__content"> Email </th>
                                    <th className="table__content"> Phone </th>
                                    <th className="table__content"> Active </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.fetchUserData()}
                            </tbody>
                        </table>
                    </div>
                    <UserModal title='Add User' type='add'/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ListingPage);