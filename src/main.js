import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Fileters
import parsedTime from "@/filters/parsedTime";

//Plugus
import "@/plugins/element-ui";
import SocketPlugin from "@/plugins/socket";

Vue.filter("parsedTime", parsedTime);
Vue.use(
  new SocketPlugin({
    url: process.env.VUE_APP_SOCKET_URL
  })
);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
