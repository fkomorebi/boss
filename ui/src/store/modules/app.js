const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: false,
      hide: false,
    },
    device: 'desktop',
  }),
  actions: {
    toggleSideBar() {
      if (this.sidebar.hide) {
        return false
      }
      this.sidebar.opeded = !this.sidebar.opeded
    },
    closeSideBar() {
      this.sidebar.opened = false
    },
    toggleDevice(device) {
      this.device = device
    },
    toggleSideBarHide(status) {
      this.sidebar.hide = status
    },
  },
})
export default useAppStore
