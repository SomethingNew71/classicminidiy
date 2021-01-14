export const state = () => ({
  youtubeStats: [],
  allWheels: {
    currentSize: null,
    wheels: {
      10: [],
      12: [],
      13: []
    }
  },
  popperDismissed: false,
  adsEnabled: true
});

export const mutations = {
  saveYoutube (state, stats) {
    state.youtubeStats = stats;
  },
  saveAllWheels (state, wheels) {
    state.allWheels.wheels[state.allWheels.currentSize] = wheels;
  },
  setCurrentSize (state, currentSize) {
    state.allWheels.currentSize = currentSize;
  },
  updatePopperStatus (state) {
    state.popperDismissed = true;
  },
  setAdStatus (state, isEnabled) {
    state.adsEnabled = isEnabled;
  }
};

export const getters = {
  getPopperStatus (state) {
    return state.popperDismissed;
  },
  getWheels (state) {
    return state.allWheels;
  },
  getAdsStatus (state) {
    return state.adsEnabled;
  }
};
