const productionAppOrigin = "https://streaming.nira.one";
const productionPublicApiBaseUrl = "https://api.nira.one/streaming";

export const appOrigin = process.env.OAUTH_APP_ORIGIN ?? productionAppOrigin;
export const publicApiBaseUrl = process.env.OAUTH_PUBLIC_API_BASE_URL ?? productionPublicApiBaseUrl;
