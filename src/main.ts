import './assets/main.scss'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faGithub)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
