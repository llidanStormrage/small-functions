const routes = [
  { path: "/", component: () => import("../../src/view/home.vue") },
  { path: "/list", component: () => import("../../src/view/list.vue") },
  { path: "/nine", component: () => import("../../src/view/nine.vue") },
  { path: "/yuan", component: () => import("../../src/view/yuan.vue") },
  { path: "/everyday", component: () => import("../../src/view/everyday.vue") },
  { path: "/practice", component: () => import("../../src/view/everyDay/day1.vue") },
  { path: "/dianti", component: () => import("../../src/view/everyDay/day3.vue") },
];

export default routes;
