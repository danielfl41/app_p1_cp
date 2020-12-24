<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>{{ pageTitle }}</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-grid>
				<ion-list>
					<ion-item v-for="(integrante, index) in integrantes" :key="index">
						<ion-avatar slot="start">
							<img :src="integrante.avatar" />
						</ion-avatar>
						<ion-label>{{ integrante.name }}</ion-label>
					</ion-item>
				</ion-list>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>
<script src="./integrantes.ts" lang="ts" />
