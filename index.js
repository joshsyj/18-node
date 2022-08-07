const axios = require('axios')

var open = require("open");

//列表token
const LTOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQ0ODEwLCJVc2VySW5mbyI6IlRJNHl2Wm1jSzg3a2gzMVZqOHh4TXhCZ0c0a3dqWEltVU51Rk0xcmRDSjFnYkxiZWxlV3FTUk0rVitwR1JSZUcyRmtSa0tac3Q4QkRpdzNpZEZMY2lMaDJGaTdMSklHSnE2bEc0bTk1dkpiWHFHaXBSRDMraVFNYlp3dm9rMUN0Um5wWE4wcDVlRGhacE9NSzRsS0JTZz09IiwibmJmIjoxNjU5Nzk2OTI0LCJleHAiOjE2NjAyMjg5MjQsImlhdCI6MTY1OTc5NjkyNCwiaXNzIjoic2hpYmFfYWRtaW4iLCJhdWQiOiJzaGliYV9hZG1pbiJ9.S-6trHWxkF6iZRIDgrAwepSP3LuaeGszAjSuLmymXjo"
//商品价格
const PRICE = 17800

const groupId = {
    "215": '老鼠',
    "213": '山林虎',
    "217": '牛',
    "220": '鸡',
    '201': '猴子',
    '224': '蛇'
}
//商品id
const ID = 215
//支付token
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQ0ODEwLCJVc2VySW5mbyI6IlRJNHl2Wm1jSzg3a2gzMVZqOHh4TXhCZ0c0a3dqWEltVU51Rk0xcmRDSjFnYkxiZWxlV3FTUk0rVitwR1JSZUcyRmtSa0tac3Q4QkRpdzNpZEZMY2lMaDJGaTdMSklHSnE2bEc0bTk1dkpiWHFHaXBSRDMraVFNYlp3dm9rMUN0Um5wWE4wcDVlRGhacE9NSzRsS0JTZz09IiwibmJmIjoxNjU5ODAzMTY5LCJleHAiOjE2NjAyMzUxNjksImlhdCI6MTY1OTgwMzE2OSwiaXNzIjoic2hpYmFfYWRtaW4iLCJhdWQiOiJzaGliYV9hZG1pbiJ9.XCZ9pMgKyE3NOMwDjwX46scJNdCEMQDfj6DUvKNGq3g"
//payType  //1:银行卡 2:钱包
const PAYTYPE = 1


//列表用的
const instance = axios.create({
    baseURL: 'https://m.18art.art/api/',
    timeout: 15000,
    headers: {
        origin: 'https://m.18art.art',
        'content-type': 'application/json;charset=UTF-8',
        'authorization': LTOKEN
    }
});

//支付用的
const instance2 = axios.create({
    baseURL: 'https://m.18art.art/api/',
    timeout: 15000,
    headers: {
        origin: 'https://m.18art.art',
        'content-type': 'application/json;charset=UTF-8',
        'authorization': TOKEN
    }
});


let timer = null
function requestList() {
    console.log('请求列表。。。')
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        requestList()
    }, 7000)
    instance.post('agg/market/commodity-items', {
        groupId: ID,
        order: [{ fieldName: "DbPrice", order: "Asc" }],
        pageIndex: 1,
        pageSize: 10,
    }).then(res => {
        if (timer) clearTimeout(timer)
        console.log(res.data.message)
        let { items } = res.data.data
        let _price = []
        let open = items.filter(item => item.saleStatus == 3 && item.price <= PRICE).map(item => {
            _price.push(item.price)
            return item.id
        })
        console.log('未匹配到合适的价格。。。')
        if (!open.length) {
            requestList()
            return
        }
        // console.log('requestList::成功')
        open.forEach((id, index) => {
            pay(id, _price[index])
        });
    }).catch((e) => {
        console.log('requestList::失败')
        requestList()
    })

}

requestList()

function pay(id, _price) {
    console.log(`请求支付。。。,当前订单价格:${_price}`)
    instance2.post('wagg/order/buy', {
        addressId: 0,
        commodityId: id,
        payType: PAYTYPE,
    }).then(res => {
        console.log(res.data)
        console.log(res.data.data)
        if (!res.data.data || (res.data.message != '已拥有一笔待支付订单，请先支付或取消'&&res.data.message != '请求成功')) {
            console.log('支付失败，重新请求列表')
            requestList()
            return
        }
        console.log(`pay::成功,当前订单价格:${_price}`)
        open("http://www.google.com?快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付", "chrome");

        return
    }).catch(() => {
        console.log('pay::失败')
    })
}