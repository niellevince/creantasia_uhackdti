import Vue from 'vue'
import VueRouter from 'vue-router'

import auth from '../middleware/auth';
import session from '../middleware/session';

Vue.use(VueRouter)

const routes = [
    // ==========================================  Guest  ========================================== //
    { path: '/', name: 'login', component: require('../views/authentication/Login.vue').default, meta: { middleware: session } },
    { path: '/register', name: 'register', component: require('../views/authentication/Register.vue').default, meta: { middleware: session } },

    // ==========================================  Users  ========================================== //
    { path: '/finish-profile', name: 'finish-profile', component: require('../views/users/profile/FinishProfile.vue').default },
    { path: '/businesses', name: 'home', component: require('../views/users/lgu/Businesses.vue').default },
    { path: '/business-applications', name: 'business-applications', component: require('../views/users/lgu/Applications.vue').default },
    { path: '/transactions', name: 'transactions', component: require('../views/users/transactions/Transactions.vue').default },

    { path: '*', component: require('../views/errors/PageNotFound.vue').default, name: '404' },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async (to, from, next) => {
    if (to.meta.middleware != null) {
        return to.meta.middleware(router, next);
    } else {
        return auth(router, next, to);
    }
});

export default router
