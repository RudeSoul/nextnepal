import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router'

const PrivateRoute = ({ component: Component, user, ...rest }) => {

    return (
        <Route {...rest} render={(props) => (
            (user)
                ? <Component {...props} pathName={window.location.pathname}/>
                : <Redirect to='/login' />
        )} />
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(PrivateRoute)
