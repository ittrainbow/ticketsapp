import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Stack, Grid, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core'

import { Context } from '../App'

const useStyles = makeStyles({
  card: {
    transition: '0.1s',
    minWidth: 260,
    maxWidth: 300,
    '&:hover': { transform: 'scale(1.04)' }
  }
})

export const ProjectList = () => {
  const navigate = useNavigate()
  const classes = useStyles()
  const { appContext, setAppContext, projectsContext } = useContext(Context)

  const onClickHandler = (project) => {
    setAppContext({ ...appContext, project })
    navigate(`/project/${project}`)
  }

  useEffect(() => {
    setAppContext({ ...appContext, headerOpen: true }) // eslint-disable-next-line
  }, [])

  return (
    <Grid container mt={6} spacing={2}>
      {projectsContext
        ? Object.keys(projectsContext).map((el, index) => {
            const { description } = projectsContext[el]
            return (
              <Grid item key={index} className={classes.card}>
                <Stack
                  spacing={2}
                  sx={{ border: '2px solid lightgrey', borderRadius: '5px', padding: '10px' }}
                >
                  <Typography variant="h5">{el}</Typography>
                  <Typography variant="subtitle1">{description}</Typography>
                  <Button onClick={() => onClickHandler(el)}>
                    See App
                  </Button>
                </Stack>
              </Grid>
            )
          })
        : null}
    </Grid>
  )
}