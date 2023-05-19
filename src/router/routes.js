const routes = [
  { path: "/", component: () => import("../../src/view/home.vue") },
  { path: "/list", component: () => import("../../src/view/list.vue") },
  { path: "/nine", component: () => import("../../src/view/nine.vue") },
  { path: "/yuan", component: () => import("../../src/view/yuan.vue") },
];

export default routes;