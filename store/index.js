export const state = () => ({
  savedNeedles: undefined,
});

export const getters = {
  needles: (state) => state.savedNeedles,
};

export const mutations = {
  updateNeedles(state, newNeedles) {
    state.savedNeedles = [...newNeedles];
  },
};
