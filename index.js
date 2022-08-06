const axios = require('axios')
const instance = axios.create({
    baseURL: 'https://m.18art.art/api/',
    timeout: 10000,
    headers: {
        origin: 'https://m.18art.art',
        'content-type': 'application/json;charset=UTF-8',
        'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQ0ODEwLCJVc2VySW5mbyI6IlRJNHl2Wm1jSzg3a2gzMVZqOHh4TXhCZ0c0a3dqWEltVU51Rk0xcmRDSjFnYkxiZWxlV3FTUk0rVitwR1JSZUcyRmtSa0tac3Q4QkRpdzNpZEZMY2lMaDJGaTdMSklHSnE2bEc0bTk1dkpiWHFHaXBSRDMraVFNYlp3dm9rMUN0Um5wWE4wcDVlRGhacE9NSzRsS0JTZz09IiwibmJmIjoxNjU5ODAzMTY5LCJleHAiOjE2NjAyMzUxNjksImlhdCI6MTY1OTgwMzE2OSwiaXNzIjoic2hpYmFfYWRtaW4iLCJhdWQiOiJzaGliYV9hZG1pbiJ9.XCZ9pMgKyE3NOMwDjwX46scJNdCEMQDfj6DUvKNGq3g"
    }
});

const PRICE = 3900

const groupId = {
    "215": '老鼠',
    "213": '山林虎',
    "217": '牛',
    "220": '鸡',
    '201': '猴子',
    '224': '蛇'
}

function requestList() {
    console.log('请求列表。。。')
    instance.post('agg/market/commodity-items', {
        groupId: "215",
        order: [{ fieldName: "DbPrice", order: "Asc" }],
        pageIndex: 1,
        pageSize: 10,
    }).then(res => {
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
    }).catch(() => {
        console.log('requestList::失败')
        requestList()
    })

}

requestList()


function pay(id, _price) {
    console.log(`请求支付。。。,当前订单价格:${_price}`)
    instance.post('wagg/order/buy', {
        addressId: 0,
        commodityId: id,
        payType: 1,
    }).then(res => {
        console.log(res.data)
        console.log(res.data.data)
        if (!res.data.data || res.data.message != '已拥有一笔待支付订单，请先支付或取消') {
            console.log('支付失败，重新请求列表')
            requestList()
            return
        }
        console.log(`pay::成功,当前订单价格:${_price}`)
        return
    }).catch(() => {
        console.log('pay::失败')
    })
}