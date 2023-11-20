/* eslint-disable @typescript-eslint/no-explicit-any */
import {parse, check} from "../../src/utils/parse"

test("解析默认脚本:",()=>{
    expect(
        JSON.stringify(
            parse(
                `# comment
                step welcome 
                    say $name+"您好！欢迎光临瑞幸咖啡！我是您的智能咖啡助手。有什么可以帮助您的吗?"
                    listenTimeout 5
                    branch "查询咖啡种类和价格", productQuery
                    branch "下订单", placeOrder
                    branch "查询订单状态", orderStatusQuery
                    branch "店铺信息", storeInfo
                    branch "投诉与建议", feedback
                    branch "常见问题解答", faq
                    branch "退出", exit
                    silenceAction silence
                    defaultAction default
                    
                step productQuery 
                    say "想了解我们的咖啡种类和价格吗？我们提供的咖啡有: 马斯卡彭生酪拿铁 18元/杯、生椰拿铁 18元/杯、酱香拿铁 19元/杯、圣诞烤布丁拿铁 21元/杯、太妃真香厚乳拿铁 19元/杯。"
                    branch "了解更多", faq
                    branch "我想下订单", placeOrder
                    defaultAction default
                step placeOrder 
                    say "如果您想订购咖啡，只需告诉我您想要的产品的价格.我将为您计算您的账户余额.您当前的余额为:" + $account #comment
                    Calculate $account,afterPlaceOrder,$account - INPUT #comment

                step afterPlaceOrder 
                    say "购买成功,您的账户余额为:"+ $account + "请问您还有什么需求吗?"
                    listenTimeout 5
                    branch "查询咖啡种类和价格", productQuery
                    branch "下订单", placeOrder
                    branch "查询订单状态", orderStatusQuery
                    branch "店铺信息", storeInfo
                    branch "投诉与建议", feedback
                    branch "常见问题解答", faq
                    branch "退出", exit
                    silenceAction silence
                    defaultAction default

                step orderStatusQuery 
                    say "您的订单正在制作中,请稍等"
                    listenTimeout 5
                    branch "查询咖啡种类和价格", productQuery
                    branch "下订单", placeOrder
                    branch "查询订单状态", orderStatusQuery
                    branch "店铺信息", storeInfo
                    branch "投诉与建议", feedback
                    branch "常见问题解答", faq
                    branch "退出", exit
                    silenceAction silence
                    defaultAction default

                step storeInfo 
                    say "需要了解附近店铺的位置和营业时间吗？告诉我您所在的城市，我会为您提供相关信息。"
                    branch "瑞幸咖啡的营业时间是多久", businessHours
                    defaultAction default

                step businessHours
                    say "瑞幸咖啡的营业时间可能因地区而异。通常，我们的店铺在早上8点至晚上10点之间营业。"
                    listenTimeout 5
                    branch "查询咖啡种类和价格", productQuery
                    branch "下订单", placeOrder
                    branch "查询订单状态", orderStatusQuery
                    branch "店铺信息", storeInfo
                    branch "投诉与建议", feedback
                    branch "常见问题解答", faq
                    branch "退出", exit
                    silenceAction silence
                    defaultAction default

                step feedback 
                    say "如果您有任何投诉或建议，我们非常重视。请告诉我您的问题，我将尽力帮助您或转接您至相关部门。"
                    defaultAction feedbackFinish

                step feedbackFinish
                    say "好了，你的投诉已经牢牢地被我记在小本本上了。请问还有什么可以帮到您的?"
                    listenTimeout 5
                    branch "查询咖啡种类和价格", productQuery
                    branch "下订单", placeOrder
                    branch "查询订单状态", orderStatusQuery
                    branch "店铺信息", storeInfo
                    branch "投诉与建议", feedback
                    branch "常见问题解答", faq
                    branch "退出", exit
                    silenceAction silence
                    defaultAction default

                step faq 
                    say "有关账户、支付、配送等方面的常见问题，您可以直接问我，我会提供尽可能详细的解答。比如,您可以问我:如何创建账户、支付方式有哪些、配送服务说明"
                    branch "如何创建账户", accountCreation
                    branch "支付方式有哪些", paymentMethods
                    branch "配送服务说明", deliveryDetails
                    defaultAction default

                step accountCreation
                    say "要创建瑞幸咖啡账户，您可以访问我们的官方网站或使用我们的移动应用。在注册过程中，您需要提供一些基本信息，如电子邮件地址和密码。完成注册后，您就可以享受更多会员福利了。"
                    listenTimeout 5
                    branch "查询咖啡种类和价格", productQuery
                    branch "下订单", placeOrder
                    branch "查询订单状态", orderStatusQuery
                    branch "店铺信息", storeInfo
                    branch "投诉与建议", feedback
                    branch "常见问题解答", faq
                    branch "退出", exit
                    silenceAction silence
                    defaultAction default

                step paymentMethods
                    say "我们接受多种支付方式，包括信用卡、支付宝和微信支付。您可以在下单时选择最方便的支付方式完成交易。"
                    listenTimeout 5
                    branch "查询咖啡种类和价格", productQuery
                    branch "下订单", placeOrder
                    branch "查询订单状态", orderStatusQuery
                    branch "店铺信息", storeInfo
                    branch "投诉与建议", feedback
                    branch "常见问题解答", faq
                    branch "退出", exit
                    silenceAction silence
                    defaultAction default

                step deliveryDetails
                    say "我们提供快捷可靠的配送服务。配送时间和费用可能会根据您所在的地区而有所不同。在结账时，您可以查看详细的配送选项和费用信息。如果有特殊要求，请告诉我，我们将尽力满足您的需求。"
                    listenTimeout 5
                    branch "查询咖啡种类和价格", productQuery
                    branch "下订单", placeOrder
                    branch "查询订单状态", orderStatusQuery
                    branch "店铺信息", storeInfo
                    branch "投诉与建议", feedback
                    branch "常见问题解答", faq
                    branch "退出", exit
                    silenceAction silence
                    defaultAction default

                step exit 
                    say "感谢您选择瑞幸咖啡！再见。"
                    exit

                step silence 
                    say "听不清，请您大声一点可以吗?"
                    listenTimeout 5
                    branch "查询咖啡种类和价格", productQuery
                    branch "下订单", placeOrder
                    branch "查询订单状态", orderStatusQuery
                    branch "店铺信息", storeInfo
                    branch "投诉与建议", feedback
                    branch "常见问题解答", faq
                    branch "退出", exit
                    silenceAction silence
                    defaultAction default

                step default 
                    say "抱歉，我不明白你的意思."
                    listenTimeout 5
                    branch "查询咖啡种类和价格", productQuery
                    branch "下订单", placeOrder
                    branch "查询订单状态", orderStatusQuery
                    branch "店铺信息", storeInfo
                    branch "投诉与建议", feedback
                    branch "常见问题解答", faq
                    branch "退出", exit
                    silenceAction silence
                    defaultAction default
                `)
        )
    ).toBe(
        '{"hash":{"welcome":{"line":1,"say":[{"type":"var","args":"$name","lineNum":2},{"type":"string","args":"您好！欢迎光临瑞幸咖啡！我是您的智能咖啡助手。有什么可以帮助您的吗?","lineNum":2}],"listen":{"limit":5,"lineNum":3},"branch":[{"answer":"查询咖啡种类和价格","stepID":"productQuery","lineNum":4},{"answer":"下订单","stepID":"placeOrder","lineNum":5},{"answer":"查询订单状态","stepID":"orderStatusQuery","lineNum":6},{"answer":"店铺信息","stepID":"storeInfo","lineNum":7},{"answer":"投诉与建议","stepID":"feedback","lineNum":8},{"answer":"常见问题解答","stepID":"faq","lineNum":9},{"answer":"退出","stepID":"exit","lineNum":10}],"silence":{"stepID":"silence","lineNum":11},"default":{"stepID":"default","lineNum":12}},"productQuery":{"line":13,"say":[{"type":"string","args":"想了解我们的咖啡种类和价格吗？我们提供的咖啡有: 马斯卡彭生酪拿铁 18元/杯、生椰拿铁 18元/杯、酱香拿铁 19元/杯、圣诞烤布丁拿铁 21元/杯、太妃真香厚乳拿铁 19元/杯。","lineNum":14}],"branch":[{"answer":"了解更多","stepID":"faq","lineNum":15},{"answer":"我想下订单","stepID":"placeOrder","lineNum":16}],"default":{"stepID":"default","lineNum":17}},"placeOrder":{"line":18,"say":[{"type":"string","args":"如果您想订购咖啡，只需告诉我您想要的产品的价格.我将为您计算您的账户余额.您当前的余额为:","lineNum":19},{"type":"var","args":"$account","lineNum":19}],"calculate":[["$account","afterPlaceOrder","$account - INPUT"]]},"afterPlaceOrder":{"line":21,"say":[{"type":"string","args":"购买成功,您的账户余额为:","lineNum":22},{"type":"var","args":"$account","lineNum":22},{"type":"string","args":"请问您还有什么需求吗?","lineNum":22}],"listen":{"limit":5,"lineNum":23},"branch":[{"answer":"查询咖啡种类和价格","stepID":"productQuery","lineNum":24},{"answer":"下订单","stepID":"placeOrder","lineNum":25},{"answer":"查询订单状态","stepID":"orderStatusQuery","lineNum":26},{"answer":"店铺信息","stepID":"storeInfo","lineNum":27},{"answer":"投诉与建议","stepID":"feedback","lineNum":28},{"answer":"常见问题解答","stepID":"faq","lineNum":29},{"answer":"退出","stepID":"exit","lineNum":30}],"silence":{"stepID":"silence","lineNum":31},"default":{"stepID":"default","lineNum":32}},"orderStatusQuery":{"line":33,"say":[{"type":"string","args":"您的订单正在制作中,请稍等","lineNum":34}],"listen":{"limit":5,"lineNum":35},"branch":[{"answer":"查询咖啡种类和价格","stepID":"productQuery","lineNum":36},{"answer":"下订单","stepID":"placeOrder","lineNum":37},{"answer":"查询订单状态","stepID":"orderStatusQuery","lineNum":38},{"answer":"店铺信息","stepID":"storeInfo","lineNum":39},{"answer":"投诉与建议","stepID":"feedback","lineNum":40},{"answer":"常见问题解答","stepID":"faq","lineNum":41},{"answer":"退出","stepID":"exit","lineNum":42}],"silence":{"stepID":"silence","lineNum":43},"default":{"stepID":"default","lineNum":44}},"storeInfo":{"line":45,"say":[{"type":"string","args":"需要了解附近店铺的位置和营业时间吗？告诉我您所在的城市，我会为您提供相关信息。","lineNum":46}],"branch":[{"answer":"瑞幸咖啡的营业时间是多久","stepID":"businessHours","lineNum":47}],"default":{"stepID":"default","lineNum":48}},"businessHours":{"line":49,"say":[{"type":"string","args":"瑞幸咖啡的营业时间可能因地区而异。通常，我们的店铺在早上8点至晚上10点之间营业。","lineNum":50}],"listen":{"limit":5,"lineNum":51},"branch":[{"answer":"查询咖啡种类和价格","stepID":"productQuery","lineNum":52},{"answer":"下订单","stepID":"placeOrder","lineNum":53},{"answer":"查询订单状态","stepID":"orderStatusQuery","lineNum":54},{"answer":"店铺信息","stepID":"storeInfo","lineNum":55},{"answer":"投诉与建议","stepID":"feedback","lineNum":56},{"answer":"常见问题解答","stepID":"faq","lineNum":57},{"answer":"退出","stepID":"exit","lineNum":58}],"silence":{"stepID":"silence","lineNum":59},"default":{"stepID":"default","lineNum":60}},"feedback":{"line":61,"say":[{"type":"string","args":"如果您有任何投诉或建议，我们非常重视。请告诉我您的问题，我将尽力帮助您或转接您至相关部门。","lineNum":62}],"default":{"stepID":"feedbackFinish","lineNum":63}},"feedbackFinish":{"line":64,"say":[{"type":"string","args":"好了，你的投诉已经牢牢地被我记在小本本上了。请问还有什么可以帮到您的?","lineNum":65}],"listen":{"limit":5,"lineNum":66},"branch":[{"answer":"查询咖啡种类和价格","stepID":"productQuery","lineNum":67},{"answer":"下订单","stepID":"placeOrder","lineNum":68},{"answer":"查询订单状态","stepID":"orderStatusQuery","lineNum":69},{"answer":"店铺信息","stepID":"storeInfo","lineNum":70},{"answer":"投诉与建议","stepID":"feedback","lineNum":71},{"answer":"常见问题解答","stepID":"faq","lineNum":72},{"answer":"退出","stepID":"exit","lineNum":73}],"silence":{"stepID":"silence","lineNum":74},"default":{"stepID":"default","lineNum":75}},"faq":{"line":76,"say":[{"type":"string","args":"有关账户、支付、配送等方面的常见问题，您可以直接问我，我会提供尽可能详细的解答。比如,您可以问我:如何创建账户、支付方式有哪些、配送服务说明","lineNum":77}],"branch":[{"answer":"如何创建账户","stepID":"accountCreation","lineNum":78},{"answer":"支付方式有哪些","stepID":"paymentMethods","lineNum":79},{"answer":"配送服务说明","stepID":"deliveryDetails","lineNum":80}],"default":{"stepID":"default","lineNum":81}},"accountCreation":{"line":82,"say":[{"type":"string","args":"要创建瑞幸咖啡账户，您可以访问我们的官方网站或使用我们的移动应用。在注册过程中，您需要提供一些基本信息，如电子邮件地址和密码。完成注册后，您就可以享受更多会员福利了。","lineNum":83}],"listen":{"limit":5,"lineNum":84},"branch":[{"answer":"查询咖啡种类和价格","stepID":"productQuery","lineNum":85},{"answer":"下订单","stepID":"placeOrder","lineNum":86},{"answer":"查询订单状态","stepID":"orderStatusQuery","lineNum":87},{"answer":"店铺信息","stepID":"storeInfo","lineNum":88},{"answer":"投诉与建议","stepID":"feedback","lineNum":89},{"answer":"常见问题解答","stepID":"faq","lineNum":90},{"answer":"退出","stepID":"exit","lineNum":91}],"silence":{"stepID":"silence","lineNum":92},"default":{"stepID":"default","lineNum":93}},"paymentMethods":{"line":94,"say":[{"type":"string","args":"我们接受多种支付方式，包括信用卡、支付宝和微信支付。您可以在下单时选择最方便的支付方式完成交易。","lineNum":95}],"listen":{"limit":5,"lineNum":96},"branch":[{"answer":"查询咖啡种类和价格","stepID":"productQuery","lineNum":97},{"answer":"下订单","stepID":"placeOrder","lineNum":98},{"answer":"查询订单状态","stepID":"orderStatusQuery","lineNum":99},{"answer":"店铺信息","stepID":"storeInfo","lineNum":100},{"answer":"投诉与建议","stepID":"feedback","lineNum":101},{"answer":"常见问题解答","stepID":"faq","lineNum":102},{"answer":"退出","stepID":"exit","lineNum":103}],"silence":{"stepID":"silence","lineNum":104},"default":{"stepID":"default","lineNum":105}},"deliveryDetails":{"line":106,"say":[{"type":"string","args":"我们提供快捷可靠的配送服务。配送时间和费用可能会根据您所在的地区而有所不同。在结账时，您可以查看详细的配送选项和费用信息。如果有特殊要求，请告诉我，我们将尽力满足您的需求。","lineNum":107}],"listen":{"limit":5,"lineNum":108},"branch":[{"answer":"查询咖啡种类和价格","stepID":"productQuery","lineNum":109},{"answer":"下订单","stepID":"placeOrder","lineNum":110},{"answer":"查询订单状态","stepID":"orderStatusQuery","lineNum":111},{"answer":"店铺信息","stepID":"storeInfo","lineNum":112},{"answer":"投诉与建议","stepID":"feedback","lineNum":113},{"answer":"常见问题解答","stepID":"faq","lineNum":114},{"answer":"退出","stepID":"exit","lineNum":115}],"silence":{"stepID":"silence","lineNum":116},"default":{"stepID":"default","lineNum":117}},"exit":{"line":118,"say":[{"type":"string","args":"感谢您选择瑞幸咖啡！再见。","lineNum":119}]},"silence":{"line":121,"say":[{"type":"string","args":"听不清，请您大声一点可以吗?","lineNum":122}],"listen":{"limit":5,"lineNum":123},"branch":[{"answer":"查询咖啡种类和价格","stepID":"productQuery","lineNum":124},{"answer":"下订单","stepID":"placeOrder","lineNum":125},{"answer":"查询订单状态","stepID":"orderStatusQuery","lineNum":126},{"answer":"店铺信息","stepID":"storeInfo","lineNum":127},{"answer":"投诉与建议","stepID":"feedback","lineNum":128},{"answer":"常见问题解答","stepID":"faq","lineNum":129},{"answer":"退出","stepID":"exit","lineNum":130}],"silence":{"stepID":"silence","lineNum":131},"default":{"stepID":"default","lineNum":132}},"default":{"line":133,"say":[{"type":"string","args":"抱歉，我不明白你的意思.","lineNum":134}],"listen":{"limit":5,"lineNum":135},"branch":[{"answer":"查询咖啡种类和价格","stepID":"productQuery","lineNum":136},{"answer":"下订单","stepID":"placeOrder","lineNum":137},{"answer":"查询订单状态","stepID":"orderStatusQuery","lineNum":138},{"answer":"店铺信息","stepID":"storeInfo","lineNum":139},{"answer":"投诉与建议","stepID":"feedback","lineNum":140},{"answer":"常见问题解答","stepID":"faq","lineNum":141},{"answer":"退出","stepID":"exit","lineNum":142}],"silence":{"stepID":"silence","lineNum":143},"default":{"stepID":"default","lineNum":144}}},"entry":"welcome","exit":"exit","variable":{"$name":"","$account":""}}'
    );
});

