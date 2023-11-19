/*
 * @Author: hvinci
 * @Date: 2023-10-23 22:54:19
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-04 22:41:59
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Chat from "vue3-beautiful-chat";

const app= createApp(App)
app.use(ElementPlus);
app.use(Chat);
app.mount('#app');
