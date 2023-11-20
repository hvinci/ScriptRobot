/*
 * @Author: hvinci
 * @Date: 2023-11-17 23:13:18
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-20 13:42:19
 * @Description: 解析脚本
 */

import { AST, SAY, LISTEN, SLIENCE, DEFAULT } from "./interface"

let ast: AST; // 语法树
let cline: number; // 当前行号
let current: string; // 当前step

/**
 * @description: 将脚本文件解析为语法树
 * @param {string} script
 * @return {*}
 */
export function parse(script: string): AST {

    current = "";
    cline = 1;

    // 初始化语法树
    initialize(script);

    // 对脚本逐行解析
    parseScript(script);

    // 验证
    check();

    return ast;

}
/**
 * @description: 初始化语法树
 * @return {*}
 */
function initialize(script:string) {
    ast = {
        hash: {},
        entry: "",
        exit: "",
        variable: {},
    }
    // 检查脚本类型是否为字符串
    if(typeof script != "string"){
        throw new TypeError("Expected code to be a string");
    }
}

/**
 * @description: 解析脚本
 * @param {string} script 脚本
 * @return {*} 
 */
function parseScript(script: string) {
    
    const lines = script.split("\n");
    // 逐行分隔并解析
    for (const line of lines.map(line => line.trim())) {
        // 跳过注释
        if (line == "" || line.startsWith("#")) {
            continue;
        }

        parseByLine(line);
        cline++;
    }
}

/**
 * @description: 按行解析脚本
 * @param {string} line 每一行的内容
 * @return {*}
 */

function parseByLine(line: string) {
    // 使用正则表达式匹配行中的所有字符串
    const stringRegex = (line.match(/"([^\\"\n]|\\.)*"/g) || []).map(str => str.substring(1, str.length - 1));

    //  用字符串 "string" 替换行中所有的字符串
    line = line.replace(/"([^\\"\n]|\\.)*"/g, "string");

    const tokens = line.split(" ");

    // 将正则表达式和被string翻译过的都传过去
    parseToken(tokens, stringRegex);
}

/**
 * @description: 解析token
 * @return {*}
 */

function parseToken(tokens: string[], words: string[]) {

    // 将token分隔为类型+参数
    
    //获取 token 的类型
    const type = tokens[0].toLowerCase();

    // 获取 token 的参数
    const sentence = tokens.slice(1).join(" ");

    switch (type) {
        case "step":
            parseStep(sentence);
            break;
        case "say":
            parseSay(sentence, words);
            break;
        case "listentimeout":
            parseListen(sentence);
            break;
        case "branch":
            parseBranch(sentence, words);
            break;
        case "silenceaction":
            parseSilence(sentence);
            break;
        case "defaultaction":
            parseDefault(sentence);
            break;
        case "exit":
            parseExit();
            break;
        case "calculate":
            parseCalculate(sentence);
            break;
        default:
            // 如果不是以上的 token 类型，则抛出异常
            throw new Error(
                "Your type must be one of step, say, listentimeout, branch, silenceaction, defaultaction,or exit. At Line: " +
                cline.toString()
            );
    }


}

/**
 * @description: 解析step
 * @return {*}
 */

function parseStep(args: string) {
    // 分割参数
    const stepInfo = args.split(" ");
    // step后加的参数有且只能有一个,为该step的stepInfo
    if(stepInfo.length == 0 || stepInfo[0].length == 0) {
        throw new Error(
            "Expected step to have one step id. At Line: " + cline.toString()
        );
    } else if (stepInfo.length > 1) {
        throw new Error(
            "Expected step to have only one step id. At Line: " +
                cline.toString()
        );
    }
    // 存入stepName 
    const name = stepInfo[0];
    
    // 加入行号信息
    ast.hash[name] = { line: cline, };

    // 添加entry
    if (Object.keys(ast.hash).length == 1)
        ast.entry = name;

    // 存储当前的step步骤
    current = name;

}

/**
 * @description: 解析say
 * @return {*}
 */


function parseSay(sentence: string, words: string[]) {
    // 将加号替换为空格
    sentence = sentence.replace(/\+/g, " ");

    const messages = sentence.split(" ");

    const say: SAY[] = [];

    let num = 0;
    // 遍历字符串
    for (const message of messages.map(msg => msg.trim())) {
        if (message == "string") {
            const arg = words[num]
            num++;
            say.push({
                type: "string",
                args: arg,
                lineNum: cline
            });
        } else if (message.startsWith("#")) {
            break; // 跳过注释
        } else if (message.startsWith('$')) {
            // 处理变量
            const vary = message;
            say.push({
                type: "var",
                args: vary,
                lineNum: cline
            });
            ast.variable[vary] = "";
        } else if (message.length > 0) {
            throw new Error(`Expected string or variable. At Line: ${cline}`);
        }
    }
    // 设置当前step中的speak参数
    ast.hash[current].say = say;

}

