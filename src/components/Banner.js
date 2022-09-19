import React, { useEffect, useState } from 'react'
const labels = {
  titleBox: `Cookies Box`,
  descriptionBox: `Minim voluptate reprehenderit magna consequat do sit aliqua.`,
  acceptAllLabel: `Accepter`,
  rejectAllLabel: `Rejeter`,
  chooseLabel: `Choisir`,
  saveLabel: `Enregistrer`,
}
function Banner({ bannerConfig }) {
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
  //   console.log('bannerConfig', bannerConfig)
  return (
    <div className="rgpd--container">
      <div className="rgpd--banner">
        <div className="rgpd--title">{titleBox}</div>
        <div className="rgpd--content">
          {displayCookiesList ? (
            <div className="rgpd--cookies-list">
              {cookiesList.map((cookie, index) => {
                return (
                  <ul key={index} className="rgpd--cookie-item">
                    <li>
                      <div className="rgpd--cookie-name">
                        {cookie.publicName}
                      </div>
                      <div className="rgpd--cookie-description">
                        {cookie.publicDescription}
                      </div>
                    </li>
                    <li className="rgpd--cookie-type">{cookie.type}</li>
                    <li className="rgpd--cookie-checkzone">
                      <input type={`checkbox`} />
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
          <button
            className="rgpd--btn"
            onClick={() => {
              setDisplayCookiesList(!displayCookiesList)
            }}
          >
            {chooseLabel}
          </button>
          <button className="rgpd--btn">{acceptAllLabel}</button>
          <button className="rgpd--btn">{rejectAllLabel}</button>
          {displayCookiesList && (
            <button className="rgpd--btn">{saveLabel}</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner
