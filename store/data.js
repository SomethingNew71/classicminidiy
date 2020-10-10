export const state = () => ({
  youtubeStats: [],
  popperDismissed: false
});

export const mutations = {
  saveYoutube (state, stats) {
    state.youtubeStats = stats;
  },
  updatePopperStatus (state) {
    this.popperDismissed = true;
  }
};

export const getters = {
  getPopperStatus (state) {
    return state.popperDismissed;
  }
};
