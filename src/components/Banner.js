import React, { useEffect, useState } from 'react'
import {
  acceptAllCookies,
  acceptNoCookies,
  acceptSomeCookies,
  readCookieAcceptance,
} from '../utils/ls'

const defaultsLabels = {
  titleBox: `Cookies Box`,
  descriptionBox: `Minim voluptate reprehenderit magna consequat do sit aliqua.`,
  acceptAllLabel: `Accepter tout`,
  rejectAllLabel: `Rejeter tout`,
  chooseLabel: `Choisir`,
  saveLabel: `Enregistrer`,
}

function Banner({ bannerConfig }) {
  const [acceptedList, setAcceptedList] = useState([])

  useEffect(() => {
    console.log('acceptedList changed', acceptedList)
    // write your callback function here
  }, [acceptedList])
  function setAcceptedCookie(key) {
    // console.log('setAcceptedCookie key', key)
    // console.log('acceptedList before', acceptedList)
    const index = acceptedList.indexOf(key)
    console.log('pos', index)
    if (acceptedList.indexOf(key) === -1) {
      const next_arr = [...acceptedList, key]
      setAcceptedList(next_arr)
    } else {
      const next_arr = [
        ...acceptedList.slice(0, index),
        ...acceptedList.slice(index + 1),
      ]
      setAcceptedList(next_arr)
    }
  }
  const {
    labels: {
      titleBox,
      descriptionBox,
      acceptAllLabel,
      chooseLabel,
      rejectAllLabel,
      saveLabel,
    },
    cookiesList,
  } = bannerConfig
  const [displayCookiesList, setDisplayCookiesList] = useState(false)
  return (
    <div className="rgpd--container">
      <div className="rgpd--banner">
        <div className="rgpd--title">{titleBox || defaultsLabels.titleBox}</div>
        <div className="rgpd--content">
          {displayCookiesList ? (
            <div className="rgpd--cookies-list">
              {cookiesList.map((cookie, index) => {
                const { publicName, publicDescription, key, type } = cookie
                return (
                  <ul key={index} className="rgpd--cookie-item">
                    <li>
                      <div className="rgpd--cookie-name">{publicName}</div>
                      <div className="rgpd--cookie-description">
                        {publicDescription}
                      </div>
                    </li>
                    <li className="rgpd--cookie-type">{type}</li>
                    <li className="rgpd--cookie-checkzone">
                      <input
                        type={`checkbox`}
                        checked={readCookieAcceptance(cookiesList, key)}
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
                acceptSomeCookies(cookiesList, acceptedList)
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
