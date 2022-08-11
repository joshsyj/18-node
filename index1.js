const axios = require('axios')
var open = require("open");
var configs = require('./config.js')
const HttpsProxyAgent = require("https-proxy-agent");
const HttpProxyAgent = require("http-proxy-agent");
let total = 0
let page = 1
let serialLock = true
let serial = ['5', '6']


let { LTOKEN, PRICE, ID, TOKEN, PAYTYPE, timeout, groupId, timeOut, userAgents } = configs
// const httpsAgent = new HttpsProxyAgent(`http://220.246.124.100:80`);
// const httpAgent = new HttpProxyAgent(`http://220.246.124.100:80`);


//列表用的
const instance = axios.create({
    baseURL: 'https://m.18art.art/api/',
    // proxy: false,
    // httpAgent,
    // httpsAgent,
    timeout: timeout,
    headers: {
        origin: 'https://m.18art.art',
        referer: 'https://m.18art.art/page/consignment',
        'content-type': 'application/json;charset=UTF-8',
        // 'authorization': LTOKEN,
        // 'user-agent': userAgents[parseInt(Math.random() * userAgents.length)]
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
    console.log(`第${++total}次--第${page}页--请求列表。。。`)
    instance.defaults.headers['authorization'] = LTOKEN[parseInt(Math.random() * LTOKEN.length)]
    instance.defaults.headers['user-agent'] = userAgents[parseInt(Math.random() * userAgents.length)]
    instance.post('agg/market/commodity-items', {
        groupId: ID,
        order: [{ fieldName: "DbPrice", order: 'Asc' }],
        pageIndex: page,
        pageSize: 20,
    }).then(res => {
        if (timer) clearTimeout(timer)
        if (res.data.statusCode != 200) {
            console.log(res.data.statusCode, res.data.message)
            timer = setTimeout(() => {
                requestList()
            }, timeOut)
            return
        }
        let { items } = res.data.data
        let _price = []
        let _commodityNo = []
        let p = String(items.map(item => item.price))
        console.log(`当前-----${groupId[ID]}-----价格：`)
        console.log(`期望价格:${PRICE}`)
        console.log(`期望编号:${serial}`)
        console.log(p)
        let open = []
        if (serialLock) {
            page++
            open = items.filter(item => {
                return item.saleStatus == 3 && serial.includes(item.commodityNo.slice(-1)) && item.price <= PRICE
            }).map(item => {
                _price.push(item.price)
                _commodityNo.push(`#${item.commodityNo}`)
                return item.id
            })
        }
        else {
            open = items.filter(item => item.saleStatus == 3 && item.price <= PRICE).map(item => {
                _price.push(item.price)
                return item.id
            })
        }

        if (!open.length) {
            console.log('未匹配到合适的价格。。。')
            timer = setTimeout(() => {
                requestList()
            }, timeOut)
            return
        }
        open.forEach((id, index) => {

            pay(id, _price[index], _commodityNo[index])
        });
    }).catch((e) => {
        console.log(e.code);
        console.log('列表请求超时::失败')
        timer = setTimeout(() => {
            requestList()
        }, timeOut)
    })

}

requestList()

function pay(id, _price, _commodityNo) {
    console.log(`请求支付。。。,当前订单价格:${_price}`)
    if (serialLock) {
        console.log(
            `支付编号${_commodityNo}`
        );
    }

    instance2.post('wagg/order/buy', {
        addressId: 0,
        commodityId: id,
        payType: PAYTYPE,
    }).then(res => {
        console.log(res.data)
        console.log(res.data.data)
        if (!res.data.data || (res.data.message != '已拥有一笔待支付订单，请先支付或取消' && res.data.message != '请求成功')) {
            console.log('支付失败，重新请求列表')
            timer = setTimeout(() => {
                requestList()
            }, timeOut)
            return
        }
        console.log(`pay::成功,当前订单价格:${_price}`)
        open("http://www.google.com?快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付快去支付", "chrome");

        return
    }).catch(() => {
        console.log('pay::失败')
    })
}