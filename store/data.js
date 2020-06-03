export const state = () => ({
  youtubeStats: []
});

export const mutations = {
  saveYoutube (state, stats) {
    state.youtubeStats = stats;
  }
};
