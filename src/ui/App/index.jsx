import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

import { SnackbarProvider } from 'notistack'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

import Home from '../Home'
import Employee from '../Employee'

export default function App() {
	const theme = createMuiTheme({ palette : {
		primary : blue,
		secondary : red
	} })

	return (
		<Router>
			<CssBaseline />
			<ThemeProvider theme={ theme }>
				<SnackbarProvider>
					<Container>
						<Switch>
							<Route exact path='/'>
								<Home />
							</Route>
							<Route path='/employee/:name'>
								<Employee />
							</Route>
						</Switch>
					</Container>
				</SnackbarProvider>
			</ThemeProvider>
		</Router>
	)
}