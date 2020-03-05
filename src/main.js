import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'  
import VueNestable from 'vue-nestable'
import 'vue-material-design-icons/styles.css';




Vue.config.productionTip = false

const Home = { template: Home }
const routes = [
  { path: '/home', component: Home }
]

Vue.use(VueAxios, axios)

Vue.use(VueRouter)

Vue.use(VueNestable)

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')