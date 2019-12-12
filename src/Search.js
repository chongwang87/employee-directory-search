import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

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
	circular : { margin : theme.spacing(5) },
	searchPage : {
		display : 'block',
		textAlign : 'center'
	},
	searchResult : { display : 'block' },
	fetching : { textAlign : 'center' },
	employeeOverview : {
		padding : theme.spacing(3),
		margin : theme.spacing(5, 0)
	}
}))

export default function Search() {
	const classes = useStyles(),
		{ enqueueSnackbar } = useSnackbar(),
		[query, setQuery] = useState(),
		[result, setResult] = useState(),
		[employees, setEmployees] = useState([
			'John Hartman',
			'Samad Pitt',
			'Amaya Knight',
			'Leanna Hogg',
			'Aila Hodgson',
			'Vincent Todd',
			'Faye Oneill',
			'Lynn Haigh',
			'Nylah Riddle'
		]),
		[employee, setEmployee] = useState(null)

	async function fetchEmployees() {
		let res = await fetch('https://cors-anywhere.herokuapp.com/http://api.additivasia.io/api/v1/assignment/employees')

		res
			.json()
			.then(res => setEmployees(res))
			.catch(err => enqueueSnackbar(err, { variant : 'danger' }))
	}

	async function fetchEmployee(employeeName) {
		let res = await fetch(`https://cors-anywhere.herokuapp.com/http://api.additivasia.io/api/v1/assignment/employees/${ employeeName }`)

		res
			.json()
			.then(res => setEmployee(res))
			.catch(err => enqueueSnackbar(err, { variant : 'danger' }))
	}

	useEffect(() => {
		// fetchEmployees()
	}, [])

	const handleChange = (e) => {
			setQuery(e.target.value)
		},
		handleSearch = (e) => {
			if (e) { e.preventDefault() }
			setEmployee(null)

			if (query) {
				let index = employees.findIndex((e) => {
					return e.match(new RegExp(query, 'i'))
				})

				if (index >= 0) {
					setResult(employees[ index ])
					fetchEmployee(employees[ index ])
					enqueueSnackbar('Done', { variant : 'success' })
				} else {
					setResult('')
					enqueueSnackbar('Couldn\'t find anyone', { variant : 'error' })
				}
			} else {
				enqueueSnackbar('Please enter your search', { variant : 'error' })
			}
		},
		handleReset = () => {
			setResult()
			setQuery()
		}

	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="stretch"
			className={ classes.body }
		>
			{ query && result ?
				<Grid item xs={ 12 } className={ classes.searchResult }>
					<Typography variant="h3" className={ classes.header }>
						Employee Overview
					</Typography>
					{ result &&
						<Paper className={ classes.employeeOverview }>
							{ !employee ?
								<Box className={ classes.fetching }>
									<CircularProgress className={ classes.circular } />
									<Typography variant="h5">
										Fetching { result } profile...
									</Typography>
								</Box>
								:
								<>
									{ employee && employee[ 1 ] ?
										<>
											<Typography variant="h5">
												{ `Subordinates of ${ employee[ 0 ] } ${ result }:` }
											</Typography>
											<ul>
												{ employee[ 1 ][ 'direct-subordinates' ] && employee[ 1 ][ 'direct-subordinates' ].length > 0 &&
													<>
														{
															employee[ 1 ][ 'direct-subordinates' ].map((e, i) => {
																return <li key={ i }>{ e }</li>
															})
														}
													</>
												}
											</ul>
											<Button
												variant="contained"
												onClick={ handleReset }
												startIcon={ <ArrowBackIosIcon />}
											>
												Back
											</Button>
										</>
										:
										<Typography variant="body1">
											{ `${ result } do not have any subordinate` }
										</Typography>
									}
								</>
							}
						</Paper>
					}
				</Grid>
				:
				<Grid item xs={ 12 } className={ classes.searchPage }>
					<Typography variant="h3" className={ classes.header }>
						Employee Explorer
					</Typography>
					{ employees.length > 0 ?
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
						:
						<CircularProgress className={ classes.circular } />
					}
				</Grid>
			}
		</Grid>
	)
}