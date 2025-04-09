import { createRouter, createWebHistory } from 'vue-router';
import CalculationStepper from "@/components/calculation/CalculationStepper.vue";
import NotFoundView from "@/components/misc/NotFoundView.vue";

import {validateToken} from "@/services/tokenService.js";
import AppCalculator from "@/components/new-calculation/AppCalculator.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            //component: CalculationStepper,
            component: AppCalculator,
            meta: { requiresAuth: true }
        },
        {
            path: '/error',
            name: 'error',
            component: () => import('@/components/misc/ErrorView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFoundView
        }
        /*
        {
            path: '/dashboard',
            alias: '/board',
            name: 'dashboard',
            component: DashboardView,
            meta: { requiresAuth: true }
        },
        */
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = to.query.token;
        if (!token) {
            console.error("no token");
            next({name: "error"});
            return;
        }

        const isValid = await validateToken(token);
        const production = false;
        if (!isValid && production) {
            console.error("invalid token");
            next({name: "error"});
            return;
        }
        next();
    } else {
        next();
    }
});

/*
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const referer = document.referrer;
        const allowedDomains = ["https://customer1.com", "https://customer2.com", "http://localhost:5173"];

        if (!referer || !allowedDomains.some(domain => referer.startsWith(domain))) {
            next({ name: "error" });
            return;
        }
    } else {
        next();
    }
});
*/

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
