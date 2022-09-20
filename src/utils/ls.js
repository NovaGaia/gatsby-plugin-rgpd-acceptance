function clearItemsInLS() {
  localStorage.clear()
}

function removeItemInLS(key, mandatory) {
  if (mandatory) {
    localStorage.removeItem(`rgpd-acceptance_${key}_mandatory`)
  }
  localStorage.removeItem(`rgpd-acceptance_${key}_consent`)
}

function readItemInLS(key) {
  return localStorage.getItem(key) || null
}

function setItemInLS(key, consent, mandatory) {
  if (readItemInLS(key)) {
    removeItemInLS(key, mandatory)
  }
  if (mandatory) {
    localStorage.setItem(`rgpd-acceptance_${key}_mandatory`, true)
  } else {
    localStorage.setItem(`rgpd-acceptance_${key}_consent`, consent)
  }
}

function acceptAllCookies(cookiesList) {
  // console.log('acceptAllCookies')
  // console.log('cookiesList', cookiesList)
  cookiesList.forEach(element => {
    setItemInLS(element.key, true, element.mandatory)
  })
  setAcceptanceDate()
}

function acceptNoCookies(cookiesList) {
  // console.log('acceptNoCookies')
  // console.log('cookiesList', cookiesList)
  cookiesList.forEach(element => {
    setItemInLS(element.key, false, element.mandatory)
  })
  setAcceptanceDate()
}

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
  // TODO
  setAcceptanceDate()
}

function resetAllAcceptanceByDate(cookiesList, cookieDuration) {
  console.log('resetAllAcceptanceByDate')
  console.log('cookiesList', cookiesList)
  // TODO
  // clearItemsInLS() // temp
  resetAcceptanceDate()
}

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
        output = readItemInLS(`rgpd-acceptance_${key}_consent`) === 'true'
      }
      return
    }
  })
  return output
}

function setAcceptanceDate() {
  localStorage.setItem('rgpd-acceptance_accept-date', new Date())
}

function resetAcceptanceDate() {
  localStorage.removeItem('rgpd-acceptance_accept-date')
}

export {
  acceptAllCookies,
  acceptNoCookies,
  acceptSomeCookies,
  readCookieAcceptance,
  resetAllAcceptanceByDate,
}
