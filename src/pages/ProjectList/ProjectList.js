import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

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
                    <h3>{el}</h3>
                    <p>{description}</p>
                    <button onClick={() => onClickHandler(el)} className="card__button">
                      See App
                    </button>
                  </div>
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}
