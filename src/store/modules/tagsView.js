import { checkArrayString } from "../../utils";

const state = {
  views: [],
  cachedViews: []
};

const mutations = {

  ADD_CACHED_VIEW: (state, view) => {
    if (checkArrayString(state.cachedViews, '', view) == -1) {
      state.cachedViews.push(view);
    }
  },

  DEL_VISITED_VIEW: (state, view) => {
    state.cachedViews.forEach((item, index) => {
      if (item === view) {
        state.cachedViews.splice(index, 1);
        index--
      }
    });
  },
  ADD_VIEW: (state, view) => {
    state.views.push(view);
  },
};

const actions = {
  addView({ commit }, view) {
    commit("ADD_VIEW", view);
  },
  addCachedView({ commit }, view) {
    commit("ADD_CACHED_VIEW", view);
  },

  delView({ commit }, view) {
    commit("DEL_VISITED_VIEW", view);
    // return new Promise(resolve => {

    // dispatch("delCachedView", view);
    // resolve({
    //   // visitedViews: [...state.visitedViews],
    //   cachedViews: [...state.cachedViews]
    // });
    // });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