/**
 * @description: 解析listen
 * @return {*}
 */

function parseListen(argc: string): void {
    const wait = parseInt(argc);
    // 检查listenTimeout后的参数是否为数字
    if (isNaN(wait)) {
        throw new Error(`Expected time to be a number. At Line: ${cline}`);
    }

    const waitFor: LISTEN = {
        limit: wait,
        lineNum: cline,
    };

    ast.hash[current].listen = waitFor;
}

/**
 * @description: 解析branch
 * @return {*}
 */


function parseBranch(sentence: string, words: string[]) {
    // branch后的参数为: 用户可能的回复 + 针对回复应该前往的step
    const [answer, goto] = sentence.split(",").map((item) => item.trim());

    // 检查参数是否有且只有两个
    if (!answer || !goto) {
        throw new Error(`You must give branch two args. At Line: ${cline}`);
    }
    // 检查用户回复是否为string类型
    if (answer != "string") {
        
        throw new Error(`Your branch must have an answer string. At Line: ${cline}`);
    }
    const branchinfo = ast.hash[current].branch;
    if(branchinfo){ // 如果branch已经存在则直接加入
        branchinfo.push({
            answer: words[0],
            stepID: goto,
            lineNum: cline,
        });
    } else { // 如果branch不存在则创建branch
        ast.hash[current].branch = [
            {
                answer: words[0],
                stepID: goto,
                lineNum: cline,
            }
        ];
    }

}

/**
 * @description: 解析silence
 * @return {*}
 */

function parseSilence(args: string) {
    // 分割参数
    const silence = args.split(" ");
    // 检查silence后的参数是否有且只有一个
    if (silence.length != 1) {
        throw new Error(
            "Your silence must have one step. At Line: " + cline.toString()
        );
    }
    const silenceInfo: SLIENCE = {
        stepID: args,
        lineNum: cline
    }

    ast.hash[current].silence = silenceInfo;

}

/**
 * @description: 解析default
 * @return {*}
 */

function parseDefault(args: string) {
    const defaultLength = args.split(" ").length;
    // 检查default后的参数是否有且只有一个
    if (defaultLength != 1) {
        throw new Error(
            "Your default must have one step. At Line: " + cline.toString()
        );
    }

    const defaultInfo: DEFAULT = {
        stepID: args,
        lineNum: cline
    }

    ast.hash[current].default = defaultInfo;

}

/**
 * @description: 解析exit
 * @return {*}
 */

function parseExit() {
    // 将 stepId 加入到 exit 列表中
    ast.exit = current;

}

/**
 * @description: 解析calculate
 * @return {*}
 */

function parseCalculate(sentence: string): void {
    // 删除注释
    sentence = sentence.replace(/#.*$/, "");
    // caculate后的参数应该为三个: 需要的变量 + 下一步的stepNames + 计算操作
    const [arg1, arg2, arg3] = sentence.split(",").map((item) => item.trim());

    const calculate = ast.hash[current].calculate || ([] as string[][]);

    calculate.push([arg1, arg2, arg3]);

    ast.hash[current].calculate = calculate;

   
}

/**
 * @description: 验证ast结构的正确性
 * @return {*}
 */


export function check(check: AST = ast): void {

    //检查是否为空
    if (Object.keys(check.hash).length == 0) {
        throw new Error("Expected at least one step");
    }

    // 检查是否可以退出
    if (check.exit.length == 0) {
        throw new Error("Expected at least one exit step");
    }

    for (const [stepId, step] of Object.entries(check.hash)) {
        
        const { default: defaultList, silence, listen, branch, line } = step;

        // 至少有一个有效的default
        if (!defaultList && !check.exit.includes(stepId) && !step.calculate) {
            throw new Error(`Expected default step. At Line: ${line?.toString() }`);
        } else if (defaultList && !Object.keys(check.hash).includes(defaultList.stepID)) {
            throw new Error(`Default step ${defaultList.stepID} is invalid. At Line: ${defaultList.lineNum?.toString() }`);
        }

        // silence有效
        if (silence && !Object.keys(check.hash).includes(silence.stepID)) {
            throw new Error(`Silence step ${silence.stepID} is invalid. At Line: ${silence.lineNum?.toString() }`);
        }
        // listen不可以小于0
        if (listen && listen.limit <= 0) {
            throw new Error(`Listen time is invalid. At Line: ${listen.lineNum?.toString() }`);
        }
        // branch必须有效
        if (branch) {
            for (const { stepID, lineNum } of branch) {
                if (!Object.keys(check.hash).includes(stepID)) {
                    throw new Error(`Branch step ${stepID} is invalid. At Line: ${lineNum?.toString() }`);
                }
            }
        }
    }
    
}

