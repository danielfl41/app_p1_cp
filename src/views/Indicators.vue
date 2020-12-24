<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>{{ indicadores }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<section>
				<ion-list>
					<ion-item>
						<ion-label position="floating">Indicador</ion-label>
						<ion-select @ionChange="onChangeIndicator">
							<ion-select-option v-for="indicator in indicators" :key="indicator.id" :value="indicator.id"
								>{{ indicator.id }} - {{ indicator.name }}</ion-select-option
							>
						</ion-select>
					</ion-item>
					<ion-item @click="setOpen1(true)">
						<ion-label position="floating">País 1</ion-label>
						<ion-input readonly :value="country1Name"></ion-input>
						<ion-modal :is-open="isOpenRef1" @onDidDismiss="setOpen1(false)">
							<search-country @select="onSelectCountry1" @close="setOpen1(false)" />
						</ion-modal>
					</ion-item>
					<ion-item @click="setOpen2(true)">
						<ion-label position="floating">País 2</ion-label>
						<ion-input readonly :value="country2Name"></ion-input>
						<ion-modal :is-open="isOpenRef2" @onDidDismiss="setOpen2(false)">
							<search-country @select="onSelectCountry2" @close="setOpen2(false)" />
						</ion-modal>
					</ion-item>
					<ion-item>
						<ion-label position="floating">Desde</ion-label>
						<ion-select @ionChange="onChangeStartYear">
							<ion-select-option v-for="(year, index) in years" :key="year + index" :value="year">{{
								year
							}}</ion-select-option>
						</ion-select>
					</ion-item>
					<ion-item>
						<ion-label position="floating">Hasta</ion-label>
						<ion-select @ionChange="onChangeEndYear">
							<ion-select-option v-for="(year, index) in years" :key="year + index" :value="year">{{
								year
							}}</ion-select-option>
						</ion-select>
					</ion-item>
				</ion-list>
			</section>
			<section>
				<ion-button expand="block" @click="onSubmit">Graficar</ion-button>
			</section>
		</ion-content>
	</ion-page>
</template>
<script src="./indicators.ts" lang="ts" />
<style scoped>
.btn {
	--box-shadow: 50px;
}
.error-caption {
	font-size: 0.8em;
}
</style>
