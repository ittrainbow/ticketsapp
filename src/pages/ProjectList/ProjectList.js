import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

import './ProjectList.scss'

import { Context } from '../../App'

export const ProjectList = () => {
  const navigate = useNavigate()
  const { appContext, setAppContext, projectsContext } = useContext(Context)

  const onClickHandler = (project) => {
    setAppContext({ ...appContext, project })
    navigate(`/project/${project}`)
  }

  return (
    <div className="container">
      <div className="card__container">
        {projectsContext
          ? Object.keys(projectsContext).map((el, index) => {
              const { description } = projectsContext[el]
              return (
                <div key={index} className="card">
                  <div className="card__body">
                    <div className="card__header">{el}</div>
                    <div className="card__description">{description}</div>
                    <div className="card__icons">
                      <Button onClick={() => onClickHandler(el)} className="card__button">
                        See App
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}
