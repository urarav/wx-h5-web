<template>
  <div class="box" @click="onClick"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import request from "../utils/request";
import wx from "weixin-js-sdk";
onMounted(() => {
  type reqParams = Record<
    "appId" | "timestamp" | "noncestr" | "signature",
    string
  >;
  console.log(wx)
  const [url] = location.href.split("#");
  request
    .get<reqParams>(`/wx/jsapi?url=${encodeURIComponent(url)}`)
    .then(({ appId, timestamp, noncestr: nonceStr, signature }: reqParams) => {
      console.log({ appId, timestamp, nonceStr, signature });
      wx.config({
        debug: true,
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: ["scanQRCode"],
      });
    });
});

const onClick = () => {
  wx.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
      var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      console.log(result);
    },
  });
};
</script>

<style lang="scss" scoped>
.box {
  width: 375px;
  height: 375px;
  background-color: aqua;
}
</style>
