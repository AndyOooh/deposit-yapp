import YappSDK from "@yodlpay/yapp-sdk";

const devOrigin = "http://localhost:3000/";
const prodOrigin = "https://yodl.me/";

export const sdk = new YappSDK({
  origin: process.env.NODE_ENV === "development" ? devOrigin : prodOrigin,
});
