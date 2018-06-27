import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { computeAge } from  '../helper/helperMethods';

const DetailsPage =  ( props ) => {
    return (
        <div className="details">
            <div className="details__header">
                <h1 className="details__headerContent">
                    {`${props.user[0].firstName} ${props.user[0].lastName}`}
                    <span className={props.user[0].active === true ? "greenDot" : "redDot"}></span>
                </h1>
            </div>
            <div className="details__body">
                <div className="details__bodyContent">
                    <h2>Date Of Birth: {props.user[0].DOB}</h2>
                </div>
                <div className="details__bodyContent">
                    <h2>Age: {computeAge(props.user[0].DOB)}</h2>
                </div>
                <div className="details__bodyContent">
                    <h2>Email: {props.user[0].email}</h2>
                </div>
                <div className="details__bodyContent">
                    <h2>Phone: {props.user[0].phone}</h2>
                </div>
                <div className="details__bodyContent">
                    <Link className="details__backButton button" to='/'> Go Back! </Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, props) => {
    const user = state.users.filter((data) => {
        return data.id == props.match.params.user_id;
    });
    return {
      user
    };
  };

export default connect(mapStateToProps)(DetailsPage);