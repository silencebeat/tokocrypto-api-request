const expect  = require("chai").expect;

const tokocrypto = require('../index')

describe('public endpoint', function() {
      it("tradingSymbol", async function(){
        var response = await tokocrypto.tradingSymbol();
        expect(response.msg).to.be.equal('Success');
      });

      it("orderbook", async function(){
        var response = await tokocrypto.orderbook("BTC_USDT");
        expect(response.msg).to.be.equal('Success');
      });


      it("server time", async function(){
        var response = await tokocrypto.serverTime();
        expect(response.msg).to.be.equal('Success');
      });   
});

describe('private endpoint', function() {
    it("cancel order", async function(){
      var response = await tokocrypto.cancelOrder("test-order-id");
      expect(response.msg).to.be.equal('Not Found');
    });

    it("query order", async function(){
      var response = await tokocrypto.queryOrder("test-order-id");
      expect(response.msg).to.be.equal('Incorrect Order ID');
    });

    it("asset", async function(){
      var response = await tokocrypto.asset("BNB");
      expect(response.msg).to.be.equal('Success');
    });

    it("accountTradeList", async function(){
      var response = await tokocrypto.accountTradeList("BNB");
      expect(response.msg).to.be.equal('Success');
    });

    it("accountInformation", async function(){
      var response = await tokocrypto.accountInformation();
      expect(response.msg).to.be.equal('Success');
    });

    it("allOrders", async function(){
      var response = await tokocrypto.allOrders("BNB_BIDR");
      expect(response.msg).to.be.equal('Success');
    });

  
});

