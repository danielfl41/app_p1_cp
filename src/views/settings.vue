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
			<section>
				<ion-list>
					<ion-item>
						<ion-label position="fixed">Endpoint</ion-label>
						<ion-input
							placeholder="http://localhost:8080/api/v1"
							:value="endpoint"
							@ionChange="onChangeEndpoint"
						></ion-input>
					</ion-item>
					<ion-item>
						<ion-label position="fixed">Api App</ion-label>
						<ion-input @ionChange="onChangeApiApp" :value="apiApp" />
					</ion-item>
					<ion-item>
						<ion-label position="fixed">Api Key</ion-label>
						<ion-input @ionChange="onChangeApiKey" :value="apiKey" />
					</ion-item>
				</ion-list>
			</section>
			<section>
				<ion-button expand="block" @click="onClickSubmit">Guardar</ion-button>
			</section>
		</ion-content>
	</ion-page>
</template>
<script src="./settings.ts" lang="ts" />
