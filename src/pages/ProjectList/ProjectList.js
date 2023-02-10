import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

import './ProjectList.scss'
import '../../styles/filters.scss'

import { Context } from '../../App'

export const ProjectList = () => {
  const navigate = useNavigate()
  const { appContext, setAppContext, projectsContext } = useContext(Context)

  const onClickHandler = (project) => {
    setAppContext({ ...appContext, project })
    navigate(`/project/${project}`)
  }

  useEffect(() => {
    setAppContext({ ...appContext, headerOpen: true }) // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className="filters"></div>

      <div className="container padding">
        <div className="card__container">
          {projectsContext
            ? Object.keys(projectsContext).map((el, index) => {
                const { description } = projectsContext[el]
                return (
                  <div key={index} className="card">
                    <div className="card__body">
                      <div className="card__header">{el}</div>
                      <div className="card__issue">{description}</div>
                      <Button onClick={() => onClickHandler(el)} className="card__button">
                        See App
                      </Button>
                    </div>
                  </div>
                )
              })
            : null}
        </div>
      </div>
    </div>
  )
}
