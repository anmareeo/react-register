import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './SignUp'
import AppBar from './AppBar'
import UsersF from './UsersF'


export default function MainRouter() {

    return (
        <div>
            <Router>
                <AppBar></AppBar>
                <Switch>
                    <Route path="/signup">
                        <Signup initialMessage="Please Register"></Signup>
                    </Route>
                    <Route path="/users">
                        <UsersF></UsersF>
                    </Route>
                    <Route path="/">
                        <Login initialMessage="Welcome"></Login>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}