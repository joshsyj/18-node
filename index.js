const axios = require('axios')
var open = require("open");
var configs = require('./config.js')

let { LTOKEN, PRICE, ID, TOKEN, PAYTYPE, timeout } = configs

//列表用的
const instance = axios.create({
    baseURL: 'https://m.18art.art/api/',
    timeout: timeout,
    headers: {
        origin: 'https://m.18art.art',
        'content-type': 'application/json;charset=UTF-8',
        'authorization': LTOKEN
    }
});

//支付用的
const instance2 = axios.create({
    baseURL: 'https://m.18art.art/api/',
    timeout: timeout,
    headers: {
        origin: 'https://m.18art.art',
        'content-type': 'application/json;charset=UTF-8',
        'authorization': TOKEN
    }
});


let timer = null
function requestList() {
    console.log('请求列表。。。')
    // if (timer) clearTimeout(timer)
    // timer = setTimeout(() => {
    //     requestList()
    // }, 7000)
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
        let p = String(items.map(item => item.price))
        console.log(p)
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
        if (!res.data.data || (res.data.message != '已拥有一笔待支付订单，请先支付或取消' && res.data.message != '请求成功')) {
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