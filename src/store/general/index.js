import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", {
  state: () => ({ headerRef: null }),
  getters: {
    getHeaderRef: (state) => state.headerRef,
  },
  actions: {
    setRef(ref) {
      this.headerRef = ref;
    },
  },
});
