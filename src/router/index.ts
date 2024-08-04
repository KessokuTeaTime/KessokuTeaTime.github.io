import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Kessoku Tea Time',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
      meta: {
        title: 'About | Kessoku Tea Time'
      }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/views/ProjectsView.vue'),
      meta: {
        title: 'Projects | Kessoku Tea Time'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404 Not Found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: '404 | Kessoku Tea Time'
      }
    }
  ]
})

router.beforeEach((to) => {
  const { title, description } = to.meta
  document.title = (title as string) || 'Kessoku Tea Time'

  const metaDescription = document.querySelector('head meta[name="description"]')
  metaDescription?.setAttribute('content', (description as string) || '')
})

export default router

export type Route = {
  name: string
  path: string
}

export const routes: Route[] = [
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Projects',
    path: '/projects'
  }
]
