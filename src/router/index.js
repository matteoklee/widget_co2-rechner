import { createRouter, createWebHistory } from 'vue-router';
import CalculationStepper from "@/components/CalculationStepper.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: CalculationStepper
        },
        /*
        {
            path: '/dashboard',
            alias: '/board',
            name: 'dashboard',
            component: DashboardView,
            meta: { requiresAuth: true }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            //component: NotFound
        }
        */
    ]
});

/*
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (authService.isLoggedIn()) {
            next();
        } else {
            return next({ name: 'login' });
        }
    } else {
        next();
    }
});
*/

export default router;
