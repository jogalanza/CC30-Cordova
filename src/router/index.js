import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/report/startbusiness',
    name: 'StartBusiness',
    component: () => import('../views/Reports/StartAtBusiness.vue'),
  },
  {
    path: '/report/startsite',
    name: 'StartSite',
    component: () => import('../views/Reports/StartAtSite.vue'),
  },
  {
    path: '/report/monthlytrend',
    name: 'MonthlyTrend',
    component: () => import('../views/Reports/MonthlyTrend.vue'),
  },
  {
    path: '/report/businesstositepriorweek',
    name: 'BusinessToSitePrior',
    component: () => import('../views/Reports/BusinessToSitePriorWeek.vue'),
  },
  {
    path: '/report/sitetobusinesspriorweek',
    name: 'SiteToBusinessPrior',
    component: () => import('../views/Reports/SiteToBusinessPriorWeek.vue'),
  },
  {
    path: '/report/businesstositewow',
    name: 'BusinessToSiteWOW',
    component: () => import('../views/Reports/BusinessToSiteWOW.vue'),
  },
  {
    path: '/report/sitetobusinesswow',
    name: 'SiteToBusinessWOW',
    component: () => import('../views/Reports/SiteToBusinessWOW.vue'),
  },
  {
    path: '/report/organicgrowth',
    name: 'OrganicGrowth',
    component: () => import('../views/Reports/OrganicGrowth.vue'),
  },
  {
    path: '/entry/bookingsforecast',
    name: 'BookingsForecast',
    component: () => import('../views/DataEntry/BookingsForecast.vue'),
  },
  {
    path: '/entry/demandactuals',
    name: 'DemandActuals',
    component: () => import('../views/DataEntry/DemandActuals.vue'),
  },
  {
    path: '/entry/salestarget',
    name: 'SalesTarget',
    component: () => import('../views/DataEntry/SalesTarget.vue'),
  },
  {
    path: '/entry/DeferredBacklog',
    name: 'DeferredBacklog',
    component: () => import('../views/DataEntry/DeferredBacklog.vue'),
  },
  {
    path: '/misc/fxrates',
    name: 'FXRates',
    component: () => import('../views/Misc/FXRates.vue'),
  },
  {
    path: '/misc/training',
    name: 'DefinitionsTraining',
    component: () => import('../views/Misc/DefinitionsTraining.vue'),
  },
  {
    path: '/admin/usermaintenance',
    name: 'UserMaintenance',
    component: () => import('../views/Admin/UserMaintenance.vue'),
  },
  {
    path: '/admin/txaudit',
    name: 'TransactionAudit',
    component: () => import('../views/Admin/TransactionAudit.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
