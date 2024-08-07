import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useHead } from 'unhead'
import { Color } from '@/scripts/color'

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
  const { title, description, themeColor } = to.meta

  const fallbackTitle = 'Kessoku Tea Time'
  const fallbackDescription = ''
  const fallbackThemeColor = { light: Color.getWhite(), dark: Color.getBlack() }

  useHead({
    title: title || fallbackTitle,
    meta: [
      { name: 'description', content: description || fallbackDescription },
      {
        name: 'theme-color',
        content: (
          (themeColor instanceof Color ? themeColor : themeColor?.light) || fallbackThemeColor.light
        ).toRGBA(),
        media: '(prefers-color-scheme: light)'
      },
      {
        name: 'theme-color',
        content: (
          (themeColor instanceof Color ? themeColor : themeColor?.dark) || fallbackThemeColor.dark
        ).toRGBA(),
        media: '(prefers-color-scheme: dark)'
      }
    ]
  })
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
