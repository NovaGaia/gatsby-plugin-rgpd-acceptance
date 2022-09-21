import React, { useEffect, useState } from 'react'
import {
  acceptAllCookies,
  acceptNoCookies,
  acceptSomeCookies,
  hasValidatedAcceptance,
  readCookieAcceptance,
} from '../utils/ls'
import { graphql, useStaticQuery } from 'gatsby'

function InternalBanner({
  icon,
  titleBanner,
  descriptionBanner,
  acceptAllLabel,
  chooseLabel,
  rejectAllLabel,
  saveLabel,
  mandatoryLabel,
  cookiesList,
}) {
  function tempChecked() {
    const output = {}
    cookiesList?.forEach(cookie => {
      output[cookie.key] = readCookieAcceptance(cookiesList, cookie.key)
    })
    return output
  }
  const [checked, setChecked] = useState(tempChecked)
  const [displayCookiesList, setDisplayCookiesList] = useState(false)
  const [showMiniBanner, setShowMiniBanner] = useState(hasValidatedAcceptance())

  useEffect(() => {
    // console.log('checked changed', checked)
    // write your callback function here
  }, [checked])

  function setAcceptedCookie(key) {
    const updatedValue = {}
    updatedValue[key] = !checked[key]
    setChecked({ ...checked, ...updatedValue })
  }

  console.log('showMiniBanner', showMiniBanner)
  if (showMiniBanner) {
    return (
      <div className="rgpd--banner mini">
        <div className="rgpd--icon">{icon}</div>
        <button
          className="rgpd--btn"
          onClick={() => {
            setShowMiniBanner(false)
          }}
        >
          {chooseLabel}
        </button>
      </div>
    )
  } else {
    return (
      <div className={`rgpd--banner full`}>
        <div className="rgpd--header">
          <div className="rgpd--icon">{icon}</div>
          <div className="rgpd--title">{titleBanner}</div>
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
                            ({mandatoryLabel})
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
            <p dangerouslySetInnerHTML={{ __html: descriptionBanner }}></p>
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
              {chooseLabel}
            </button>
          )}
          <button
            className="rgpd--btn"
            onClick={() => {
              acceptAllCookies(cookiesList)
            }}
          >
            {acceptAllLabel}
          </button>
          <button
            className="rgpd--btn"
            onClick={() => {
              acceptNoCookies(cookiesList)
            }}
          >
            {rejectAllLabel}
          </button>
          {displayCookiesList && (
            <button
              className="rgpd--btn"
              onClick={() => {
                acceptSomeCookies(cookiesList, checked)
              }}
            >
              {saveLabel}
            </button>
          )}
        </div>
      </div>
    )
  }
}

/**
 *
 * @param {*} icon `String` Emoji Override plugin or config label (eg. for i18n).
 * @param {*} titleBanner `String` Override plugin or config label (eg. for i18n).
 * @param {*} descriptionBanner `String` Override plugin or config label (eg. for i18n).
 * @param {*} acceptAllLabel `String` Override plugin or config label (eg. for i18n).
 * @param {*} chooseLabel `String` Override plugin or config label (eg. for i18n).
 * @param {*} rejectAllLabel `String` Override plugin or config label (eg. for i18n).
 * @param {*} saveLabel `String` Override plugin or config label (eg. for i18n).
 * @param {*} mandatoryLabel `String` Override plugin or config label (eg. for i18n).
 * @param {*} asAContainer `Boolean` Add a container with `rgpd--container` classname.
 * @returns
 */
function Banner({
  icon,
  titleBanner,
  descriptionBanner,
  acceptAllLabel,
  chooseLabel,
  rejectAllLabel,
  saveLabel,
  mandatoryLabel,
  asAContainer = false,
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

  if (asAContainer) {
    return (
      <div className="rgpd--container">
        <InternalBanner
          icon={_icon}
          titleBanner={_titleBanner}
          descriptionBanner={_descriptionBanner}
          acceptAllLabel={_acceptAllLabel}
          chooseLabel={_chooseLabel}
          rejectAllLabel={_rejectAllLabel}
          saveLabel={_saveLabel}
          mandatoryLabel={_mandatoryLabel}
          cookiesList={cookiesList}
        />
      </div>
    )
  } else {
    return (
      <InternalBanner
        icon={_icon}
        titleBanner={_titleBanner}
        descriptionBanner={_descriptionBanner}
        acceptAllLabel={_acceptAllLabel}
        chooseLabel={_chooseLabel}
        rejectAllLabel={_rejectAllLabel}
        saveLabel={_saveLabel}
        mandatoryLabel={_mandatoryLabel}
      />
    )
  }
}

export default Banner
