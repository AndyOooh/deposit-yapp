// import { UserContextResponseMessage } from "@yodlpay/yapp-sdk/dist/types/messages";

import { sdk } from "@/lib/sdk";
import { UserContext, PaymentRequest, PaymentConfig, Payment, FiatCurrency } from "@yodlpay/yapp-sdk/types";

export type UserContext1 = UserContext;
// export type UserContext1 = UserContextResponseMessage["payload"];

const a: PaymentRequest = {
  amount: 100,
  address: "0x1234567890",
  currency: FiatCurrency.USD,
  //   currency: "USD",
  memo: "Payment for a product",
};

const b: PaymentConfig = {
  amount: 100,
  currency: FiatCurrency.USD,
  memo: "Payment for a product",
  redirectUrl: "https://example.com",
};

const c: Payment = {
  txHash: "0xsdasd",
  chainId: 1,
};

// const d: number = await sdk.requestPayment();
