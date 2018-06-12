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
    netWorth: {
        enumerable: true,
        writeable:  true,
        value: 0,
    },
    transaction: {
        //create new transaction, paramaters: (String, Int, Int, String)
        value: function (ticker, numShares, value, buyOrSell){
            let transType
            switch (buyOrSell){
                case ("buy"):
                    transType = true
                break

                case ("sell"):
                    transType = false
                break
            }
            let newTrans = {symbol: ticker, shares: numShares, price: value, own: transType}
            this.portfolio.push(newTrans)
    }
    },
    worth: {
        value: function(){
            let tmpArr = []
            let numTimesValue = 0
            for (let i=0; i<this.portfolio.length; i++){
                if (this.portfolio[i].own === true){
                    console.log("shares", this.portfolio[i].shares)
                    console.log("value", this.portfolio[i].price)
                    numTimesValue = this.portfolio[i].shares * this.portfolio[i].price
                    tmpArr.push(numTimesValue)
                }
            }
            return `Current New Worth: ${tmpArr.reduce((current, next) =>{
                return current+next
            })}`
        }
    },
})
finAdv.transaction("hfhf", 6000, 200, "buy")
finAdv.transaction("goog", 3000, 100, "buy")
finAdv.transaction("appl", 4000, 100, "sell")
finAdv.worth()