test("如果没有exit:",()=>{
    expect(()=>{
        parse("Step welcome");
    }).toThrow("Expected at least one exit step");
});

test("如果没有step:",()=>{
    expect(()=>{
        parse("");
    }).toThrow("Expected at least one step");
});

test("如果没有default:",()=>{
    expect(()=>{
        parse(`Step welcome
        Step productQuery 
        Exit`);
    }).toThrow("Expected default step. At Line: 1");
});

test("如果出现无效default:",()=>{
    expect(()=>{
        parse(`Step welcome
        defaultAction test
        Step productQuery
        Exit` );
    }).toThrow("Default step test is invalid. At Line: 2");
});

test("如果出现无效silence:",()=>{
    expect(()=>{
        parse(`Step welcome
        silenceAction test
        defaultAction productQuery
        Step productQuery
        Exit` );
    }).toThrow("Silence step test is invalid. At Line: 2");
});

test("如果listenTimeout后面接的值无效:", () => {
    expect(() => {
        parse(`Step welcome
        listenTimeout test
        defaultAction productQuery
        Step productQuery
        Exit`);
    }).toThrow("Expected time to be a number. At Line: 2");
});


test("如果listenTimeout后面接的值 < 0:", () => {
    expect(() => {
        parse(`Step welcome
        listenTimeout -1
        defaultAction productQuery
        Step productQuery
        Exit`);
    }).toThrow("Listen time is invalid. At Line: 2");
});

