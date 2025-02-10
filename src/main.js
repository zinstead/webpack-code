import { subtract } from "./js/subtract";
import { sum } from "./js/sum";
import "./css/index.css";
import "./less/index.less";
import "./css/iconfont.css";

console.log(subtract(100, 10));
console.log(sum(12, 345));

document.getElementById("btn").onclick = function () {
  // 给动态导入的模块重命名
  import(/* webpackChunkName: "add", webpackPreFetch: true */ "./js/add")
    .then((res) => {
      console.log("导入成功：", res);
    })
    .catch((err) => {
      console.log("导入失败：", err);
    });
};

const fn = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

fn();

const arr = [1, 2, 3];
console.log(arr.includes(2));

// 注册serviceWorker，使PWA生效
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
