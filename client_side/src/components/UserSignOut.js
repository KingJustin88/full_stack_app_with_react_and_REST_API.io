import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class UserSignOut extends Component {
    render() {
        const {context} = this.props
        context.actions.signOut();
        return(
            <Redirect to="/"/>
        )
    }
}