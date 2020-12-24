import SearchCountry from "@/component/searchCountry.vue";
import { arrayValidation, vRangeMax, vRangeMin, vRequired } from "@/tools/validator";
import {
	alertController,
	IonButton,
	IonButtons,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonInput,
	IonItem,
	IonItemDivider,
	IonItemGroup,
	IonLabel,
	IonList,
	IonMenuButton,
	IonModal,
	IonPage,
	IonRow,
	IonSearchbar,
	IonSelect,
	IonSelectOption,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/vue";
import { computed, defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
	name: "Indicators",
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
		IonLabel,
		IonList,
		IonItem,
		IonSelectOption,
		IonSelect,
		IonSearchbar,
		IonModal,
		IonButton,
		SearchCountry,
		IonInput,
		IonItemGroup,
		IonItemDivider,
		IonText,
	},
	setup() {
		const minYear = 1960;
		const maxYear = new Date().getFullYear();
		function genRange(min: number, max: number) {
			const size = max - min + 1;
			return new Array(size).fill(0).map((e, index) => min + index);
		}
		const years = Object.freeze(genRange(minYear, maxYear).reverse());
		const route = useRoute();
		const router = useRouter();
		const indicadores = ref(route.params.id || "Indicadores");
		const matched = computed(() => route.params.id);
		const indicators: Readonly<{ id: string; name: string; unit: string }[]> = Object.freeze([
			{
				id: "PIB",
				name: "Producto Interno Bruto",
				unit: "US$",
			},
			{
				id: "TDA",
				name: "Tasa de desempleo anual",
				unit: "%",
			},
			{
				id: "IFL",
				name: "Inflación",
				unit: "%",
			},
			{
				id: "IVA",
				name: "Impuesto de Valor Añadido",
				unit: "%",
			},
			{
				id: "PRF",
				name: "Presión Fiscal",
				unit: "%",
			},
			{
				id: "SMI",
				name: "Salario Mínimo",
				unit: "US$",
			},
			{
				id: "TSC",
				name: "Tasa de cambio",
				unit: "US$ (por unidad)",
			},
			{
				id: "DBI",
				name: "Doing Business Index",
				unit: "Posición en el ranking (menos es mejor)",
			},
		]);
		const isOpenRef1 = ref(false);
		const setOpen1 = (state: boolean) => (isOpenRef1.value = state);
		const country1 = ref<{ code: string; name: string } | null>(null);
		const isOpenRef2 = ref(false);
		const setOpen2 = (state: boolean) => (isOpenRef2.value = state);
		const country2 = ref<{ code: string; name: string } | null>(null);
		function onSelectCountry1(country: { code: string; name: string }) {
			country1.value = country;
			setOpen1(false);
		}
		function onSelectCountry2(country: { code: string; name: string }) {
			country2.value = country;
			setOpen2(false);
		}
		let indicatorCode = "";
		let startYear = NaN;
		let endYear = NaN;
		const rules = {
			indicator: [vRequired()],
			country1: [
				vRequired(),
				(i: string) =>
					i && country2.value?.code
						? i !== country2.value.code
							? true
							: "El país 1 debe ser distinto al país 2"
						: true,
			],
			country2: [
				vRequired(),
				(i: string) =>
					i && country1.value?.code
						? i !== country1.value.code
							? true
							: "El país 2 debe ser distinto al país 1"
						: true,
			],
			startYear: [
				vRequired(),
				vRangeMin(minYear),
				vRangeMax(maxYear),
				(i: string) =>
					i && !isNaN(endYear)
						? Number(i) < endYear
							? true
							: "El año de inicio debe ser menor al de término"
						: true,
			],
			endYear: [
				vRequired(),
				vRangeMin(minYear),
				vRangeMax(maxYear),
				(i: string) =>
					i && !isNaN(startYear)
						? Number(i) > startYear
							? true
							: "El año de término debe ser mayor a la de inicio"
						: true,
			],
		};
		let vIndicatorError: string | boolean = false;
		let vCountry1Error: string | boolean = false;
		let vCountry2Error: string | boolean = false;
		let vStartYearError: string | boolean = false;
		let vEndYearError: string | boolean = false;
		function onChangeIndicator(e: any) {
			if (e && e.detail && e.detail.value) indicatorCode = e.detail.value as string;
		}
		function onChangeStartYear(e: any) {
			if (e && e.detail && e.detail.value) {
				startYear = e.detail.value as number;
			}
		}
		function onChangeEndYear(e: any) {
			if (e && e.detail && e.detail.value) {
				endYear = e.detail.value as number;
				vEndYearError = arrayValidation(`${endYear}`, rules["endYear"]);
			}
		}
		async function onSubmit() {
			vStartYearError = arrayValidation(`${startYear}`, rules["startYear"]);
			vEndYearError = arrayValidation(`${endYear}`, rules["endYear"]);
			vIndicatorError = arrayValidation(`${indicatorCode}`, rules["indicator"]);
			vCountry1Error = arrayValidation(`${country1.value ? country1.value.code : ""}`, rules["country1"]);
			vCountry2Error = arrayValidation(`${country2.value ? country2.value.code : ""}`, rules["country2"]);
			if (
				typeof vStartYearError === "string" ||
				typeof vEndYearError === "string" ||
				typeof vIndicatorError === "string" ||
				typeof vCountry1Error === "string" ||
				typeof vCountry2Error === "string"
			) {
				const message =
					"<ul>" +
					[
						["Indicador", vIndicatorError],
						["País 1", vCountry1Error],
						["Paś 2", vCountry2Error],
						["Año de inicio", vStartYearError],
						["Año de término", vEndYearError],
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
				return alert.present();
			} else {
				const query = btoa(
					JSON.stringify({
						country1: country1.value,
						country2: country2.value,
						indicatorCode,
						endYear,
						startYear,
					}),
				);
				router.push({ name: "chart", query: { render: query } });
				indicatorCode = "";
				startYear = NaN;
				endYear = NaN;
				country1.value = null;
				country2.value = null;
			}
		}
		watch(matched, () => {
			indicadores.value = matched.value as string;
		});
		const country1Name = computed(() => (country1.value ? country1.value.name : ""));
		const country2Name = computed(() => (country2.value ? country2.value.name : ""));
		const selectedIndicator = computed(() => indicators.find((ind) => ind.id === indicatorCode));
		return {
			indicadores,
			selectedIndicator,
			indicators,
			years,
			country1Name,
			country2Name,
			isOpenRef2,
			isOpenRef1,
			setOpen1,
			onSelectCountry1,
			setOpen2,
			onSelectCountry2,
			onChangeIndicator,
			onChangeStartYear,
			onChangeEndYear,
			onSubmit,
		};
	},
});
