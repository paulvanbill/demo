import Vue from "vue";
import Vuex from "vuex";
import { resolve } from "q";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            username: window.sessionStorage.getItem('user') == null ? '' : JSON.parse(window.sessionStorage.getItem('user')).username,
            roles: window.sessionStorage.getItem('user') == null ? '' : JSON.parse(window.sessionStorage.getItem('user')).roles,
            resources: window.sessionStorage.getItem('user') == null ? '' : JSON.parse(window.sessionStorage.getItem('user')).resources
        },
        sidebar: {
            opened: true
        },
        tagViews: [],
        cachedViews: []
    },
    mutations: {
        login(state, user) {
            Object.assign(state.user, user)
            window.sessionStorage.setItem('user', JSON.stringify(user));
        },
        toggleSideBar(state) {
            state.sidebar.opened = !state.sidebar.opened
        },
        addTagView(state, tag) {
            if(state.tagViews.some(v => v.path == tag.path)) {
                return;
            }
            state.tagViews.push(tag);
            if(tag.meta.cache) {
                state.cachedViews.push(tag.name);
            }
        },
        delTagView(state, tag) {
            for(let [i, v] of state.tagViews.entries()) {
                if(v.path == tag.path) {
                    state.tagViews.splice(i, 1);
                    if(v.meta.cache) {
                        let cachedIndex = state.cachedViews.indexOf(v.name);
                        if(cachedIndex != -1) {
                            state.cachedViews.splice(cachedIndex, 1);
                        }
                    }
                }
            }
        },
        delCachedView(state, tag) {
            let cachedIndex = state.cachedViews.indexOf(tag.name);
            if(cachedIndex != -1) {
                state.cachedViews.splice(cachedIndex, 1);
            }
        },
        deleteOtherTagView(state, tag) {
            for(let [i, v] of state.tagViews.entries()) {
                if(v.path != tag.path && !v.meta.affix) {
                    state.tagViews.splice(i, 1);
                    if(v.meta.cache) {
                        let cachedIndex = state.cachedViews.indexOf(v.name);
                        if(cachedIndex != -1) {
                            state.cachedViews.splice(cachedIndex, 1);
                        }
                    }
                }
            }
        },
        deleteAllTagViews(state) {
            let newTagViews = state.tagViews.slice(0, state.tagViews.length);
            for(let tag of newTagViews) {
                if(!tag.meta.affix) {
                    this.commit('delTagView', tag)
                }
            }
        }
    },
    actions: {
        toggleSideBar(context) {
            context.commit('toggleSideBar')
        },
        addTagView(context, tag) {
            context.commit('addTagView', tag);
        },
        delTagView(context, tag) {
            return new Promise(resolve => {
                context.commit('delTagView', tag);
                resolve(context.state.tagViews);
            })
        },
        delCachedView(context, tag) {
            return new Promise(resolve => {
                context.commit('delCachedView', tag);
                resolve();
            })
        },
        deleteOtherTagView(context, tag) {
            return new Promise(resolve => {
                context.commit('deleteOtherTagView', tag);
                resolve();
            })
        },
        deleteAllTagViews(context) {
            return new Promise(resolve => {
                context.commit('deleteAllTagViews');
                resolve();
            })
        }
    },
    getters: {
        sidebar: state => state.sidebar
    }


})