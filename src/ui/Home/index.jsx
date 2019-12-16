import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
	body : { padding : theme.spacing(5, 0) },
	searchBox : {
		padding : theme.spacing(1),
		display : 'flex',
		alignItems : 'center',
		margin : theme.spacing(5, 0)
	},
	header : { textAlign : 'center' },
	input : {
		marginLeft : theme.spacing(1),
		flex : 1
	},
	searchPage : {
		display : 'block',
		textAlign : 'center'
	}
}))

export default function Home() {
	const classes = useStyles(),
		history = useHistory(),
		{ enqueueSnackbar } = useSnackbar(),
		[query, setQuery] = useState(),
		[employees, setEmployees] = useState([])

	async function fetchEmployees() {
		let res = await fetch('https://cors-anywhere.herokuapp.com/http://api.additivasia.io/api/v1/assignment/employees')

		res
			.json()
			.then(res => setEmployees(res))
			.catch(err => enqueueSnackbar(err, { variant : 'danger' }))
	}

	useEffect(() => {
		fetchEmployees()
	}, [])

	const handleChange = (e) => {
			setQuery(e.target.value)
		},
		handleSearch = (e) => {
			if (e) { e.preventDefault() }

			if (query) {
				let index = employees.findIndex((e) => {
					return e.match(new RegExp(query, 'i'))
				})

				if (index >= 0) {
					history.push(`/employee/${ employees[ index ] }`)
				} else {
					enqueueSnackbar('Couldn\'t find anyone', { variant : 'error' })
				}
			} else {
				enqueueSnackbar('Please enter your search', { variant : 'error' })
			}
		}

	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="stretch"
			className={ classes.body }
		>
			<Grid item xs={ 12 } className={ classes.searchPage }>
				<Typography variant="h3" className={ classes.header }>
					Employee Explorer
				</Typography>
				<Paper component="form" className={ classes.searchBox }>
					<InputBase
						className={ classes.input }
						placeholder="Search Employee"
						onChange={ handleChange }
					/>
					<IconButton type="submit" onSubmit={ handleSearch } onClick={ handleSearch }>
						<SearchIcon />
					</IconButton>
				</Paper>
			</Grid>
		</Grid>
	)
}