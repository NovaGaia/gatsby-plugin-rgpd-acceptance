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
  console.log('acceptAllCookies')
  console.log('cookiesList', cookiesList)
  cookiesList.forEach(element => {
    setItemInLS(element.key, true, element.mandatory)
  })
  setAcceptanceDate()
}

function acceptNoCookies(cookiesList) {
  console.log('acceptNoCookies')
  console.log('cookiesList', cookiesList)
  cookiesList.forEach(element => {
    setItemInLS(element.key, false, element.mandatory)
  })
  setAcceptanceDate()
}

function acceptSomeCookies(cookiesList, acceptedList) {
  console.log('acceptSomeCookies')
  console.log('cookiesList', cookiesList)
  console.log('acceptedList', acceptedList)
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
  if (cookiesList === undefined || key === undefined) {
    return false
  }
  console.log('readCookieAcceptance')
  console.log('cookiesList', cookiesList)
  console.log('key', key)
  cookiesList.forEach(element => {
    console.log('key', element.key)
    console.log('mandatory', element.mandatory)
    console.log('value in LS', readItemInLS(key))
    if (element.key === key && element.mandatory) {
      console.log('is mandatory')
      return true
    } else if (element.key === key) {
      console.log('not mandatory')
      return readItemInLS(key) || false
    }
  })
  return false
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
