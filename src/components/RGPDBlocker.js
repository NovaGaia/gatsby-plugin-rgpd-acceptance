import { graphql, useStaticQuery } from 'gatsby'
import {
  hasValidatedAcceptance,
  simplyAcceptOneCookie,
  simplyReadOneCookie,
} from '../utils/ls'

import React from 'react'

function RGPDBlocker({
  cookieKey,
  children,
  className,
  blockerWarnMessage,
  blockerWarnLabel,
}) {
  const data = useStaticQuery(graphql`
    query {
      sitePlugin(name: { eq: "gatsby-plugin-rgpd-acceptance" }) {
        pluginOptions
      }
    }
  `)
  const validatedStatus = {
    globalStatus: hasValidatedAcceptance(),
    showBocker: true,
  }
  const {
    labels: {
      icon,
      blockerWarnMessage: confBlockerWarnMessage,
      blockerWarnLabel: confBlockerWarnLabel,
    },
    cookiesList,
  } = data.sitePlugin.pluginOptions
  const _blockerWarnMessage = blockerWarnMessage || confBlockerWarnMessage
  const _blockerWarnLabel = blockerWarnLabel || confBlockerWarnLabel
  validatedStatus['isMandatory'] = false
  let friendlyTitle = 'cookie name'
  let friendlyDescription = 'cookie Description'
  cookiesList.forEach(element => {
    if (element.key === cookieKey) {
      friendlyTitle = element.publicName
      friendlyDescription = element.publicDescription
      validatedStatus['isMandatory'] = element.mandatory
      validatedStatus['cookieStatus'] =
        simplyReadOneCookie(cookieKey, element.mandatory) === 'true' || false
    }
  })
  if (validatedStatus.isMandatory) {
    validatedStatus['showBocker'] = false
  } else {
    if (validatedStatus.globalStatus && validatedStatus.cookieStatus) {
      validatedStatus['showBocker'] = false
    }
  }

  if (validatedStatus['showBocker']) {
    return (
      <div className={`rgpd--blocker--container ${className}`}>
        <div className="rgpd--icon">{icon}</div>
        <div className="rgpd--blocker--title">{friendlyTitle}</div>
        <p
          className="rgpd--blocker--cookie-description"
          dangerouslySetInnerHTML={{ __html: friendlyDescription }}
        />
        <p
          className="rgpd--blocker--warn-message"
          dangerouslySetInnerHTML={{ __html: _blockerWarnMessage }}
        />
        <button
          className="rgpd--btn some"
          onClick={() => {
            simplyAcceptOneCookie(cookieKey)
          }}
        >
          {_blockerWarnLabel}
        </button>
      </div>
    )
  } else {
    return <>{children}</>
  }
}

export default RGPDBlocker
