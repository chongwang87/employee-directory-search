import React from 'react'

import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

import { SnackbarProvider } from 'notistack'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

import Search from './Search'

export default function App() {
	const theme = createMuiTheme({ palette : {
		primary : blue,
		secondary : red
	} })

	return (
		<>
			<CssBaseline />
			<ThemeProvider theme={ theme }>
				<SnackbarProvider>
					<Container>
						<Search />
					</Container>
				</SnackbarProvider>
			</ThemeProvider>
		</>
	)
}