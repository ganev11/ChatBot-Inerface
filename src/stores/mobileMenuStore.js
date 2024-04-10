// stores/mobileMenuStore.js

import { defineStore } from 'pinia'

export const useMobileMenuStore = defineStore('mobileMenu', {
  state: () => ({
    isMobileScreen: false,
    isHamOpen: false
  }),
  actions: {
    setMobileScreen(isMobile) {
      this.isMobileScreen = isMobile
      console.log('isMobile STORE :>> ', this.isMobileScreen)
    },
    setHamMenuOpen(isOpen) {
      this.isHamOpen = isOpen
    }
  }
})
