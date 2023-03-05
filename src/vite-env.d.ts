/// <reference types="vite/client" />

declare module "weixin-js-sdk" {
  export function config(config: {
    debug: boolean;
    appId: string;
    timestamp: string;
    nonceStr: string;
    signature: string;
    jsApiList: string[];
  }): void;
  export function scanQRCode(config: {
    needResult: number;
    scanType: string[];
    success(res: any): void;
  });
}
