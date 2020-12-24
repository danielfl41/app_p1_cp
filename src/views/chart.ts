import { Api } from "@/boot/Api";
import { api } from "@/main";
import {
	IonBackButton,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar,
	loadingController,
	toastController,
} from "@ionic/vue";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
	name: "chart",
	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonButton,
		IonButtons,
		IonTitle,
		IonMenuButton,
		IonContent,
		IonBackButton,
		IonText,
		apexchart: VueApexCharts,
	},
	setup() {
		const route = useRoute();
		const pageTitle = ref(route.params.id || "Gráfico");
		const matched = computed(() => route.params.id);
		const currencyFormatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		});
		const apexOptions = ref({
			chart: {
				id: "chart paises",
				toolbar: {
					show: false,
				},
			},

			xaxis: {
				type: "datetime",
				labels: {
					datetimeFormatter: {
						year: "yyyy",
						month: "yyyy",
						day: "yyyy",
						hour: "yyyy",
					},
				},
			},
			yaxis: {
				labels: {
					formatter: (value: number) => {
						return `${value}`;
					},
				},
			},
			tooltip: {
				x: {
					format: "yyyy",
				},
			},
		});
		const chartControl = ref(0);
		const apexSeries = ref<{ name: string; data: { x: number; y: number }[] }[]>([
			{ name: "inválido", data: [] },
			{ name: "inválido", data: [] },
		]);
		const chartTitle = ref("");
		const chartUnit = ref("");
		async function openToast(message: string) {
			const toast = await toastController.create({
				message,
				duration: 2000,
			});
			return toast.present();
		}
		watch(matched, () => {
			pageTitle.value = matched.value as string;
		});
		const chartParams = computed<{
			country1: { code: string; name: string };
			country2: { code: string; name: string };
			indicatorCode: string;
			endYear: number;
			startYear: number;
		} | null>(() => {
			try {
				const config = atob(route.query["render"] as string);
				return JSON.parse(config);
			} catch (error) {
				return null;
			}
		});
		async function init() {
			const loading = await loadingController.create({
				message: "Cargando...",
			});
			await loading.present();
			try {
				if (!chartParams.value) throw new Error("Invalid params");
				const { country1, country2, endYear, indicatorCode, startYear } = chartParams.value;
				let response1: Api.Indicator[] = [];
				let response2: Api.Indicator[] = [];
				await Promise.all([
					api.inidicatorInfo(country1.code, indicatorCode, startYear, endYear).then((r) => (response1 = r)),
					api.inidicatorInfo(country2.code, indicatorCode, startYear, endYear).then((r) => (response2 = r)),
				]);
				if (response1.length > 0) {
					const unit = response1[0].unit.toLowerCase();
					switch (unit) {
						case "%": {
							apexOptions.value["yaxis"].labels.formatter = (value: number) => `${value}%`;
							break;
						}
						case "us$": {
							apexOptions.value["yaxis"].labels.formatter = (value: number) =>
								currencyFormatter.format(value / 1e9);
							break;
						}
					}
					chartTitle.value = response1[0].name;
					chartUnit.value = unit;
					apexSeries.value[0].name = response1[0].country.name;
					apexSeries.value[0].data = response1
						.filter((indicator) => indicator.value !== null)
						.map((indicator) => ({
							x: indicator.year,
							y: indicator.value,
						}));
				}
				if (response2.length > 0) {
					apexSeries.value[1].name = response2[0].country.name;
					apexSeries.value[1].data = response2
						.filter((indicator) => indicator.value !== null)
						.map((indicator) => ({
							x: indicator.year,
							y: indicator.value,
						}));
				}
				chartControl.value++;
			} catch (error) {
				openToast("Problemas al cargar el gráffico");
				console.log(error);
			}
			await loading.dismiss();
		}
		onMounted(() => init());
		return { chartTitle, chartUnit, chartControl, pageTitle, chartParams, apexOptions, apexSeries };
	},
});
