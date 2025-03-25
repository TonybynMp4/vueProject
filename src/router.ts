import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '@/stores/auth-store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {

            path: '/',
            component: () => import('@/pages/home/HomePage.vue')
        },
        {
            path: '/login',
            component: () => import('@/pages/login/LoginPage.vue')
        },
        {
            path: '/register',
            component: () => import('@/pages/register/RegisterPage.vue')
        },

        {
            path: '/cart',
            component: () => import('@/pages/cart/CartPage.vue'),
        },
        {
            path: '/:pathMatch(.*)',
            component: () => import('@/pages/NotFoundPage.vue')
        }
    ],
});

router.beforeEach((to, _, next) => {
    const authStore = useAuthStore();
    const isLoggedIn = authStore.getUser ?? false;

    if (to.meta.requiresAuth && !isLoggedIn) {
        return next('/login');
    } else if (isLoggedIn && (to.path === '/login' || to.path === '/register')) {
        return next('/profile');
    }

    return next();
});

export default router;