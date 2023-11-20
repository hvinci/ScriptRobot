/*
 * @Author: hvinci
 * @Date: 2023-11-01 21:13:22
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-20 13:45:32
 * @Description: 翻译语法树
 */
import { AST, VARIABLE, ANSWER, STATUS } from "./interface";

/**
 * @description: 获取variable
 * @param {AST} ast
 * @return {*}
 */
export const getVari = (ast: AST): VARIABLE => ast.variable;

/**
 * @description: 初始化
 * @param {AST} ast
 * @param {VARIABLE} variable
 * @return {*}
 */
export const init = (ast: AST, variable: VARIABLE): STATUS => ({
    nowStepID: ast.entry, // 初始化step为入口welcome
    variable,
});

/**
 * @description: 执行脚本
 * @return {*}
 */
export function translate(
    ast: AST,        // AST（抽象语法树）对象，表示对话的结构
    status: STATUS,      // 状态对象，包含当前对话的状态信息
    answer: string,      // 用户的回答字符串
    enter = false,       // 是否为初始步骤，默认为 false
    silence = false
): ANSWER {

    if (enter) {
        const message = "";
        // 处理entry
        processEntry(message, ast, status);
    } else if (silence) {
        // 处理silence
        processSilence(ast, status);
    } else if (ast.hash[status.nowStepID].calculate) {
        // 处理calculate
        processCalculate(ast, status, answer);
    } else {
        // 处理 branch 和 default
        // 从当前对话步骤的 AST 中获取 branch 和 default 属性
        const { branch, default: defaultList } = ast.hash[status.nowStepID];

        // 尝试在分支中查找匹配用户回答的分支
        const matchingBranch = branch?.find(j => answer.includes(j.answer));

        // 根据匹配的结果更新当前对话步骤的 ID
        status.nowStepID = matchingBranch ? matchingBranch.stepID : (defaultList ? defaultList.stepID : '');

        // 如果最终没有匹配到任何分支或默认步骤
        if (!status.nowStepID) {
            // 抛出错误，表示没有定义默认步骤
            throw new Error("No default step");
        }
    }

    // 每个step都一定有say

    // 处理say和listen
    let message = "";
    const { say, listen } = ast.hash[status.nowStepID];

    if (say) {
        message += say.map((i) => {
            if (i.type === "string") {
                return i.args;
            } else if (i.type === "var") {
                return status.variable[i.args];
            } else {
                throw new Error("say args type error");
            }
        }).join('');
    }
    const time = listen ? listen.limit : 0;

    return {
        message: message,
        finish: ast.exit.includes(status.nowStepID),
        time: time,
    };
}

function processEntry(message: string, ast: AST, status: STATUS) {
    // 处理say
    message = processSayInfo(ast, status, "");
    // 处理listen
    const listen = ast.hash[status.nowStepID].listen;

    return {
        message: message,
        finish: ast.exit.includes(status.nowStepID), //检查当前step是否与exit的一致
        time: listen ? listen.limit : 0,
    };
}

function processSayInfo(ast: AST, status: STATUS, message: string): string {
    // sayInfo表示当前step中say的信息
    const sayInfo = (ast.hash[status.nowStepID]).say;

    //  若sayInfo不为空
    if (sayInfo) {
        // 将每个信息映射为字符串
        message += sayInfo.map((info) => {
            // 如果信息为字符串,则直接使用
            if (info.type == "string") {
                return info.args;
            }
            // 如果是变量,就使用status中对应变量的值
            else if (info.type == "var") {
                return status.variable[info.args];
            }
            else {
                throw new Error("say args type error");
            }
        }).join(''); // 连接
    }
    return message;
}
function processSilence(ast: AST, status: STATUS) {
    // 从当前对话步骤的 AST 中获取 silence 和 default 属性
    const { silence, default: defaultList } = ast.hash[status.nowStepID];

    if (silence) {
        // 将当前步骤切换到 silence.stepID 指定的步骤
        status.nowStepID = silence.stepID;
    } else if (defaultList) {
        // 将当前步骤切换到 defaultList.stepID 指定的步骤
        status.nowStepID = defaultList.stepID;
    } else {
        throw new Error("No silence step or default step");
    }
}


function processCalculate(ast: AST, status: STATUS, answer: string) {
    const calculate = ast.hash[status.nowStepID].calculate;
    try {
        calculate?.forEach(([variable, nextStepID, expression]) => {
            // 将表达式中的变量和占位符替换为当前状态的值和用户的回答
            const tmp = expression.replace(variable, status.variable[variable]).replace("INPUT", answer)
            // 计算表达式的值，并将结果存储到状态对象的相应变量中
            status.variable[variable] = eval(tmp).toString();
            // 切换到下一个步骤
            status.nowStepID = nextStepID;
        });
    } catch (e) {
        throw new Error("Calculate error");
    }
}

