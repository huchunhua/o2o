export default {
    namespaced: true,
    state: {
        requestLoaded: false
    },
    mutations: {
        onLoading(state) {
            state.requestLoaded = false;
        },
        onLoaded(state) {
            state.requestLoaded = true;
        }
    },
    actions: { //异步方法->外部使用的方法
        onLoading({commit}, code) {
            commit("onLoading");//间接调用mutations
        },
        onLoaded({commit}, code) {
            commit("onLoaded");
        }
    }
};