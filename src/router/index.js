import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomeView from '../views/HomeView.vue'
import ItemDetails from '../views/ItemDetails.vue'
import AddInvoice from '../views/AddInvoice.vue'
// eslint-disable-next-line no-unused-vars
import AddUser from '../views/AddUser.vue'
import FaceDetection from '../views/FaceDetection.vue'
//import MainLayout from '../views/MainLayout.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  // {
  //   path: '/',
  //   name: 'Main',
  //   component: MainLayout
  // },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/add-invoice',
    name: 'AddInvoice',
    component: AddInvoice
  },
  {
    path: '/face-detection',
    name: 'FaceDetection',
    component: FaceDetection,
    params: true 
  },
  {
    path: '/new-user',
    name: 'NewUser',
    component: AddUser
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: ItemDetails
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
