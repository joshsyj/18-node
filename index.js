const axios = require('axios')
const instance = axios.create({
    baseURL: 'https://m.18art.art/api/',
    timeout: 10000,
    headers: {
        origin: 'https://m.18art.art',
        'content-type': 'application/json;charset=UTF-8',
        'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE0MjM0OCwiVXNlckluZm8iOiJWUmZta2EvMituK3I2S2FkN3hqdGFzSlk4YVcvRUJaQlpXand4cmFRTGRFcE9oc0hIeXl2N0R4S0JtaExlVzVQMFZPVDZtQUJqbTQwM0EyaVNjRTRSOTNrTnpQS2g3dE5lNEkrcmR1eFN5a2RvZEkrQ1d0cE5SdnpLV3FDQmJhNm5qV2VQakx2QTZGaE00Z0tZenRpc1E9PSIsIm5iZiI6MTY1OTgwMTcxMywiZXhwIjoxNjYwMjMzNzEzLCJpYXQiOjE2NTk4MDE3MTMsImlzcyI6InNoaWJhX2FkbWluIiwiYXVkIjoic2hpYmFfYWRtaW4ifQ.Z882QFDh9tDbDtfDFUq9K4McZXz82GBc8RXeRfsdlgQ"
    }
});

const PRICE = 4000

function requestList() {
    console.log('请求列表。。。')
    instance.post('agg/market/commodity-items', {
        groupId: "215",
        order: [{ fieldName: "DbPrice", order: "Asc" }],
        pageIndex: 1,
        pageSize: 10,
    }).then(res => {
        // console.log(res.data.data)
        let { items } = res.data.data
        let open = items.filter(item => item.saleStatus == 3 && item.price <= PRICE).map(item => item.id)
        // console.log(open)
        console.log('未匹配到合适的价格。。。')
        if (!open.length) {
            requestList()
            return
        }
        console.log(open)
        console.log('requestList::成功')
        open.forEach(element => {
            pay(element)
        });
    }).catch(err => {
        // console.log(err)
        console.log('requestList::失败')
        requestList()
    })

}

requestList()


function pay(id) {
    console.log('请求支付。。。')
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
        }
        console.log('pay::成功')
    }).catch(err => {
        console.log('pay::失败')
    })

}