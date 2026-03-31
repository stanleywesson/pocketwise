import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue')
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: () => import('../views/TransactionsView.vue')
    },
    {
        path: '/accounts',
        name: 'Accounts',
        component: () => import('../views/AccountsView.vue')
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import('../views/CategoriesView.vue')
    },
    {
        path: '/budgets',
        name: 'Budgets',
        component: () => import('../views/BudgetsView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;