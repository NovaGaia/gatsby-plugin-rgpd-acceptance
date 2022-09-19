/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
// You can delete this file if you're not using it
import {
  clearItemsInLS,
  readItemInLS,
  removeItemInLS,
  setItemInLS,
} from './src/utils/ls'

function load_js(element, consent = false) {
  const { key, scriptToInclude, mandatory } = element
  if (consent || mandatory) {
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.key = key
    script.src = scriptToInclude
    head.appendChild(script)
  }
  removeItemInLS(key, mandatory) // <-- Pas ici
  setItemInLS(key, consent, mandatory) // <-- Pas ici
}

function doThings(src, pluginOptions) {
  console.log(`rgpd-acceptance launched by ${src}`, pluginOptions)
  localStorage.setItem('rgpd-acceptance_accept-date', new Date())
  pluginOptions.list.forEach(element => {
    load_js(element, true)
  })
}

export const onRouteUpdate = ({ location }, pluginOptions = {}) => {
  doThings(`onRouteUpdate`, pluginOptions)

  return null
}

export function onInitialClientRender(_, pluginOptions) {
  //   clearItemsInLS() // <-- Pas ici
  doThings(`onRouteUpdate`, pluginOptions)
}
