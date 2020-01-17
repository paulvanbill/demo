import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import { postRequest } from './api/api'
import store from "./store/store";
import './icons' // icon
import '@/styles/index.scss' // global css
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

Vue.prototype.postRequest = postRequest;
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ElementUI)

//全局钩子函数
router.beforeEach((to, from, next) => {
  NProgress.start();

  if (to.name == 'login') {
    next();
    return;
  }

  if(to.matched.some(record => record.meta.requireAuth)) {   //判断该路由是否需要登录
    var username = store.state.user.username;
    if(username != null && username != '' && username != undefined) {
      next();
    }else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    }
  }else {
    next();
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
