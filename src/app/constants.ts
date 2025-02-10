export interface BaseFundingConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: "wallet" | "exchange" | "neobank" | "other";
  supportsMobile: boolean;
  supportedChains: string[];
  deepLink: {
    // mobile: string | ((ensName: string) => string);
    mobile: string | ((ensName: string) => string);
    // mobile: string;
    web?: string;
  };
}

export interface WalletConfig extends BaseFundingConfig {
  category: "wallet";
  supportsExtension: boolean;
}

export interface ExchangeConfig extends BaseFundingConfig {
  category: "exchange";
  supportsExtension: false; // Always false for exchanges
}

export interface NeoBankConfig extends BaseFundingConfig {
  category: "other";
  supportsExtension: false; // Always false for neobanks
}

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  wallet: "Transfer from a wallet.",
  exchange: "Transfer from a centralized exchange.",
  other: "Transfer from other apps.",
};

export const WALLET_CONFIGS: WalletConfig[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/icons/metamask-icon.svg",
    description: "Send tokens from MetaMask",
    category: "wallet",
    supportsExtension: true,
    supportsMobile: true,
    deepLink: {
      mobile: (ensName: string) => `dapp://yodl.me/${ensName}`,
      web: "https://metamask.app.link/",
    },
    supportedChains: ["ethereum", "polygon", "arbitrum", "optimism", "base"],
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "/icons/phantom-icon.svg",
    description: "Send tokens from Phantom wallet",
    category: "wallet",
    supportsExtension: true,
    supportsMobile: true,
    deepLink: {
      mobile: (ensName: string) =>
        `https://phantom.app/ul/browse/${encodeURIComponent(`https://yodl.me/${ensName}`)}?ref=${encodeURIComponent("yodl.me")}`,
      web: "https://phantom.com/download",
    },
    supportedChains: ["ethereum", "polygon", "arbitrum", "optimism", "base"],
  },
  {
    id: "trustwallet",
    name: "TrustWallet",
    icon: "/icons/trustwallet-icon.svg",
    description: "Send tokens from Trust Wallet",
    category: "wallet",
    supportsExtension: false,
    supportsMobile: true,
    deepLink: {
      mobile: (ensName: string) => `https://link.trustwallet.com/open_url?url=yodl.me/${ensName}`,
      web: "https://link.trustwallet.com/",
    },
    supportedChains: ["ethereum", "polygon", "arbitrum", "optimism", "base"],
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "/icons/coinbase-icon.svg",
    description: "Send tokens from Coinbase Wallet",
    category: "wallet",
    supportsExtension: true,
    supportsMobile: true,
    deepLink: {
      mobile: (ensName: string) => `https://go.cb-w.com/dapp?cb_url=yodl.me/${ensName}`,
      web: "https://wallet.coinbase.com/",
    },
    supportedChains: ["ethereum", "polygon", "arbitrum", "optimism", "base"],
  },
];

export const EXCHANGE_CONFIGS: ExchangeConfig[] = [
  {
    id: "binance",
    name: "Binance",
    icon: "/icons/binance-icon.svg",
    description: "Send tokens from your Binance account",
    category: "exchange",
    supportsExtension: false,
    supportsMobile: true,
    supportedChains: ["ethereum", "polygon", "arbitrum", "optimism", "base"],
    deepLink: {
      mobile: "bnc://app.binance.com/accounts/spot",
      web: "https://www.binance.com/en/my/wallet/account/main",
    },
  },
  {
    id: "mexc",
    name: "MEXC",
    icon: "/icons/mexc-icon.svg",
    description: "Send tokens from your MEXC account",
    category: "exchange",
    supportsExtension: false,
    supportsMobile: true,
    supportedChains: ["ethereum", "polygon", "arbitrum", "optimism"],
    deepLink: {
      // mobile: "mexc://app",
      mobile: "https://www.mexc.co/download",
      web: "https://www.mexc.com/assets/withdraw",
    },
  },
  {
    id: "bybit",
    name: "Bybit",
    icon: "/icons/bybit-icon.png",
    description: "Send tokens from your Bybit account",
    category: "exchange",
    supportsExtension: false,
    supportsMobile: true,
    supportedChains: ["ethereum", "polygon", "arbitrum", "optimism"],
    deepLink: {
      // mobile: "bybit://app",
      mobile: "https://bybit.onelink.me/EhY6/u3l3x25k",
      web: "https://www.bybit.com/app/assets/spot",
    },
  },
];

export const NEOBANK_CONFIGS: NeoBankConfig[] = [
  {
    id: "revolut",
    name: "Revolut",
    icon: "/icons/revolut-icon.svg",
    description: "Send tokens from your Revolut account",
    category: "other",
    supportsExtension: false,
    supportsMobile: true,
    supportedChains: ["ethereum"],
    deepLink: {
      mobile: "revolut://app",
      web: "https://app.revolut.com/crypto",
    },
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "/icons/paypal-icon.svg",
    description: "Send tokens from your PayPal account",
    category: "other",
    supportsExtension: false,
    supportsMobile: true,
    supportedChains: ["ethereum", "bitcoin"],
    deepLink: {
      mobile: "paypal://crypto",
      web: "https://www.paypal.com/myaccount/crypto",
    },
  },
];

export const ALL_FUNDING_CONFIGS = [...WALLET_CONFIGS, ...EXCHANGE_CONFIGS, ...NEOBANK_CONFIGS] as const;

export type FundingConfig = WalletConfig | ExchangeConfig | NeoBankConfig;
