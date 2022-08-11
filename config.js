const groupId = {
    "215": '老鼠',
    "213": '山林虎',
    "217": '牛',
    "220": '鸡',
    '201': '猴子',
    '224': '蛇',
    '231': '欢喜罗汉',
    '232': '静坐罗汉'
}
const userAgents = [
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20',
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre',
    'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)',
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
    'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
    'Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
]

const lToken = [
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjIyNTg1OSwiVXNlckluZm8iOiJhYnlrald2MUFlSVA1SUxzNS84MzdLOVlkRmd5R0JrNUdxS3piN3VEWCtaclJpeXRPdVBuamVZUVB2TmJ2RXdVYXhybUJwTnNjVVJKL3p5eGJSWWNXU2l4VUpaMkJYVVMxOWtZZ2pyV2dCaGFxeXk1REpKZWJOVE90TFZ0aVMxQUdNQWloNTlUbUcxSHpNMjhLa0sxeVE9PSIsIm5iZiI6MTY2MDA5NjgxMCwiZXhwIjoxNjYwMzEyODEwLCJpYXQiOjE2NjAwOTY4MTAsImlzcyI6InNoaWJhX2FkbWluIiwiYXVkIjoic2hpYmFfYWRtaW4ifQ.8UFCFARkDJqloWJx0WxDHF3iRnkEjUYUNg6ddMo4mtE",
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjIyNTg1OSwiVXNlckluZm8iOiJhYnlrald2MUFlSVA1SUxzNS84MzdLOVlkRmd5R0JrNUdxS3piN3VEWCtaclJpeXRPdVBuamVZUVB2TmJ2RXdVYXhybUJwTnNjVVJKL3p5eGJSWWNXU2l4VUpaMkJYVVMxOWtZZ2pyV2dCaGFxeXk1REpKZWJOVE90TFZ0aVMxQUdNQWloNTlUbUcxSHpNMjhLa0sxeVE9PSIsIm5iZiI6MTY2MDE4MzQ4MywiZXhwIjoxNjYwMzk5NDgzLCJpYXQiOjE2NjAxODM0ODMsImlzcyI6InNoaWJhX2FkbWluIiwiYXVkIjoic2hpYmFfYWRtaW4ifQ.ZH6sgmRRiPBpQV14Mtw25qFEjrYlFcLk0Kq_a-lr9iI',//153
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjIyNTgwNiwiVXNlckluZm8iOiJKUzE2c0RMck44RUFHU2tya2ZIQmd6V2pHVjdTSGhmS3JYTU5VRVI1bVdPd1RDZWc2MDNHWDF1bjVHL05FcUNLOGgySENIQ1VncjRaWGFGaU9CWXpYSDNlbEZuR09JK1BjR2Z4U0lDUWtsL3A3eTlvaEpUWDBIWTFXV3JtSnNiek43VXF4bk9YV09PaUdkSFpBZ005Q2c9PSIsIm5iZiI6MTY2MDE4MzA2NSwiZXhwIjoxNjYwMzk5MDY1LCJpYXQiOjE2NjAxODMwNjUsImlzcyI6InNoaWJhX2FkbWluIiwiYXVkIjoic2hpYmFfYWRtaW4ifQ.ClP1_lDJwNLNktO7Vfn_xfV1gJIO8FNEKjs8ULRHtPo"//173
]
const configs = {
    userAgents,
    groupId,
    //列表token 173
    LTOKEN: lToken,
    timeout: 8000,
    timeOut: 1000,//接口延迟调用
    PAYTYPE: 1,//1:银行卡 2:钱包
    //支付token
    TOKEN: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQ0ODEwLCJVc2VySW5mbyI6IlRJNHl2Wm1jSzg3a2gzMVZqOHh4TXhCZ0c0a3dqWEltVU51Rk0xcmRDSjFnYkxiZWxlV3FTUk0rVitwR1JSZUcyRmtSa0tac3Q4QkRpdzNpZEZMY2lMaDJGaTdMSklHSnE2bEc0bTk1dkpiWHFHaXBSRDMraVFNYlp3dm9rMUN0Um5wWE4wcDVlRGhacE9NSzRsS0JTZz09IiwibmJmIjoxNjYwMTA2ODkyLCJleHAiOjE2NjA1Mzg4OTIsImlhdCI6MTY2MDEwNjg5MiwiaXNzIjoic2hpYmFfYWRtaW4iLCJhdWQiOiJzaGliYV9hZG1pbiJ9.9JQKxmaQMpzS9a3QsKUtmVhwz-Q0n8ZGSGN4YDrh3uk",
    // ID: 213, //商品id
    // PRICE: 13000 //商品价格
    ID: process.env.id, //商品id
    PRICE: process.env.price, //商品价格
    PAGE: Number(process.env.page)
}

console.log(process.env.id, process.env.price)
console.log(`${groupId[process.env.id]}`)



module.exports = configs