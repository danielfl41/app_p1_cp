import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "",
		redirect: { name: "indicators" },
	},
	{
		name: "indicators",
		path: "/indicators",
		component: () => import("../views/Indicators.vue"),
	},
	{
		name: "chart",
		path: "/chart",
		component: () => import("../views/chart.vue"),
	},
	{
		name: "integrantes",
		path: "/integrantes",
		component: () => import("../views/integrantes.vue"),
	},
	{
		name: "ajustes",
		path: "/ajustes",
		component: () => import("../views/settings.vue"),
	},
	{
		path: "/:catchAll(.*)",
		component: () => import("../views/404.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
