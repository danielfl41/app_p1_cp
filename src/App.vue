<template>
	<IonApp>
		<IonSplitPane content-id="main-content">
			<ion-menu content-id="main-content" type="overlay">
				<ion-content>
					<ion-list id="inbox-list">
						<ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
							<ion-item
								router-direction="root"
								:router-link="p.name"
								lines="none"
								detail="false"
								class="hydrated"
							>
								<ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
								<ion-label>{{ p.title }}</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>
				</ion-content>
			</ion-menu>
			<ion-router-outlet id="main-content"></ion-router-outlet>
		</IonSplitPane>
	</IonApp>
</template>
<script src="./App.ts" lang="ts" />
