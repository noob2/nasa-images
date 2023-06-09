import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

const clientId = process.env.VUE_APP_GOOGLE_CLIENT_ID

app.use(vue3GoogleLogin, { clientId })

app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas)

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa
    }
  },
  components,
  directives
})

app.use(store).use(router).use(vuetify).mount('#app')
