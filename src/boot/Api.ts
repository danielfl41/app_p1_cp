export class Api {
	constructor(
		config: { endpoint: string; apiKey?: string; apiApp?: string } = { endpoint: "http://localhost:8080/api/v1" },
	) {
		this.endpoint = config.endpoint;
		this.apiApp = config.apiApp ? config.apiApp : "";
		this.apiKey = config.apiKey ? config.apiKey : "";
	}
	private endpoint: string;
	private apiApp: string;
	private apiKey: string;
	private _headers: Record<string, unknown> = {};
	private get headers() {
		return {
			...{
				"Content-Type": "application/json",
				"X-API-APP": this.apiApp,
				"X-API-KEY": this.apiKey,
			},
			...this._headers,
		};
	}
	async listCountries(): Promise<Api.Country[]> {
		const response = await fetch(`${this.endpoint}/countries/all`, {
			headers: this.headers,
		});
		return await response.json();
	}
	async inidicatorInfo(
		countryCode: string,
		indicatorCode: string,
		startYear: number,
		endYear: number,
	): Promise<Api.Indicator[]> {
		const response = await fetch(`${this.endpoint}/indicators/info`, {
			headers: this.headers,
			method: "POST",
			body: JSON.stringify({
				countryCode,
				endYear,
				startYear,
				indicatorCode,
			}),
		});
		return response.json();
	}
	setConfig(config: Partial<{ endpoint: string; apiKey: string; apiApp: string }>) {
		if (config.endpoint) this.endpoint = config.endpoint;
		if (config.apiApp) this.apiApp = config.apiApp;
		if (config.apiKey) this.apiKey = config.apiKey;
	}
	getConfig() {
		return { apiKey: this.apiKey, apiApp: this.apiApp, endpoint: this.endpoint };
	}
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Api {
	export interface Country {
		code: string;
		abbr: string;
		currencyCode: string;
		lang: string;
		name: string;
	}
	export interface Indicator {
		code: string;
		name: string;
		unit: string;
		value: number;
		year: number;
		country: Country;
	}
}