test("如果出现无效branch:",()=>{
    expect(()=>{
        parse(`Step welcome
        branch "test",test
        defaultAction productQuery
        Step productQuery
        Exit` );
    }).toThrow("Branch step test is invalid. At Line: 2");
});

test("如果脚本语言的类型不为string:",()=>{
    expect(()=>{
        parse(null as any);
    }).toThrow("Expected code to be a string");
});

test("如果出现无效的token:",()=>{
    expect(()=>{
        parse(`step welcome
        TEST test
        defaultAction productQuery
        Step productQuery
        Exit`);
    }).toThrow("Your type must be one of step, say, listentimeout, branch, silenceaction, defaultaction,or exit. At Line: 2");
});

test("如果step缺少id:",()=>{
    expect(()=>{
        parse(`step`);
    }).toThrow("Expected step to have one step id. At Line: 1");
});

test("如果stepid数量错误:",()=>{
    expect(()=>{
        parse(`step a b`);
    }).toThrow("Expected step to have only one step id. At Line: 1");
});

test("如果stepid数量错误:",()=>{
    expect(()=>{
        parse(`step a b`);
    }).toThrow("Expected step to have only one step id. At Line: 1");
});

test("如果say内容错误:",()=>{
    expect(()=>{
        parse(`step welcome
        say test`);
    }).toThrow("Expected string or variable. At Line: 2");
});

