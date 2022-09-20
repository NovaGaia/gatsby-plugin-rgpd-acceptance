/**
 * Internals functions
 */

/**
 * Clear all Local Storage.
 */
function _clearItemsInLS() {
  localStorage.clear()
}

/**
 * Set acceptance date at now.
 */
function _setAcceptanceDate() {
  localStorage.setItem('rgpd-acceptance_accept-date', new Date())
}

/**
 * Get acceptance date.
 */
function _getAcceptanceDate() {
  return _readItemInLS(`rgpd-acceptance_accept-date`)
}

/**
 * Reset/delete acceptance date.
 */
function _resetAcceptanceDate() {
  localStorage.removeItem('rgpd-acceptance_accept-date')
}

/**
 * Reload application to take
 */
function _reload() {
  if (window) window.location.reload()
}

/**
 * Remove one item with key. Mandatory is used to know the sup name.
 * @param {*} key
 * @param {*} mandatory
 */
function _removeItemInLS(key, mandatory) {
  if (mandatory) {
    localStorage.removeItem(`rgpd-acceptance_${key}_mandatory`)
  }
  localStorage.removeItem(`rgpd-acceptance_${key}_consent`)
}

/**
 * Read item by key.
 * @param {*} key
 * @returns
 */
function _readItemInLS(key) {
  return localStorage.getItem(key) || null
}

/**
 * Set item consent by key. If mandatory, concent is forced to true.
 * @param {*} key
 * @param {*} consent
 * @param {*} mandatory
 */
function _setItemInLS(key, consent, mandatory) {
  if (_readItemInLS(key)) {
    _removeItemInLS(key, mandatory)
  }
  if (mandatory) {
    localStorage.setItem(`rgpd-acceptance_${key}_mandatory`, true)
  } else {
    localStorage.setItem(`rgpd-acceptance_${key}_consent`, consent)
  }
}

// Externals functions

/**
 * Reset All datas in LS.
 * @param {*} cookiesList
 */
function resetAll(cookiesList) {
  cookiesList.forEach(element => {
    _removeItemInLS(element.key, element.mandatory)
  })
  _resetAcceptanceDate()
  _reload()
}

/**
 * Method to accept all cookies.
 * @param {*} cookiesList
 */
function acceptAllCookies(cookiesList) {
  // console.log('acceptAllCookies')
  // console.log('cookiesList', cookiesList)
  cookiesList.forEach(element => {
    _setItemInLS(element.key, true, element.mandatory)
  })
  _setAcceptanceDate()
  _reload()
}

/**
 * Method to reject all cookies, only mandatories were forced to be accepeted.
 * @param {*} cookiesList
 */
function acceptNoCookies(cookiesList) {
  // console.log('acceptNoCookies')
  // console.log('cookiesList', cookiesList)
  cookiesList.forEach(element => {
    _setItemInLS(element.key, false, element.mandatory)
  })
  _setAcceptanceDate()
  _reload()
}

/**
 * Method to accept only selected cookies and mandatories.
 * @param {*} cookiesList
 * @param {*} checked
 */
function acceptSomeCookies(cookiesList, checked) {
  // console.log('acceptSomeCookies')
  // console.log('cookiesList', cookiesList)
  // console.log('checked', checked)
  cookiesList.forEach(element => {
    if (element.mandatory) {
      localStorage.setItem(`rgpd-acceptance_${element.key}_mandatory`, true)
    } else {
      localStorage.setItem(
        `rgpd-acceptance_${element.key}_consent`,
        checked[element.key]
      )
    }
  })
  _setAcceptanceDate()
  _reload()
}

/**
 * Method who checked if cookies duration are passed.
 * @param {*} cookiesList
 * @param {*} cookieDuration
 */
function resetAllAcceptanceByDate(cookiesList, cookieDuration) {
  if (!cookieDuration) {
    cookieDuration = 31557600000
  }
  // console.log('resetAllAcceptanceByDate')
  // console.log('cookiesList', cookiesList)
  // console.log('cookieDuration', cookieDuration)
  const now = Date.now()
  const acceptanceDate = new Date(_getAcceptanceDate()).valueOf()
  if (acceptanceDate === 0) return
  const diff = now - acceptanceDate
  if (diff > cookieDuration) {
    console.info(`Cookies are perimed, reset to ask consent again.`)
    resetAll(cookiesList)
  }
}

/**
 * Method return the acceptance value of a cookie.
 * @param {*} cookiesList
 * @param {*} key
 * @returns
 */
function readCookieAcceptance(cookiesList, key) {
  let output = false
  if (cookiesList === undefined || key === undefined) {
    return output
  }
  // console.log('readCookieAcceptance')
  // console.log('cookiesList', cookiesList)
  cookiesList.forEach(element => {
    if (element.key === key) {
      if (element.mandatory) {
        // console.log('key', element.key)
        // console.log(
        //   'value in LS',
        //   readItemInLS(`rgpd-acceptance_${key}_mandatory`)
        // )
        // console.log('is mandatory')
        output = true
      } else {
        // console.log('key', element.key)
        // console.log('not mandatory')
        // console.log(
        //   'value in LS',
        //   readItemInLS(`rgpd-acceptance_${key}_consent`)
        // )
        output = _readItemInLS(`rgpd-acceptance_${key}_consent`) === 'true'
      }
      return
    }
  })
  return output
}

export {
  acceptAllCookies,
  acceptNoCookies,
  acceptSomeCookies,
  readCookieAcceptance,
  resetAllAcceptanceByDate,
  resetAll,
}
