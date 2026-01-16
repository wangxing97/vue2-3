export default {
    namespaced: true,
    state: {
        isCollapse: false,
        menuData: [],
        tabsList: [{
            path: "/home",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
        }],
        tags: [{
            path: "/home",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
        }]
    },
    actions: {

    },
    getters: {

    },
    mutations: {
        updateCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        setMenuData(state, val) {
            state.menuData = val
        },
        setTabData(state, val) {
            // const index = state.tabsList.findIndex(item => item.name === val)
            state.tabsList = state.tabsList.splice(0, 1)
            const menu = state.menuData.find(item => {
                if (item.name === val) {
                    return item;
                } else {
                    if (item.children) {
                        if (item.children.find(child => child.name === val))
                            return item;
                    }
                }
            })
            if (menu && menu.name !== 'home') {
                state.tabsList.push(menu)
                if (menu.children) {
                    state.tabsList.push(menu.children.find(item => item.name === val))
                }
            }
            if (state.tags.findIndex(item => item.name === val) === -1 && menu) {
                if (menu.children) {
                    state.tags.push(menu.children.find(item => item.name === val))
                } else {
                    state.tags.push(menu)
                }
            }
        },
        setTagData(state, val) {
            state.tags = val;
        }
    }
}