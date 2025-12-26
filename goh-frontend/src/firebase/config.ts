// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 数据库
import { getAuth } from "firebase/auth";           // 🟢 新增：认证服务

// 🔴 警告：请务必把下面的字符串换成你 Firebase 控制台里真实的配置！
// 不要保留 "......"，否则会报错 "Invalid API Key"
const firebaseConfig = {
    apiKey: "AIzaSyARwcZ_4SV_0HbLe0umeT-WkjCQk-kvCmw",
    authDomain: "goh-frontend.firebaseapp.com",
    projectId: "goh-frontend",
    storageBucket: "goh-frontend.firebasestorage.app",
    messagingSenderId: "667091169322",
    appId: "1:667091169322:web:fbd520888b4b51b32b9353",
    measurementId: "G-C8HXCHHZQN"
};

// 1. 初始化 Firebase 应用
const app = initializeApp(firebaseConfig);

// 2. 导出数据库实例 (用于文章、疾病信息)
export const db = getFirestore(app);

// 3. 🟢 导出认证实例 (用于登录、注册、修改密码)
export const auth = getAuth(app);