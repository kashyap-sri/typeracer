import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import ListingPage from '../components/ListingPage';
import DetailsPage from '../components/DetailsPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch> 
                <Route path="/" component={ListingPage} exact={true}/>
                <Route path="/details/:user_id" component={DetailsPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;