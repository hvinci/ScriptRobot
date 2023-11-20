/*
 * @Author: hvinci
 * @Date: 2023-10-23 23:22:40
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-20 13:19:21
 * @Description: 接口
 */


/**
 * Speak类型
 * 计算表达式合成一段文字
 */

export interface SAY {
    /**speak的类型 */
    type: string;
    /**行号 */
    lineNum: number;
    /**传入参数 */
    args: string;
}

/**
 * Listen类型
 * 调用媒体服务器对客户说的话录音，并进行语音识别
 * 语音识别的结果调用“自然语言分析服务”分析客户的意愿
 */

export interface LISTEN {
    /**listen的时间长短 */
    limit: number;
    /**行号 */
    lineNum: number;
}

/**
 * Branch类型
 * 对客户的意愿进行分支处理，不同的意愿，跳转到不同的Step
 */

export interface BRANCH {

    /**用户的回答 */
    answer: string;
    /**要跳转到的stepID */
    stepID: string;
    /**行号 */
    lineNum: number;
}

/**
 * Slience类型
 * 如果用户不说话，应该跳转到哪个Step
 */

export interface SLIENCE {
    /**要跳转到的stepID */
    stepID: string;
    /**行号 */
    lineNum: number;
}

/**
 * Default类型
 * 如果客户意愿没有相应匹配，应该跳转到哪个Step
 */

export interface DEFAULT {
    /**要跳转到的stepID */
    stepID: string;
    /**行号 */
    lineNum: number;
}

/**
 * Hashtable类型
 * @param key是哈希表的键
 */

export interface HASHTABLE {
    [key: string]: {
        say?: SAY[];
        listen?: LISTEN;
        default?: DEFAULT;
        silence?: SLIENCE;
        branch?: BRANCH[];
        calculate?: string[][];
        line?: number;
    }
}

/**
 * 变量的类型
 * @param info 变量的名字
 */

export interface INFO {
    [key: string]: string;
}

/**
 * AST
 */
export interface AST {
    /**哈希表 */
    hash: HASHTABLE;
    /**入口 */
    entry: string;
    /**出口 */
    exit: string;
    /**变量 */
    variable: VARIABLE;
}

/**
 * 变量类型
 */
export interface VARIABLE {
    [key: string]: string;
}

/** 回答类型 */
export interface ANSWER {
    /** 回答的内容 */
    message: string;
    /** 是否结束聊天 */
    finish: boolean;
    /** Listen 时间 */
    time: number;
}

/**
 * 当前运行状态
 */
export interface STATUS {

    nowStepID: string;

    variable: VARIABLE;
}

/*
 * 消息类型
 */
export interface MESSAGE {
    /** 作者 */
    author: string;
    /** 消息类型 */
    type: string;
    /** 消息内容 */
    data: {
        /** 消息文本 */
        text: string;
    };
}
