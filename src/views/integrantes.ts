import {
	IonAvatar,
	IonButtons,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonItem,
	IonLabel,
	IonList,
	IonMenuButton,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from "@ionic/vue";
import { computed, defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
	name: "Integrantes",
	components: {
		IonButtons,
		IonContent,
		IonHeader,
		IonMenuButton,
		IonPage,
		IonTitle,
		IonToolbar,
		IonGrid,
		IonRow,
		IonCol,
		IonList,
		IonItem,
		IonLabel,
		IonAvatar,
	},
	setup() {
		const route = useRoute();
		const pageTitle = ref(route.params.id || "Integrantes");
		const matched = computed(() => route.params.id);
		const integrantes: Readonly<{ name: string; avatar: string }[]> = Object.freeze([
			{ name: "Daniel Bustamante", avatar: require("@/assets/bustamante.jpg") },
			{ name: "Paulo Gutierrez", avatar: require("@/assets/gutierrez.jpg") },
			{ name: "Daniel Fredes", avatar: require("@/assets/fredes.png") },
		]);
		watch(matched, () => {
			pageTitle.value = matched.value as string;
		});

		return { pageTitle, integrantes };
	},
});
