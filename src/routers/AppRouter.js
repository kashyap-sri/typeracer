import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Landing from '../components/Landing.js';


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch> 
                <Route path="/" component={Landing} exact={true}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;