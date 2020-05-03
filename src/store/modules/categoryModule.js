import axios from "axios";

const state = {
    listCategory: [],
};
const getters = {
    fetchCategory: (state) => state.listCategory,
};
const actions = {
    async fetchListCategory({ commit }) {
        const response = await axios.get("/category/list");
        commit("SET_CATEGORY", response);
        return response;
    },
};
const mutations = {
    SET_CATEGORY: (state, listCategory) => (state.listCategory = listCategory),
};
export default {
    state,
    getters,
    actions,
    mutations,
};
