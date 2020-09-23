import React from 'react'
import { Switch, Route } from 'react-router'
import MyAccount from '../pages/MyAccount'

const ProtectedRoutes = () => {

    return (
        <Switch>
            <Route path='/myaccount' component={MyAccount} />
        </Switch>
    )
}

export default ProtectedRoutes
