/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import './src/styles/rgpd-acceptance.css'

import Banner from './src/components/Banner'
import React from 'react'
import { initRGPDPlugins } from './src/utils/gb'

export const onRouteUpdate = ({ location }, pluginOptions = {}) => {
  initRGPDPlugins(`onRouteUpdate`, pluginOptions)

  return null
}

export function onInitialClientRender(_, pluginOptions) {
  initRGPDPlugins(`onInitialClientRender`, pluginOptions)
}

export const wrapRootElement = ({ element }, pluginOptions) => (
  <>
    {element}
    <div className="rgpd--container">
      {pluginOptions?.useInternalComponent && <Banner automaticlyInclude />}
    </div>
  </>
)
