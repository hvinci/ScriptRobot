/*
 * @Author: hvinci
 * @Date: 2023-10-27 13:41:36
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-18 17:41:08
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
export const defaultScript = `# comment
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
  


`;