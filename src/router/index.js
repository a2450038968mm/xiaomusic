import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from '../views/recommend.vue'
import singer from '../views/singer.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/recommend",

  },
  {
    path: "/recommend",
    name: "recommend",
    component: recommend,
  },
  {
    path: "/singer",
    name: "singer",
    component: singer,

  },
  {
    path: "/rank",
    name: "rank",
    component: () => import('../views/rank.vue')
  },
  {
    path: "/songlist",
    name: "songlist",
    meta: {
      isopen: true,
    },
    component: () => import('../views/songlist.vue'),
  },
  {
    path: "/singerlist",
    name: "singerlist",
    meta: {
      isopen: true,
    },
    component: () => import('../views/singerlist.vue'),
  },
  {
    path: '/login',
    meta: {
      isopen: true,
    },
    beforeEnter: (to, from, next) => {
      // ...
      let login = store.state.login || window.localStorage.getItem("login");
      // console.log(login);
      if(login){
        next("/user")
        return
      }else{
        next()
      }
    },
    component: () => import("../views/login"),
  },
  {
    path: "/search",
    name: "search",
    meta: {
      isopen: true,
    },
    component: () => import('../views/search.vue'),
  },
  {
    path: "/songparticulars",
    name: "songparticulars",
    meta: {
      isopen: true,
    },
    component: () => import('../views/songparticulars.vue'),
  },
  {
    path: "/mvlist",
    name: "mvlist",

    component: () => import('../views/mvlist.vue'),
  },
  {
    path: "/user",
    name: "user",
    meta: {
      isopen: true,
    },
    component: () => import('../views/user.vue'),
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to.path);
  // console.log(from.path);
  // console.log(store.state.login)
  let login = store.state.login || window.localStorage.getItem("login");

  // 登录界面`
  if (to.path == "/login") {
    next();
    return;
  } else {
    // 判断登录情况
    if (!login) {
      next("/login");
      return;
    } else {
      next();
    }
  }
})

export default router
