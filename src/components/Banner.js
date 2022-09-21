import React, { useEffect, useState } from 'react'
import {
  acceptAllCookies,
  acceptNoCookies,
  acceptSomeCookies,
  readCookieAcceptance,
} from '../utils/ls'
import { graphql, useStaticQuery } from 'gatsby'

function Banner({
  icon,
  titleBanner,
  descriptionBanner,
  acceptAllLabel,
  chooseLabel,
  rejectAllLabel,
  saveLabel,
  mandatoryLabel,
  automaticlyInclude = false,
}) {
  const data = useStaticQuery(graphql`
    query {
      sitePlugin(name: { eq: "gatsby-plugin-rgpd-acceptance" }) {
        pluginOptions
      }
    }
  `)
  const { labels: confLabels, cookiesList } = data.sitePlugin.pluginOptions

  const _icon = icon || confLabels.icon
  const _titleBanner = titleBanner || confLabels.titleBanner
  const _descriptionBanner = descriptionBanner || confLabels.descriptionBanner
  const _acceptAllLabel = acceptAllLabel || confLabels.acceptAllLabel
  const _chooseLabel = chooseLabel || confLabels.chooseLabel
  const _rejectAllLabel = rejectAllLabel || confLabels.rejectAllLabel
  const _saveLabel = saveLabel || confLabels.saveLabel
  const _mandatoryLabel = mandatoryLabel || confLabels.mandatoryLabel

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
    // console.log('checked changed', checked)
    // write your callback function here
  }, [checked])

  function setAcceptedCookie(key) {
    const updatedValue = {}
    updatedValue[key] = !checked[key]
    setChecked({ ...checked, ...updatedValue })
  }

  return (
    <div
      className={`rgpd--banner${
        automaticlyInclude ? ' automaticly-include' : ''
      }`}
    >
      <div className="rgpd--header">
        <div className="rgpd--icon">{_icon}</div>
        <div className="rgpd--title">{_titleBanner}</div>
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
                          ({_mandatoryLabel})
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
          <p dangerouslySetInnerHTML={{ __html: _descriptionBanner }}></p>
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
            {_chooseLabel}
          </button>
        )}
        <button
          className="rgpd--btn"
          onClick={() => {
            acceptAllCookies(cookiesList)
          }}
        >
          {_acceptAllLabel}
        </button>
        <button
          className="rgpd--btn"
          onClick={() => {
            acceptNoCookies(cookiesList)
          }}
        >
          {_rejectAllLabel}
        </button>
        {displayCookiesList && (
          <button
            className="rgpd--btn"
            onClick={() => {
              acceptSomeCookies(cookiesList, checked)
            }}
          >
            {_saveLabel}
          </button>
        )}
      </div>
    </div>
  )
}

export default Banner
