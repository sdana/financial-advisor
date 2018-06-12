// Company (enumerable, writable, property)
// Specialty (enumerable, writable, property)
// Name (enumerable, property)
// Portfolio (non-enumerable, property) - Should display the stocks the advisor currently holds
// Worth (non-enumerable, method)
// Purchase (non-enumerable, method) - This method takes a stock ticker symbol, a quantity, and a price as arguments
// Sell (non-enumerable, method) - This method takes a stock ticker symbol, a quantity, and a price as arguments
// When sell() or purchase() are invoked, then the stock portfolio should be modified accordingly. Start off with making portfolio property an array that holds transactions.

// When you invoke the worth() method, it should look at every transaction and calculate the advisor's net worth.

const finAdv = Object.create({},{
    company: {
        enumerable: true,
        writeable: true,
        value: "Boss Hogs"
    },
    specialty: {
        enumerable: true,
        writeable: true,
        value: "Kicking ass, taking names" 
    },
    name: {
        enumerable: true,
        value: "Bob Ross"
    },
    portfolio: {
        enumerable: true,
        writeable: true,
        value: []
    },
    holdings: {
        enumerable: true,
        writable: true,
        value: {}
    },
    netWorth: {
        enumerable: true,
        writeable:  true,
        value: 0,
    },
    transaction: {
        //create new transaction, paramaters: (String, Int, Int, String)
        value: function (ticker, numShares, value, buyOrSell){
            let newTrans = {symbol: ticker, shares: numShares, price: value, own: buyOrSell}
            this.portfolio.push(newTrans)
    }
    },
    modifyHoldings: {
        //create new transaction, paramaters: (String, Int, Int, String)
        value: function (ticker, numShares, value, buyOrSell){
            let transType
            switch (buyOrSell){
                case ("buy"):
                    //check to see if ticker exists, if so modify number of shares
                    if (this.holdings[ticker]){    
                    this.holdings[ticker] = {symbol: ticker, shares: +numShares+this.holdings[ticker].shares, price: value,}
                    this.transaction(ticker, numShares, value, buyOrSell)
                    break
                    }
                    //if the ticker does not exist, create it
                    else {
                        this.holdings[ticker] = {symbol: ticker, shares: numShares, price: value,}
                        this.transaction(ticker, numShares, value, buyOrSell)
                    break
                    }    

                case ("sell"):
                    //ensure ticker to modify exists
                    if (!this.holdings[ticker]){
                        console.log("Cant sell something that doesn't exist")
                        break
                    }
                    //if the number of shares to sell exceeds number of shares owned, do nothing
                    else if (this.holdings[ticker].shares-numShares < 0){
                        console.log("Cannot sell more than you own")
                        break
                    }
                    //if ticker exists, and is greater than 0 then modify the number of shares
                    else if (this.holdings[ticker].shares && this.holdings[ticker].shares > 0){
                        this.holdings[ticker] = {symbol: ticker, shares: this.holdings[ticker].shares-numShares, price: value,}
                        //if the modification causes the shares to reach 0, delete the ticker
                        if (this.holdings[ticker].shares === 0){
                            delete this.holdings[ticker]
                        }
                        this.transaction(ticker, numShares, value, buyOrSell)
                        break
                    }
            }
    }
    },
    worth: {
        value: function(){
            //declare temporary variables to hold each stock's total worth and an array to hold that variable
            let tmpArr = []
            let numTimesValue = 0
            //iterate through portfolio array
            for (let i=0; i<this.portfolio.length; i++){
                //check to see if stock was bought or sold
                if (this.portfolio[i].own === "buy"){
                    //if bought, multiply the number of shares by the price
                    numTimesValue = this.portfolio[i].shares * this.portfolio[i].price
                    //push that value to temporary array
                    tmpArr.push(numTimesValue)
                }
            }
            //return the total value of the temporary array
            return `Current New Worth: ${tmpArr.reduce((current, next) =>{
                return current+next
            })}`
        }
    },
})
finAdv.modifyHoldings("uber", 6000, 200, "buy")
finAdv.modifyHoldings("goog", 3000, 100, "buy")
finAdv.modifyHoldings("appl", 4000, 100, "buy")
