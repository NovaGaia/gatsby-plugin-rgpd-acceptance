/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import './src/styles/rgpd-acceptance.css'

import { readCookieAcceptance, resetAllAcceptanceByDate } from './src/utils/ls'

import Banner from './src/components/Banner'
import React from 'react'

function load_js(element) {
  try {
    const { key, scriptToInclude, mandatory, urlToCall } = element
    const consent = readCookieAcceptance(key)
    if (consent || mandatory) {
      const head = document.getElementsByTagName('head')[0]
      if (urlToCall) {
        const script = document.createElement('script')
        script.key = key
        script.src = scriptToInclude
        head.appendChild(script)
      } else {
        head.appendChild(scriptToInclude)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

function doThings(src, pluginOptions) {
  resetAllAcceptanceByDate(
    pluginOptions.cookiesList,
    pluginOptions.cookieDuration
  )
  if (pluginOptions.useInternalCss !== undefined) {
    document.documentElement.classList.add('rgpd-acceptance-theme')
  }
  pluginOptions.cookiesList.forEach(element => {
    load_js(element)
  })
}

export const onRouteUpdate = ({ location }, pluginOptions = {}) => {
  doThings(`onRouteUpdate`, pluginOptions)

  return null
}

export function onInitialClientRender(_, pluginOptions) {
  doThings(`onRouteUpdate`, pluginOptions)
}

export const wrapRootElement = ({ element }, pluginOptions) => (
  <>
    {element}
    <Banner bannerConfig={pluginOptions} />
  </>
)
