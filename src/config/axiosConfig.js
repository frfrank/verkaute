import axios from "axios";
import store from "@/store";

const delayedResponse = (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response.data), 750));

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.response.use(
  (response) =>
    process.env.NODE_ENV === "offline"
      ? delayedResponse(response)
      : response.data,
  (error) => {
    if (
      error.response.status === 401 &&
      !error.response.config.url.includes("login")
    ) {
      store.dispatch("authModule/logout");

      window.Vue.$router.push({
        name: "login",
      });
    }

    return Promise.reject(error);
  }
);

export default axios;
