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
  popperDismissed: false
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
  }
};

export const getters = {
  getPopperStatus (state) {
    return state.popperDismissed;
  },
  getWheels (state) {
    return state.allWheels;
  }
};