test("如果branch参数错误:",()=>{
    expect(()=>{
        parse(`step welcome
        branch test`);
    }).toThrow("You must give branch two args. At Line: 2");
});

test("如果branch参数类型错误:",()=>{
    expect(()=>{
        parse(`step welcome
        branch 1,test
        defaultAction productQuery
        Step productQuery
        step test
        defaultAction productQuery
        Step productQuery
        exit`);
    }).toThrow("Your branch must have an answer string. At Line: 2");
});

test("如果出现无效的silence:",()=>{
    expect(()=>{
        parse(`step welcome
        silenceAction 1 2`);
    }).toThrow("Your silence must have one step. At Line: 2");
});

test("如果出现无效的default:",()=>{
    expect(()=>{
        parse(`step welcome
        defaultAction 1 2`);
    }).toThrow("Your default must have one step. At Line: 2");
});

test("测试calculate:",()=>{
    expect(
        JSON.stringify(
            parse(`
            step welcome 
    say $name+"您好！欢迎光临瑞幸咖啡！我是您的智能咖啡助手。有什么可以帮助您的吗?"
    listenTimeout 5
    branch "下订单", placeOrder
    branch "退出", exit
    silenceAction silence
    defaultAction default
step placeOrder 
    say "如果您想订购咖啡，只需告诉我您想要的产品的价格.我将为您计算您的账户余额.您当前的余额为:" + $account #comment
    Calculate $account,afterPlaceOrder,$account - INPUT #comment

step afterPlaceOrder 
    say "购买成功,您的账户余额为:"+ $account + "请问您还有什么需求吗?"
    listenTimeout 5
    silenceAction silence
    defaultAction default

step exit 
    say "感谢您选择瑞幸咖啡！再见。"
    exit

step silence 
    say "听不清，请您大声一点可以吗?"
    listenTimeout 5
    silenceAction silence
    defaultAction default

step default 
    say "抱歉，我不明白你的意思."
    listenTimeout 5
    silenceAction silence
    defaultAction default
            `)
        )
    ).toBe(
        '{"hash":{"welcome":{"line":1,"say":[{"type":"var","args":"$name","lineNum":2},{"type":"string","args":"您好！欢迎光临瑞幸咖啡！我是您的智能咖啡助手。有什么可以帮助您的吗?","lineNum":2}],"listen":{"limit":5,"lineNum":3},"branch":[{"answer":"下订单","stepID":"placeOrder","lineNum":4},{"answer":"退出","stepID":"exit","lineNum":5}],"silence":{"stepID":"silence","lineNum":6},"default":{"stepID":"default","lineNum":7}},"placeOrder":{"line":8,"say":[{"type":"string","args":"如果您想订购咖啡，只需告诉我您想要的产品的价格.我将为您计算您的账户余额.您当前的余额为:","lineNum":9},{"type":"var","args":"$account","lineNum":9}],"calculate":[["$account","afterPlaceOrder","$account - INPUT"]]},"afterPlaceOrder":{"line":11,"say":[{"type":"string","args":"购买成功,您的账户余额为:","lineNum":12},{"type":"var","args":"$account","lineNum":12},{"type":"string","args":"请问您还有什么需求吗?","lineNum":12}],"listen":{"limit":5,"lineNum":13},"silence":{"stepID":"silence","lineNum":14},"default":{"stepID":"default","lineNum":15}},"exit":{"line":16,"say":[{"type":"string","args":"感谢您选择瑞幸咖啡！再见。","lineNum":17}]},"silence":{"line":19,"say":[{"type":"string","args":"听不清，请您大声一点可以吗?","lineNum":20}],"listen":{"limit":5,"lineNum":21},"silence":{"stepID":"silence","lineNum":22},"default":{"stepID":"default","lineNum":23}},"default":{"line":24,"say":[{"type":"string","args":"抱歉，我不明白你的意思.","lineNum":25}],"listen":{"limit":5,"lineNum":26},"silence":{"stepID":"silence","lineNum":27},"default":{"stepID":"default","lineNum":28}}},"entry":"welcome","exit":"exit","variable":{"$name":"","$account":""}}'
    );
});

