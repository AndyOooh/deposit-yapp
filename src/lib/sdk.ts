import YappSDK from "@yodlpay/yapp-sdk";

const devOrigin = "http://localhost:3001/";
const prodOrigin = "https://yodl.me/";

export const sdk = new YappSDK({
  ensName: "deposit-yapp.yodl.eth",
  origin: process.env.NODE_ENV === "development" ? devOrigin : prodOrigin,
});
