import React, { useEffect, useState } from 'react'
import {
  acceptAllCookies,
  acceptNoCookies,
  acceptSomeCookies,
  readCookieAcceptance,
} from '../utils/ls'

const defaultsLabels = {
  icon: `🍪`,
  titleBox: `Cookies Box`,
  descriptionBox: `Minim voluptate reprehenderit magna consequat do sit aliqua.`,
  acceptAllLabel: `Accepter tout`,
  rejectAllLabel: `Rejeter tout`,
  chooseLabel: `Choisir`,
  saveLabel: `Enregistrer`,
  mandatoryLabel: `obligatoire`,
}

function Banner({ bannerConfig }) {
  const {
    labels: {
      icon,
      titleBox,
      descriptionBox,
      acceptAllLabel,
      chooseLabel,
      rejectAllLabel,
      saveLabel,
      mandatoryLabel,
    },
    cookiesList,
  } = bannerConfig

  function tempChecked() {
    const output = {}
    cookiesList?.forEach(cookie => {
      output[cookie.key] = readCookieAcceptance(cookiesList, cookie.key)
    })
    return output
  }
  const [checked, setChecked] = useState(tempChecked)
  const [displayCookiesList, setDisplayCookiesList] = useState(false)

  useEffect(() => {
    console.log('checked changed', checked)
    // write your callback function here
  }, [checked])

  function setAcceptedCookie(key) {
    const updatedValue = {}
    updatedValue[key] = !checked[key]
    setChecked({ ...checked, ...updatedValue })
  }

  return (
    <div className="rgpd--container">
      <div className="rgpd--banner">
        <div className="rgpd--header">
          <div className="rgpd--icon">{icon || defaultsLabels.icon}</div>
          <div className="rgpd--title">
            {titleBox || defaultsLabels.titleBox}
          </div>
        </div>
        <div className="rgpd--content">
          {displayCookiesList ? (
            <div className="rgpd--cookies-list">
              {cookiesList.map((cookie, index) => {
                const { publicName, publicDescription, key, type, mandatory } =
                  cookie

                return (
                  <ul key={index} className="rgpd--cookie-item">
                    <li>
                      <div className="rgpd--cookie-name">
                        {publicName}
                        {mandatory && (
                          <span className="rgpd--cookie-mandatory">
                            {' '}
                            ({mandatoryLabel || defaultsLabels.mandatoryLabel})
                          </span>
                        )}
                      </div>
                      <div className="rgpd--cookie-description">
                        {publicDescription}
                      </div>
                    </li>
                    <li className="rgpd--cookie-type">{type}</li>
                    <li className="rgpd--cookie-checkzone">
                      <input
                        type={`checkbox`}
                        name={key}
                        disabled={mandatory === true}
                        checked={checked[key]}
                        onChange={e => {
                          setAcceptedCookie(key)
                        }}
                      />
                    </li>
                  </ul>
                )
              })}
            </div>
          ) : (
            <p>{descriptionBox}</p>
          )}
        </div>
        <div className="rgpd--footer">
          {!displayCookiesList && (
            <button
              className="rgpd--btn"
              onClick={() => {
                setDisplayCookiesList(!displayCookiesList)
              }}
            >
              {chooseLabel || defaultsLabels.chooseLabel}
            </button>
          )}
          <button
            className="rgpd--btn"
            onClick={() => {
              acceptAllCookies(cookiesList)
            }}
          >
            {acceptAllLabel || defaultsLabels.acceptAllLabel}
          </button>
          <button
            className="rgpd--btn"
            onClick={() => {
              acceptNoCookies(cookiesList)
            }}
          >
            {rejectAllLabel || defaultsLabels.rejectAllLabel}
          </button>
          {displayCookiesList && (
            <button
              className="rgpd--btn"
              onClick={() => {
                acceptSomeCookies(cookiesList, checked)
              }}
            >
              {saveLabel || defaultsLabels.saveLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner
