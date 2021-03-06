import Vue from 'vue';
import Router from 'vue-router';

//Importing new components
import Public from './components/Public.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/users',
            name: 'users',
            component: () => import("./components/UserList")
        },
        {
            path: '/users/:id',
            name: 'user-details',
            component: () => import("./components/User")
        },
        {
            path: '/user-add',
            name: 'user-add',
            component: () => import("./components/UserAdd")
        },
        {
            path: '/public',
            name: 'public',
            component: Public
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/add/request',
            name: 'add',
            component: () => import("./components/RequestAdd.vue")
        },
        {
            path: '/requests',
            name: 'requests',
            component: () => import("./components/RequestList.vue")
        },
        {
            path: '/requests/user',
            name: 'users-requests',
            component: () => import("./components/UsersRequests.vue")
        },
        {
            path: '/assigned',
            name: 'assigned',
            component: () => import("./components/AssignedRequestsList.vue")
        },
        {
            path: '/approve',
            name: 'approve',
            component: () => import("./components/ApprovalList.vue")
        },
        {
            path: '/update/request/:id',
            name: 'update-request',
            component: () => import("./components/UpdateRequest.vue")
        },
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;