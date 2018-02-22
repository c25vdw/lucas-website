import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import firebase from 'firebase'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/hello'
    },
    {
      path: '/',
      redirect: '/hello'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
     /* meta: {
        requiresAuth: true
      }*/
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    }
    ]
})
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login')
    console.log('requiresAuth: ', requiresAuth, '!currentUser: ', !currentUser)
  }
  else next()
})
export default router
