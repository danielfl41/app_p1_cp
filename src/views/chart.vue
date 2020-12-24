<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start"> <ion-back-button></ion-back-button> </ion-buttons>
				<ion-title>{{ pageTitle }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<section>
				<ion-text color="secondary" class="ion-text-center">
					<h4>{{ chartTitle }}</h4>
					<ion-text color="dark">
						<div>{{ chartUnit }} / año</div>
					</ion-text>
				</ion-text>
			</section>
			<section>
				<apexchart width="100%" type="line" :options="apexOptions" :series="apexSeries" :key="chartControl" />
			</section>
		</ion-content>
	</ion-page>
</template>
<script src="./chart.ts" lang="ts" />
