export default {
    namespaced: true,
    state: {
        billTabShowed: true,
        billTabSelected: 0,
    },
    mutations: {
        onHideBillTab(state) {
            state.billTabShowed = false;
        },
        onShowBillTab(state) {
            state.billTabShowed = true;
        },
        onSelectedBillTab(state, index) {
            state.billTabSelected = index;
        }
    },
    actions: { //异步方法->外部使用的方法
        hideTab({commit}, code) {
            commit("onHideBillTab");//间接调用mutations
        },
        showTab({commit}, code) {
            commit("onShowBillTab");
        },
        selectTab({ commit }, index) {
            commit("onSelectedBillTab", index);
        }
    }
};