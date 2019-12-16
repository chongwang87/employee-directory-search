import s from 'underscore.string'
import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { Link, useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useParams } from 'react-router-dom'

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

export default function Employee(props) {
	const employeesData = [],
		classes = useStyles(),
		history = useHistory(),
		{ name } = useParams(),
		{ enqueueSnackbar } = useSnackbar(),
		[isReady, setIsReady] = useState(false),
		[employee, setEmployee] = useState(null),
		[employees, setEmployees] = useState({})

	async function fetchEmployee(employeeName, done) {
		let res = await fetch(`http://api.additivasia.io/api/v1/assignment/employees/${ employeeName }`)

		res.json()
			.then(res => {
				if (employeeName == name) {
					setEmployee(res)
				}
				employeesData.push({
					name : employeeName,
					designation : res[ 0 ],
					subordinates : res[ 1 ] && res[ 1 ][ 'direct-subordinates' ] ? res[ 1 ][ 'direct-subordinates' ] : []
				})
				if (done) {
					setEmployees(employeesData)
					setIsReady(true)
				}
			})
			.catch(err => enqueueSnackbar(err, { variant : 'danger' }))
	}

	async function fetchEmployees() {
		let res = await fetch('http://api.additivasia.io/api/v1/assignment/employees')

		res
			.json()
			.then(res => {
				res.forEach((e, i) => {
					fetchEmployee(e, i == res.length - 1)
				})
			})
			.catch(err => enqueueSnackbar(err, { variant : 'danger' }))
	}

	useEffect(() => {
		fetchEmployees()
	}, [name])

	const handleWorkFor = (name) => {
			let res = employees.find((e, i) => {
				return !!(e.subordinates && e.subordinates.length > 0 && e.subordinates.findIndex((f) => f == name) >= 0)
			})

			return res ? res.name : false
		},
		handleBack = () => {
			history.goBack()
		}

	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="stretch"
			className={ classes.body }
		>
			{ isReady &&
				<Grid item xs={ 12 } className={ classes.searchResult }>
					<Typography variant="h3" className={ classes.header }>
						Employee Overview
					</Typography>
					<Paper className={ classes.employeeOverview }>
						{ !employee ?
							<Box className={ classes.fetching }>
								<CircularProgress className={ classes.circular } />
								<Typography variant="h5">
									Fetching { name } profile...
								</Typography>
							</Box>
							:
							<>
								{ employee &&
									<>
										<Typography variant="h4">
											{ name }
										</Typography>
										<Typography variant="body1">
											{ `Designation : ${ s(employee[ 0 ]).titleize().value() }` }
										</Typography>
										{ handleWorkFor(name) &&
											<Typography variant="body1">
												{ 'Work for :' } <Link to={ `/employee/${ handleWorkFor(name) }` }>{ handleWorkFor(name) }</Link>
											</Typography>
										}
										{ employee[ 1 ] && employee[ 1 ][ 'direct-subordinates' ] && employee[ 1 ][ 'direct-subordinates' ].length > 0 ?
											<>
												<Typography variant="body1">
													{ 'Subordinates : ' }
												</Typography>
												<ul>
													{
														employee[ 1 ][ 'direct-subordinates' ].map((e, i) => {
															return <li key={ i }>
																<Link to={`/employee/${ e }`}>{ e }</Link>
															</li>
														})
													}
												</ul>
											</>
											:
											<Typography variant="body1">
												{ 'Do not have any subordinates.' }
											</Typography>
										}
										<Button
											variant="contained"
											startIcon={ <ArrowBackIosIcon /> }
											component={ Link }
											to="/"
										>
											Back
										</Button>
									</>
								}
							</>
						}
					</Paper>
				</Grid>
			}
		</Grid>
	)
}