import React from 'react'
import { Route } from 'react-router-dom'

const PrivateRoute = props => {
    const { component: Component, ...rest } = props

    return (
        <Route
            {...rest}
            render={matchProps => (
                <Component {...matchProps} />
            )}
        />
    )
}

export default PrivateRoute