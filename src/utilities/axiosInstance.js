import axios from "axios";

const instance = axios.create({
    baseURL: "https://simpleblogapi.herokuapp.com/"
})

export default instance;