import { readCookieAcceptance, resetAllAcceptanceByDate } from './ls'

/**
 * Add scripts to head
 * @param {*} element
 */
function _load_js(element) {
  try {
    const { key, scriptToInclude, url, mandatory, urlToCall } = element
    const consent = readCookieAcceptance(key)
    if (consent || mandatory) {
      const head = document.getElementsByTagName('head')[0]
      if (urlToCall) {
        const script = document.createElement('script')
        script.key = key
        script.src = url
        head.appendChild(script)
      } else {
        const parsedHTML = document
          .createRange()
          .createContextualFragment(scriptToInclude)
        head.appendChild(parsedHTML)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Init plugin.
 * @param {*} src : ;
 * @param {*} pluginOptions
 */
function initRGPDPlugins(src, pluginOptions) {
  resetAllAcceptanceByDate(
    pluginOptions.cookiesList,
    pluginOptions.cookieDuration
  )
  if (pluginOptions.useInternalCss) {
    document.documentElement.classList.add('rgpd-acceptance-theme')
  }
  pluginOptions.cookiesList.forEach(element => {
    _load_js(element)
  })
}

export { initRGPDPlugins }
