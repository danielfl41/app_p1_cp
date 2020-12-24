import { api } from "@/main";
import { arrayValidation, vAlphanumericExtended, vMax, vRequired, vUrl } from "@/tools/validator";
import {
	alertController,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	loadingController,
	toastController,
} from "@ionic/vue";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
	name: "Ajustes",
	components: {
		IonButtons,
		IonContent,
		IonHeader,
		IonMenuButton,
		IonPage,
		IonTitle,
		IonToolbar,
		IonList,
		IonItem,
		IonInput,
		IonLabel,
		IonButton,
		loadingController,
	},
	setup() {
		const route = useRoute();
		const pageTitle = ref(route.params.id || "Ajustes");
		const matched = computed(() => route.params.id);
		const endpoint = ref("");
		const apiApp = ref("");
		const apiKey = ref("");
		watch(matched, () => {
			pageTitle.value = matched.value as string;
		});
		async function openToast(message: string) {
			const toast = await toastController.create({
				message,
				duration: 2000,
			});
			return toast.present();
		}
		const rules = Object.freeze({
			endpoint: [vRequired(), vUrl(), vMax(250)],
			apiKey: [vRequired(), vAlphanumericExtended(), vMax(250)],
			apiApp: [vRequired(), vAlphanumericExtended(), vMax(250)],
		});
		let vEndpointError: string | boolean = false;
		let vApiKeyError: string | boolean = false;
		let vApiAppError: string | boolean = false;
		onMounted(() => {
			const config = api.getConfig();
			endpoint.value = config.endpoint;
			apiApp.value = config.apiApp;
			apiKey.value = config.apiKey;
		});
		function onChangeApiApp(e: any) {
			if (e && e.detail && e.detail.value) {
				apiApp.value = e.detail.value;
			}
		}
		function onChangeApiKey(e: any) {
			if (e && e.detail && e.detail.value) {
				apiKey.value = e.detail.value;
			}
		}
		function onChangeEndpoint(e: any) {
			if (e && e.detail && e.detail.value) {
				endpoint.value = e.detail.value;
			}
		}
		async function onClickSubmit() {
			const loading = await loadingController.create({
				message: "Guardando...",
			});
			try {
				vEndpointError = arrayValidation(`${endpoint.value}`, rules["endpoint"]);
				vApiKeyError = arrayValidation(`${apiKey.value}`, rules["apiKey"]);
				vApiAppError = arrayValidation(`${apiApp.value}`, rules["apiApp"]);
				if (
					typeof vEndpointError === "string" ||
					typeof vApiKeyError === "string" ||
					typeof vApiAppError === "string"
				) {
					const message =
						"<ul>" +
						[
							["Endpoint", vEndpointError],
							["Api App", vApiAppError],
							["Api Key", vApiKeyError],
						]
							.filter((i) => typeof i[1] === "string")
							.map((i) => `<li><strong>${i[0]}:</strong> ${i[1]}</li>`)
							.join("") +
						"</ul>";
					const alert = await alertController.create({
						header: "Error",
						message,
						buttons: ["OK"],
					});
					console.log(endpoint.value);
					await loading.dismiss();
					alert.present();
					return;
				}
				api.setConfig({ apiApp: apiApp.value, apiKey: apiKey.value, endpoint: endpoint.value });
				await loading.present();
				openToast("Ajustes actualizados");
			} catch (error) {
				openToast("Problemas al guardar los cambios");
			}
			await loading.dismiss();
		}
		return { pageTitle, endpoint, apiApp, apiKey, onClickSubmit, onChangeEndpoint, onChangeApiApp, onChangeApiKey };
	},
});
