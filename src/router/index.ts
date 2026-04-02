import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    meta: { icon: '🏠' },
    component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/transactions',
    name: 'Transactions',
    meta: { icon: '💳' },
    component: () => import('../views/TransactionsView.vue'),
  },
  {
    path: '/accounts',
    name: 'Accounts',
    meta: { icon: '🏦' },
    component: () => import('../views/AccountsView.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: { icon: '🏷️' },
    component: () => import('../views/CategoriesView.vue'),
  },
  {
    path: '/budgets',
    name: 'Budgets',
    meta: { icon: '📊' },
    component: () => import('../views/BudgetsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
