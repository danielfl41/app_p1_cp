import { api } from "@/main";
import {
	IonBackButton,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonList,
	IonPage,
	IonSearchbar,
	IonTitle,
	IonToolbar,
	loadingController,
	toastController,
} from "@ionic/vue";
import { closeSharp } from "ionicons/icons";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
	name: "Folder",
	components: {
		IonButtons,
		IonTitle,
		IonToolbar,
		IonHeader,
		IonPage,
		IonSearchbar,
		IonList,
		IonItem,
		IonContent,
		IonBackButton,
		IonButton,
		IonIcon,
		IonInput,
	},
	setup(props, { emit }) {
		const countries = ref<{ code: string; name: string }[]>([]);
		const cInput = ref("");
		const filteredCountries = computed(() =>
			countries.value.filter((country) =>
				cInput.value ? country.name.toLowerCase().includes(cInput.value) : true,
			),
		);
		async function openToast(message: string) {
			const toast = await toastController.create({
				message,
				duration: 2000,
			});
			return toast.present();
		}
		async function init() {
			const loading = await loadingController.create({
				message: "Cargando...",
			});
			await loading.present();
			try {
				const response = await api.listCountries();
				countries.value = response.map((country) => ({ code: country.code, name: country.name }));
			} catch (error) {
				console.log(error);
				openToast("Problemas al obtener la información");
			}
			await loading.dismiss();
		}
		onMounted(() => init());
		function onChangeInput(e: any) {
			if (e && e.detail && typeof e.detail.value === "string")
				cInput.value = (e.detail.value as string).toLowerCase();
		}
		return { emit, closeSharp, countries, filteredCountries, onChangeInput };
	},
});
