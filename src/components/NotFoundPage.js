import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
    <div className="notFound">
        <h2 className="notFound__header">404! Not Found</h2>
        <NavLink className="notFound__button" to='/'>Go Home!</NavLink>
    </div>
);