const groupId = {
    "215": '老鼠',
    "213": '山林虎',
    "217": '牛',
    "220": '鸡',
    '201': '猴子',
    '224': '蛇'
}
const configs = {
    groupId,
    //列表token 173
    LTOKEN: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjIyNTgwNiwiVXNlckluZm8iOiJKUzE2c0RMck44RUFHU2tya2ZIQmd6V2pHVjdTSGhmS3JYTU5VRVI1bVdPd1RDZWc2MDNHWDF1bjVHL05FcUNLOGgySENIQ1VncjRaWGFGaU9CWXpYSDNlbEZuR09JK1BjR2Z4U0lDUWtsL3A3eTlvaEpUWDBIWTFXV3JtSnNiek43VXF4bk9YV09PaUdkSFpBZ005Q2c9PSIsIm5iZiI6MTY2MDA5NjYyOSwiZXhwIjoxNjYwMzEyNjI5LCJpYXQiOjE2NjAwOTY2MjksImlzcyI6InNoaWJhX2FkbWluIiwiYXVkIjoic2hpYmFfYWRtaW4ifQ.Er6GgL9I1l409B4rJLjANLENC80ur_0TVQsYNLmdpsY",
    timeout: 15000,
    timeOut: 1500,//接口延迟调用
    PAYTYPE: 1,//1:银行卡 2:钱包
    //支付token
    TOKEN: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQ0ODEwLCJVc2VySW5mbyI6IlRJNHl2Wm1jSzg3a2gzMVZqOHh4TXhCZ0c0a3dqWEltVU51Rk0xcmRDSjFnYkxiZWxlV3FTUk0rVitwR1JSZUcyRmtSa0tac3Q4QkRpdzNpZEZMY2lMaDJGaTdMSklHSnE2bEc0bTk1dkpiWHFHaXBSRDMraVFNYlp3dm9rMUN0Um5wWE4wcDVlRGhacE9NSzRsS0JTZz09IiwibmJmIjoxNjU5OTU2NTI1LCJleHAiOjE2NjAzODg1MjUsImlhdCI6MTY1OTk1NjUyNSwiaXNzIjoic2hpYmFfYWRtaW4iLCJhdWQiOiJzaGliYV9hZG1pbiJ9.zja4Cl2PwJT3Yr3B4VD7Gla5fWULM7UKjcY1wqrjfDM",
    // ID: 213, //商品id
    // PRICE: 13000 //商品价格
    ID: process.env.id, //商品id
    PRICE: process.env.price //商品价格
}

console.log(process.env.id, process.env.price)
console.log(`${groupId[process.env.id]}`)



module.exports = configs