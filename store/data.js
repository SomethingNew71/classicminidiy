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
  setAdStatus (state, isEnabled) {
    state.adsEnabled = isEnabled;
  }
};

export const getters = {
  getWheels (state) {
    return state.allWheels;
  },
  getAdsStatus (state) {
    return state.adsEnabled;
  }
};
