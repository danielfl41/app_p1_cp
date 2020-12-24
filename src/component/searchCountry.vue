<template
	><ion-page
		><ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>Seleccionar país</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="emit('close')">
						cerrar
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
			<ion-toolbar>
				<ion-searchbar
					class="btn"
					inputmode="search"
					placeholder="País"
					animated
					@ionChange="onChangeInput"
				></ion-searchbar>
			</ion-toolbar>
		</ion-header>
		<ion-content fullscreen>
			<ion-list>
				<ion-item
					v-for="(country, index) in filteredCountries"
					:key="country.code + index"
					@click="emit('select', country)"
					>{{ country.name }}
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-page></template
>
<script src="./searchCountry.ts" lang="ts" />
<style scoped>
.btn {
	--box-shadow: 50px;
}
</style>