const ast2 = JSON.parse(
    '{"hashTable": {"welcome": {"line": 1,"say": [{ "type": "var", "args": "$name", "line": 2 },{"type": "string","args": "您好！欢迎光临瑞幸咖啡！我是您的智能咖啡助手。有什么可以帮助您的吗?","line": 2}],"listen": { "time": 5, "line": 3 },"branch": [{ "answer": "投诉", "nextStepId": "complainProc", "line": 4 },{ "answer": "账单", "nextStepId": "billProc", "line": 5 }],"silence": { "args": "silenceProc", "line": 6 }},"complainProc": {"line": 8,"say": [{"type": "string","args": "如果您想订购咖啡，只需告诉我您想要的产品的价格.我将为您计算您的账户余额.您当前的余额为:","line": 9}],"listen": { "time": 5, "line": 10 },"default": { "args": "thanks", "line": 11 }},"thanks": {"line": 12,"say": [{ "type": "string", "args": "购买成功,您的账户余额为:", "line": 13 }]},"billProc": {"line": 15,"say": [{ "type": "string", "args": "您的本月账单是", "line": 16 },{ "type": "var", "args": "$amount", "line": 16 },{"type": "string","args": "感谢您选择瑞幸咖啡！再见。","line": 16}]},"silenceProc": {"line": 18,"say": [{"type": "string","args": "听不清，请您大声一点可以吗?","line": 19}],"listen": { "time": 5, "line": 20 },"branch": [{ "answer": "投诉", "nextStepId": "complainProc", "line": 21 },{ "answer": "账单", "nextStepId": "billProc", "line": 22 }],"silence": { "args": "silenceProc", "line": 23 },"default": { "args": "defaultProc", "line": 24 }},"defaultProc": {"line": 25,"say": [{"type": "string","args": "抱歉，我不明白你的意思","line": 26}],"branch": [{ "answer": "投诉", "nextStepId": "complainProc", "line": 27 },{ "answer": "账单", "nextStepId": "billProc", "line": 28 }],"silence": { "args": "silenceProc", "line": 29 },"default": { "args": "defaultProc", "line": 30 }}},"entry": "welcome","exitStep": ["thanks", "billProc"],"vars": { "$name": "", "$amount": "" }}'
);

test("没有defaultList", () => {
    expect(() => {
        check(ast2);
    }).toThrow();
});



