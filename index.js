const secret = require('./secret.json')
const crypto = require('crypto')
const axios = require("axios");
const moment = require('moment')
const DOMAIN = 'https://www.tokocrypto.com'
const APIKEY = secret.APIKEY
const SECRETKEY = secret.SECRETKEY


class Tokocrypto {

    getSignature(queryString) {

        const signature = crypto
            .createHmac(`sha256`, SECRETKEY)
            .update(queryString)
            .digest(`hex`);

        return signature
    }

    generateQueryString(params){
        let a = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        return a
    }

    async requestPrivate(endpoint, param, method){

        try {
            param.recvWindow = 5000
            param.timestamp = moment().valueOf()

            let URL = `${DOMAIN}${endpoint}`
            let config = {
                headers: {
                    'X-MBX-APIKEY': APIKEY
                }
            };
            param.signature = this.getSignature(this.generateQueryString(param))
            config.params = param

            let result = null
            if (method === "get"){
                result =  await axios.get(URL, config)
            }else if (method === "post"){
                result =  await axios.get(URL, null, config)
            }

            return (result)? result.data: result

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async requestPublic(endpoint, params){
        try {

            let URL = `${DOMAIN}${endpoint}`
            let config = {
                headers: {
                    'X-MBX-APIKEY': APIKEY
                }
            };
            config.params = params

            console.log(config.params)

            let result =  await axios.get(URL, config)
            return result.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async createorder(side, quantity, pairs){
        try {
            let response = await this.requestPrivate('/open/v1/orders', {
                symbol: pairs,
                side: (side.toUpperCase() === "buy")? 0: 1, 
                type: 2,
                quantity: quantity
            }, 'post')
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async cancelOrder(order_id){
        try {
            let response = await this.requestPrivate('/open/v1/orders/cancel', {
                order_id
            }, 'post')
            return response
        } catch (error) {
            console.log(error)
            // throw error
            return error
        }
    }

    async queryOrder(order_id){
        try {
            let response = await this.requestPrivate('/open/v1/orders/detail', {
                orderId: order_id
            }, 'get')
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async asset(asset){
        try {
            let response = await this.requestPrivate('/open/v1/account/spot/asset', {
                asset: asset.toUpperCase()
            }, 'get')
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async accountTradeList(symbol){
        try {
            let response = await this.requestPrivate('/open/v1/orders/trades', {
                symbol: symbol.toUpperCase()
            }, 'get')
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async accountInformation(){
        try {
            let response = await this.requestPrivate('/open/v1/account/spot', {
                
            }, 'get')
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async allOrders(symbol){
        ///open/v1/orders
        try {
            let response = await this.requestPrivate('/open/v1/orders', {
                symbol: symbol.toUpperCase()
            }, 'get')
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async orderbook(symbol){
        try {
            let response = await this.requestPublic('/open/v1/market/depth', {
                symbol: symbol.toUpperCase()
            })
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async tradingSymbol(){
        ///open/v1/common/symbols
        try {
            let response = await this.requestPublic('/open/v1/common/symbols', { 
            })
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async serverTime(){
        ///open/v1/common/time
        try {
            let response = await this.requestPublic('/open/v1/common/time', { 
            })
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

module.exports = new Tokocrypto()

// async function main(){
//     // let a = await module.exports.asset("bnb")
//     // let a = await module.exports.queryOrder("1")
//     // let a = await module.exports.accountTradeList("BNB")
//    // let a = await module.exports.accountInformation()
//     // let a = await module.exports.allOrders("BNB")
//     let a = await module.exports.tradingSymbol()
//     // let a = await module.exports.serverTime()
//     console.log(a)
// }

// main()