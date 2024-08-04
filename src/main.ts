import './assets/main.scss'

import VueScreen from 'vue-screen'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

library.add(faGithub, faChevronUp, faChevronDown)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(VueScreen)

app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
