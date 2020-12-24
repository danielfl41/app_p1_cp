import {
	IonApp,
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
	IonMenuToggle,
	IonNote,
	IonRouterOutlet,
	IonSplitPane,
} from "@ionic/vue";
import {
	personOutline,
	personSharp,
	settingsOutline,
	settingsSharp,
	statsChartOutline,
	statsChartSharp,
} from "ionicons/icons";
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "App",
	components: {
		IonApp,
		IonContent,
		IonIcon,
		IonItem,
		IonLabel,
		IonList,
		IonListHeader,
		IonMenu,
		IonMenuToggle,
		IonNote,
		IonRouterOutlet,
		IonSplitPane,
	},
	setup() {
		const selectedIndex = ref(0);
		const appPages = [
			{
				title: "Indicadores",
				name: "indicators",
				iosIcon: statsChartOutline,
				mdIcon: statsChartSharp,
			},
			{
				title: "Integrantes",
				name: "integrantes",
				iosIcon: personOutline,
				mdIcon: personSharp,
			},
			{
				title: "Ajustes",
				name: "ajustes",
				iosIcon: settingsOutline,
				mdIcon: settingsSharp,
			},
		];

		const path = window.location.pathname.split("folder/")[1];
		if (path !== undefined) {
			selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
		}
		return {
			selectedIndex,
			appPages,
		};
	},
});
