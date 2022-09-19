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

export { readItemInLS, removeItemInLS, setItemInLS, clearItemsInLS }
