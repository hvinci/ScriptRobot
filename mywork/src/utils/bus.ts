/*
 * @Author: hvinci
 * @Date: 2023-10-23 23:06:45
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-20 13:18:33
 * @Description:
 */
import { reactive, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import { parse } from "./parse";
import { defaultScript } from "./defaultScript";
import { AST, STATUS } from "./interface";

const activeScript =  defaultScript;
let ast: AST;

try {
    ast = parse(activeScript);
    console.log("Successfully parsed activeScript");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (e: any) {
    console.error("Error parsing activeScript:", e.message);
    ElMessage.error(e.message);
    ElMessage.error("Uh-oh! Something went wrong while deciphering your genius code!");
    ElMessage.error("No worries, we've gracefully switched to default code. Better luck next time!");
    ast = parse(defaultScript);
}

interface User {
    username: string;
    status: STATUS;
    messageList: {
        author: string;
        type: string;
        data: { text: string };
    }[];
}

export const bus = reactive({
    activeScript,
    defaultScript,
    ast,
    userList: {} as Record<string, User>,
    
});

// 监视脚本变化
watchEffect(() => {
    const val = bus.activeScript;
    const oldVal =  defaultScript;

    try {
        bus.ast = parse(val);
        console.log("Successfully parsed new activeScript:", val);
        console.log("Parsed AST:", ast); 
        if (val !== oldVal) {
            localStorage.setItem('activeScript', val);
            console.log("Updated activeScript in localStorage:", val);
            ElMessage.success("Code successfully applied! Your brilliance knows no bounds!");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.error("Error parsing new activeScript:", e.message);
        bus.activeScript = oldVal;
        ElMessage.error(e.message);
    }
});
