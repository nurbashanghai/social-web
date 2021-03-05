import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import MainPage from "../MainPage/MainPage";
import Header from "../Header/Header";
import MessagesFireBase from "../Messages/Messages-FireBase";
import NaviBar from "../Header2/NaviBar";



const Routes = () => {
    return (
        <BrowserRouter>
            {/*<Header/>*/}
            <NaviBar/>
            <Switch>
                <Route exact path={'/'} component={MainPage} />
                <Route path={'/register'} component={Register} />
                <Route path={'/login'} component={Login} />
                <Route path={'/messages'} component={MessagesFireBase}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
