import { links } from '@/helpers/menu'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'defaultLayout',
    redirect: 'warehouses',
    component: () => import('../layouts/defaultLayout.vue'),
    children: [
      ...links,
      {
        path: 'warehouses',
        name: 'warehouses',
        component: () => import('@/views/warehouse/allWarehouses.vue'),
        meta: {
          title: 'Склады'
        }
      }
    ]
  },
  {
    path: '/auth',
    name: 'authLayout',
    component: () => import('@/layouts/authLayout.vue'),
    children: [
      {
        path: '',
        name: 'signIn',
        component: () => import('@/views/user/signIn.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/errorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/production' && !to.query.type) {
    next({ path: '/production', query: { ...to.query, type: 0 } })
  } else {
    next()
  }
})

export default router
