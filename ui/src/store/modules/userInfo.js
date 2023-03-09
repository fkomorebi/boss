const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    userInfos: [],
    pageSize: 10,
    pageIndex: 1,
  }),
  actions: {
    togglePageIndex(pageIndex) {
      this.pageIndex = pageIndex
    },
    togglePageSize(size) {
      this.pageSize = size
    },
    toggleUserInfos(userInfos) {
      this.userInfos = userInfos
    },
  },
})
export default useUserInfoStore
