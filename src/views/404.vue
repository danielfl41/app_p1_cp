<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>{{ folder }}</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<div id="container">
				<h1 ion-text color="secondary">404</h1>
				<p>Página no encontrada</p>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { useRoute } from "vue-router";
import { ref, computed, watch, defineComponent } from "vue";

export default defineComponent({
	name: "Error404",
	components: {
		IonButtons,
		IonContent,
		IonHeader,
		IonMenuButton,
		IonPage,
		IonTitle,
		IonToolbar,
	},
	setup() {
		const route = useRoute();
		const folder = ref(route.params.id || "Error");
		const matchedFolder = computed(() => route.params.id);

		watch(matchedFolder, () => {
			folder.value = matchedFolder.value as string;
		});

		return { folder };
	},
});
</script>

<style scoped>
ion-menu-button {
	color: var(--ion-color-primary);
}

#container {
	text-align: center;
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}
</style>
