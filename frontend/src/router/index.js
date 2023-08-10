import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MatchesView from '../views/MatchesView.vue'
import MatchDetailsView from '../views/MatchDetailsView.vue';
import ScheduleView from '../views/ScheduleView.vue';
import EditMatchView from '../views/EditMatchView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ForgotPasswordView from '../views/ForgotPasswordView.vue';
import ResetPasswordView from '../views/ResetPasswordView.vue';
import UserProfileView from '../views/UserProfileView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/matches',
      name: 'matches',
      component: MatchesView
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleView
    },
    {
      path: '/match/:id/edit',
      name: 'matchEdit',
      component: EditMatchView,
      props: true
    },
    {
      path: '/matches/:id',
      name: 'matchDetails',
      component: MatchDetailsView,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasswordView
    },
    {
      path: '/password-reset/:token',
      name: 'ResetPassword',
      component: ResetPasswordView
    },
    {
      path: '/my-profile',
      name: 'MyProfile',
      component: UserProfileView
    },
  ]
})

export default router
