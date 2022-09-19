/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import './src/styles/rgpd-acceptance.css'

import React, { useState } from 'react'
import {
  clearItemsInLS,
  readItemInLS,
  removeItemInLS,
  setItemInLS,
} from './src/utils/ls'

import Banner from './src/components/Banner'

function load_js(element, consent = false) {
  try {
    const { key, scriptToInclude, mandatory } = element
    if (consent || mandatory) {
      const head = document.getElementsByTagName('head')[0]
      const script = document.createElement('script')
      script.key = key
      script.src = scriptToInclude
      //   head.appendChild(script)
    }
  } catch (error) {
    console.error(error)
  }
  //   removeItemInLS(key, mandatory) // <-- Pas ici
  //   setItemInLS(key, consent, mandatory) // <-- Pas ici
}

function doThings(src, pluginOptions) {
  localStorage.setItem('rgpd-acceptance_accept-date', new Date())
  console.log(`rgpd-acceptance launched by ${src}`, pluginOptions)
  if (pluginOptions.useInternalCss !== undefined) {
    document.documentElement.classList.add('rgpd-acceptance-theme')
  }
  pluginOptions.cookiesList.forEach(element => {
    load_js(element, true)
  })
}

export const onRouteUpdate = ({ location }, pluginOptions = {}) => {
  doThings(`onRouteUpdate`, pluginOptions)

  return null
}

export const wrapRootElement = ({ element }, pluginOptions) => (
  <>
    {element}
    <Banner bannerConfig={pluginOptions} />
  </>
)

export function onInitialClientRender(_, pluginOptions) {
  //   clearItemsInLS() // <-- Pas ici
  doThings(`onRouteUpdate`, pluginOptions)
}
