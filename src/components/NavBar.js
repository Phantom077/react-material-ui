import React, { Component } from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core'

export default class NavBar extends Component {

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            React & Material-UI Sample Application
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
