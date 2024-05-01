function hasStorage() {
  if (typeof window == 'undefined' || !window.localStorage) return false

  return true
}

export default {
  setItem: function(name, data) {
    if (!hasStorage()) return

    localStorage.setItem(name, JSON.stringify(data))
  },
  getItem: function(name) {
    if (!hasStorage()) return

    const item = localStorage.getItem(name)
    if (item) return JSON.parse(item)
  },
  deleteItem: function(name) {
    if (!hasStorage()) return

    localStorage.removeItem(name)
  },
  clearStorage: function() {
    if (!hasStorage()) return

    localStorage.clear()
  }
}
