/* 
Math for PoC

Burst: reward = 10000 * math.floor((0.95 * (height / 10800))) + BlockFees
10000 = initial reward 0.95 = reward multiplier per month 10800 = avg num. of blocks per month

BHD: Reward = 23.75 * math.floor((0.5 ** (height / 420768))) + BlockFees
*/

/*
Comments from guy using math

If you're pool mining - it's complicated, it's a sliding scale depending on how much you're holding on the pool, along with how much (if any) you're renting. It breaks down to this: EE = (Rent x 45%) + (Mort x 100%) + (Unmort x 30%), where EE Is Expected Earnings %, Rent is the % of your required mortgage you hold, Mort is the % you actually hold, and Unmort is the % not covered by Rent + Mort. Required mortgage is 3 x your capacity in TB. The combined values (EE) is the % of Expected earnings/PB you earn with the capacity you're mining with - so ActualEarning = EE x (YourTB / 1000).
For solo mining, it's slightly simpler - you either have the required mortgage in which case the formula above is correct, or you don't - in which case replace the 23.5 with 7.5. For solo, the require mortgage though is difficult to determine. It's between 3-4 BHD/TB, with a minimum assuming you have around 300TB, and if you forge a block it currently increase by around 1,650 BHD, which declines over time

For solo mining, it's slightly simpler - you either have the required mortgage in which case the formula above is correct, or you don't - in which case replace the 23.5 with 7.5. For solo, the require mortgage though is difficult to determine. It's between 3-4 BHD/TB, with a minimum assuming you have around 300TB, and if you forge a block it currently increase by around 1,650 BHD, which declines over time

On the Co HDpool it's 3 BHD/TB, for Eco - you can't rent, so income is always 30%
For Solo - it changes relative to difficulty, based on network capacity over the last 2,016 blocks


*/
var themeToggle = document.getElementById("diffToggleSwitch2")

var StorageCapacity = document.getElementById("StorageCapacity")
var HardwareCost = document.getElementById("HardwareCost")
var hashPower = document.getElementById("hashPower")
var PoolCapacity = document.getElementById("PoolCapacity")
var rentedBHD = document.getElementById("rentedBHD")
var poolFee = document.getElementById("poolFee")
var elecCost = document.getElementById("elecCost")
var powerConsumption = document.getElementById("powerConsumption")

var poolCapacityDiv =document.getElementById("poolCapacityDiv")
var poolFeeDiv = document.getElementById("poolFeeDiv")
var rentedBHDDiv = document.getElementById("rentedBHDDiv")

var poolOrSoloSwitch = document.getElementById("poolOrSoloSwitch")
var poolOrSoloText = document.getElementById("poolOrSoloText")


var PowerCostHour = document.getElementById("PowerCostHour")
var PowerCostDay = document.getElementById("PowerCostDay")
var PowerCostWeek = document.getElementById("PowerCostWeek")
var PowerCostMonth = document.getElementById("PowerCostMonth")

var BurstResultHour = document.getElementById("BurstResultHour")
var BurstResultDay = document.getElementById("BurstResultDay")
var BurstResultWeek = document.getElementById("BurstResultWeek")
var BurstResultMonth = document.getElementById("BurstResultMonth")

var BurstResultHourProfit = document.getElementById("BurstResultHourProfit")
var BurstResultDayProfit = document.getElementById("BurstResultDayProfit")
var BurstResultWeekProfit = document.getElementById("BurstResultWeekProfit")
var BurstResultMonthProfit = document.getElementById("BurstResultMonthProfit")

var BHDResultHour = document.getElementById("BHDResultHour")
var BHDResultDay = document.getElementById("BHDResultDay")
var BHDResultWeek = document.getElementById("BHDResultWeek")
var BHDResultMonth = document.getElementById("BHDResultMonth")

var USDResultHour = document.getElementById("USDResultHour")
var USDResultDay = document.getElementById("USDResultDay")
var USDResultWeek = document.getElementById("USDResultWeek")
var USDResultMonth = document.getElementById("USDResultMonth")

var USDResultHourProfit = document.getElementById("USDResultHourProfit")
var USDResultDayProfit = document.getElementById("USDResultDayProfit")
var USDResultWeekProfit = document.getElementById("USDResultWeekProfit")
var USDResultMonthProfit = document.getElementById("USDResultMonthProfit")

var ReturnOnInvestment = document.getElementById("timeHeader")

let Storage = 0

const hour = 3600;
const day = hour * 24;
const week = day * 7;
const month = day * 30; // assume month = 30 days

const burstBlockTime = 240
const BHDBlockTime = 300

var APILoaded = 0

var proxyUrl = 'https://cors-anywhere.herokuapp.com/'

var burstAPI = "https://wallet.burst.cryptoguru.org:8125/burst?requestType=getMiningInfo"
var burstAPILoad

var burstPriceAPI = "https://api.coingecko.com/api/v3/coins/burst/market_chart?vs_currency=usd&days=1"
var burstPriceAPILoad

var BHDPriceAPI = "https://api.coingecko.com/api/v3/coins/bitcoin-hd/market_chart?vs_currency=usd&days=1"
var BHDPriceAPILoad

var burstAPIDifficulty
var burstAPIheight

var burstHourresult
var burstDayresult
var burstWeekresult
var burstMonthresult

var burstIncomeHour
var burstIncomeDay
var burstIncomeWeek
var burstIncomeMonth


var BHDAPIDifficulty
var BHDAPIheight

var BHDHourresult
var BHDDayresult
var BHDWeekresult
var BHDMonthresult

var BHDIncomeHour
var BHDIncomeDay
var BHDIncomeWeek
var BHDIncomeMonth


let PowerCostHourResult
let PowerCostDayResult
let PowerCostWeekResult
let PowerCostMonthResult

var previousPoolFee

const greenColor = "#30fa30"
const redColor = "#d20000"
const greenColorDark = "#22b522"
const redColorDark = "#d86161"

let burstAPIData
fetch(proxyUrl + burstAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
    fetch(proxyUrl + burstAPI)
        .then(function(response) {
            if (response.ok == true) {
                return response.json();
            } else {
                burstAPILoad = false
                alert("Error with loading BurstCoin API")
            }
        })
        .then(function(myJson){
            burstAPIData = myJson
            burstAPILoad = true
            APILoaded += 1
            apiLoadVerify()
        })
    }
        
})
.then(function(myJson){
    burstAPIData = myJson
    burstAPILoad = true
    APILoaded += 1
    apiLoadVerify()
})

let burstPriceAPIData
fetch(proxyUrl + burstPriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
    fetch(proxyUrl + burstPriceAPI)
        .then(function(response) {
            if (response.ok == true) {
                return response.json();
            } else {
                burstPriceAPILoad = false
                alert("Error with loading BurstCoin API")
            }
        })
        .then(function(myJson){
            burstPriceAPIData = myJson
            burstPriceAPILoad = true
            APILoaded += 1
            apiLoadVerify()
        })
    }
        
})
.then(function(myJson){
    burstPriceAPIData = myJson
    burstPriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
})

let BHDPriceAPIData
fetch(proxyUrl + BHDPriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
    fetch(proxyUrl + BHDPriceAPI)
        .then(function(response) {
            if (response.ok == true) {
                return response.json();
            } else {
                BHDPriceAPILoad = false
                alert("Error with loading BurstCoin API")
            }
        })
        .then(function(myJson){
            BHDPriceAPIData = myJson
            BHDPriceAPILoad = true
            APILoaded += 1
            apiLoadVerify()
        })
    }
        
})
.then(function(myJson){
    BHDPriceAPIData = myJson
    BHDPriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
})

function apiLoadVerify() {
    if(APILoaded >= 3) {
        console.log(APILoaded + " API's loaded")
        liveHashrate()
    }
}

function liveHashrate() {
  StorageCapacity.value = splitInput(StorageCapacity.value)
  HardwareCost.value = splitInput(HardwareCost.value)
  PoolCapacity.value = splitInput(PoolCapacity.value)
  rentedBHD.value = splitInput(rentedBHD.value)
  poolFee.value = splitInput(poolFee.value)
  elecCost.value = splitInput(elecCost.value)
  powerConsumption.value = splitInput(powerConsumption.value)

  if (StorageCapacity.value == ".") {
        Storage = 0
    }
    else {
        Storage = StorageCapacity.value
    }

    if (hashPower.selectedIndex == 0) {
        Storage = Storage * 1
    } else if (hashPower.selectedIndex == 1) {
        Storage = Storage * 1000
    } else if (hashPower.selectedIndex == 2) {
        Storage = Storage * 1e+6
    }

    if (poolFee.value > 100) {
        poolFee.value = 100
    }
    burst()
    incomeResult()
    calcProfit()
}

StorageCapacity.value = 2
HardwareCost.value = 60
PoolCapacity.value = 0
rentedBHD.value = 6
poolFee.value = 2
elecCost.value = 0.1
powerConsumption.value = 20

function burst() {
        try {
            burstAPIDifficulty = burstAPIData.baseTarget
        } catch(e) {
            try {
                burstAPIDifficulty = burstAPIData.baseTarget
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            burstAPIheight = burstAPIData.height
        } catch(e) {
            try {
                burstAPIheight = burstAPIData.height
            } catch(error) {
                console.log(error)
            }
        }

        burstHourresult = burstReward(burstAPIDifficulty, Storage, burstAPIheight, hour)
        burstDayresult = burstReward(burstAPIDifficulty, Storage, burstAPIheight, day)
        burstWeekresult = burstReward(burstAPIDifficulty, Storage, burstAPIheight, week)
        burstMonthresult = burstReward(burstAPIDifficulty, Storage, burstAPIheight, month)

        BurstResultHour.innerHTML = numberShortener(burstHourresult)
        BurstResultDay.innerHTML = numberShortener(burstDayresult)
        BurstResultWeek.innerHTML = numberShortener(burstWeekresult)
        BurstResultMonth.innerHTML = numberShortener(burstMonthresult)

    function burstReward(difficulty, StorageAmount, height, period) {
      return ((StorageAmount / 1000000000) / (difficulty / burstBlockTime)) * ((10000 * Math.floor(0.95 * (height / 10800))) * (period / burstBlockTime));
    } 
}
/*
function BHD() {
        try {
            BHDAPIDifficulty = 
        } catch(e) {
            try {
                BHDAPIDifficulty = 
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            BHDAPIheight = 
        } catch(e) {
            try {
                BHDAPIheight = 
            } catch(error) {
                console.log(error)
            }
        }

        BHDHourresult = BHDReward(BHDAPIDifficulty, Storage, BHDAPIheight, hour)
        BHDDayresult = BHDReward(BHDAPIDifficulty, Storage, BHDAPIheight, day)
        BHDWeekresult = BHDReward(BHDAPIDifficulty, Storage, BHDAPIheight, week)
        BHDMonthresult = BHDReward(BHDAPIDifficulty, Storage, BHDAPIheight, month)

        BHDResultHour.innerHTML = numberShortener(BHDHourresult)
        BHDResultDay.innerHTML = numberShortener(BHDDayresult)
        BHDResultWeek.innerHTML = numberShortener(BHDWeekresult)
        BHDResultMonth.innerHTML = numberShortener(BHDMonthresult)

    function BHDReward(difficulty, StorageAmount, height, period) {
      return ((StorageAmount / 1000000000) / (difficulty / BHDBlockTime)) * ((10000 * Math.floor(0.95 * (height / 10800))) * (period / BHDBlockTime));
    } 
}
*/
function incomeResult() {
        try {
            burstIncomeHour = burstHourresult * burstPriceAPIData.prices[burstPriceAPIData.prices.length - 1][1]
            burstIncomeDay = burstDayresult * burstPriceAPIData.prices[burstPriceAPIData.prices.length - 1][1]
            burstIncomeWeek = burstWeekresult * burstPriceAPIData.prices[burstPriceAPIData.prices.length - 1][1]
            burstIncomeMonth = burstMonthresult * burstPriceAPIData.prices[burstPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                burstIncomeHour = burstHourresult * burstPriceAPIData.prices[burstPriceAPIData.prices.length - 1][1]
                burstIncomeDay = burstDayresult * burstPriceAPIData.prices[burstPriceAPIData.prices.length - 1][1]
                burstIncomeWeek = burstWeekresult * burstPriceAPIData.prices[burstPriceAPIData.prices.length - 1][1]
                burstIncomeMonth = burstMonthresult * burstPriceAPIData.prices[burstPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        /*
        try {
            BHDIncomeHour = BHDHourresult * BHDPriceAPIData.prices[BHDPriceAPIData.prices.length - 1][1]
            BHDIncomeDay = BHDDayresult * BHDPriceAPIData.prices[BHDPriceAPIData.prices.length - 1][1]
            BHDIncomeWeek = BHDWeekresult * BHDPriceAPIData.prices[BHDPriceAPIData.prices.length - 1][1]
            BHDIncomeMonth = BHDMonthresult * BHDPriceAPIData.prices[BHDPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                BHDIncomeHour = BHDHourresult * BHDPriceAPIData.prices[BHDPriceAPIData.prices.length - 1][1]
                BHDIncomeDay = BHDDayresult * BHDPriceAPIData.prices[BHDPriceAPIData.prices.length - 1][1]
                BHDIncomeWeek = BHDWeekresult * BHDPriceAPIData.prices[BHDPriceAPIData.prices.length - 1][1]
                BHDIncomeMonth = BHDMonthresult * BHDPriceAPIData.prices[BHDPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        */
        

        USDResultHour.innerHTML = numberShortener(burstIncomeHour)
        USDResultDay.innerHTML = numberShortener(burstIncomeDay)
        USDResultWeek.innerHTML = numberShortener(burstIncomeWeek)
        USDResultMonth.innerHTML = numberShortener(burstIncomeMonth)
}

var tempUSDProfit

function calcProfit() {
  PowerCostHourResult = (((powerConsumption.value * 1) / 1000) * elecCost.value) * -1
  PowerCostDayResult = (((powerConsumption.value * 24) / 1000) * elecCost.value) * -1
  PowerCostWeekResult = ((((powerConsumption.value * 24) / 1000) * 7) * elecCost.value) * -1
  PowerCostMonthResult = ((((powerConsumption.value * 24) / 1000) * 30) * elecCost.value) * -1

  //PowerCost
  PowerCostHour.innerHTML = numberShortener(PowerCostHourResult)
  PowerCostDay.innerHTML = numberShortener(PowerCostDayResult)
  PowerCostWeek.innerHTML = numberShortener(PowerCostWeekResult)
  PowerCostMonth.innerHTML = numberShortener(PowerCostMonthResult)

  //Burst
  BurstResultHourProfit.innerHTML = numberShortener(feeCalc(burstHourresult))
  BurstResultDayProfit.innerHTML = numberShortener(feeCalc(burstDayresult))
  BurstResultWeekProfit.innerHTML = numberShortener(feeCalc(burstWeekresult))
  BurstResultMonthProfit.innerHTML = numberShortener(feeCalc(burstMonthresult))

  //USD
  USDResultHourProfit.innerHTML = numberShortener(colorProfit(feeCalcUSD(burstIncomeHour, 1, 1), USDResultHourProfit))
  USDResultDayProfit.innerHTML = numberShortener(colorProfit(feeCalcUSD(burstIncomeDay, 24, 1), USDResultDayProfit))
  USDResultWeekProfit.innerHTML = numberShortener(colorProfit(feeCalcUSD(burstIncomeWeek, 24, 7), USDResultWeekProfit))
  USDResultMonthProfit.innerHTML = numberShortener(colorProfit(feeCalcUSD(burstIncomeMonth, 24, 30), USDResultMonthProfit))

  tempUSDProfit = feeCalcUSD(burstIncomeDay, 24, 1) //+ (Math.round(feeCalcUSD(BHDIncomeDay, 24, 1)) * 100 ) / 100)
  console.log(tempUSDProfit)
  var roiMath = Math.round(HardwareCost.value / tempUSDProfit)
  if(roiMath >= 1) {
    ReturnOnInvestment.innerHTML = roiMath  + " Days"
  } else if(tempUSDProfit > HardwareCost.value) {
    ReturnOnInvestment.innerHTML = "Instant"
  } else {
    ReturnOnInvestment.innerHTML = "ROI Not Possible."
  }
  
}

function poolOrSoloChange() {
  if(poolOrSoloSwitch.checked == true) {
    poolOrSoloText.innerHTML = "Pool"
    rentedBHDDiv.style.removeProperty("display")
    poolFeeDiv.style.removeProperty("display")
    poolCapacityDiv.children[0].innerHTML = "Pool Balance(BHD)"
    if(previousPoolFee) {
      poolFee.value = previousPoolFee
    }
    liveHashrate()
  } else {
    previousPoolFee = poolFee.value
    poolOrSoloText.innerHTML = "Solo"
    rentedBHDDiv.style.display = "none"
    poolFeeDiv.style.display = "none"
    poolCapacityDiv.children[0].innerHTML = "Balance(BHD)"
    poolFee.value = 0
    liveHashrate()
  }
}

function feeCalc(coin) {
    return coin - (coin * (poolFee.value / 100))
}

function feeCalcUSD(coin, time1, time2) {
    return (coin - (coin * (poolFee.value / 100))) - ((((powerConsumption.value * time1) / 1000) * time2) * elecCost.value)
}

function colorProfit(coin, coinHTML) {
    if (themeToggle.checked == false) {
        if (coin > 0) {
            coinHTML.style.color = greenColor
        } else {
            coinHTML.style.color = redColor
        }
    } else {
        if (coin > 0) {
            coinHTML.style.color = greenColorDark
        } else {
            coinHTML.style.color = redColorDark
        }
    }
    return coin
}

function numberShortener(num) {
        let tempNum
        
        if(num <= 999 && num >= 0) {
            tempNum = num.toFixed(2)
        }
        else if(num >= 1000 && num < 1000000) {
            tempNum = (num/1000).toFixed(2) + " k"
        }
        else if(num >= 1000000 && num < 1000000000) {
            tempNum = (num/1000000).toFixed(2) + " M"
        }
        else if(num >= 1000000000 && num < 99999999999) {
            tempNum = (num/1000000000).toFixed(2) + " B"
        }
        else if(num >= 99999999999){
            tempNum = 99.99 + "+ B"
        }
        else if(num >= -999 && num < 0) {
            tempNum = num.toFixed(2)
        }
        else if(num <= -1000 && num > -1000000) {
            tempNum = (num/1000).toFixed(2) + " k"
        }
        else if(num <= 1000000 && num > -1000000000) {
            tempNum = (num/1000000).toFixed(2) + " M"
        }
        else if(num <= -1000000000 && num > -99999999999) {
            tempNum = (num/1000000000).toFixed(2) + " B"
        }
        else if(num <= -99999999999){
            tempNum = -99.99 + "+ B"
        }
        else {
            tempNum = "0.00"
        }
        
        return tempNum
}

function splitInput(number) {
    let tempNum
    
    tempNum = number.split(".")
    if (tempNum.length > 1) {
        tempNum[0] += "."
        tempNum = tempNum.join("")
        return tempNum.replace(/[^1234567890.]|\-/g, "")
    }
    return number.replace(/[^1234567890.]|\-/g, "")
}

function ChangeTheme() {
    var inputsTheme = document.getElementsByClassName("inputThemeJS");
    var HomeIMG = document.getElementsByClassName("HomeIMG")
    
    if (themeToggle.checked == true) {
        var data = {Toggle: themeToggle.checked}
        var strData = JSON.stringify(data)
        localStorage.setItem('theme', strData);
        var currentTheme = document.body.children
        for (var i = 0; i < currentTheme.length; i++) {
            currentTheme[i].style.color = "white";
        }
        currentTheme[0].style.backgroundColor = "#3b3d3f"
        currentTheme[1].style.backgroundColor = "#535659"
        currentTheme[2].style.backgroundColor = "#3b3d3f"
        document.body.style.background = "#535659";
        currentTheme[2].style.borderColor = "#28292b"
        HomeIMG[0].style.filter = "invert(1)"
        for (var i = 0; i < inputsTheme.length; i++) {
            inputsTheme[i].style.backgroundColor = "#90969b"
            inputsTheme[i].style.color = "white"
        }
        
    } else {
        var data = {Toggle: themeToggle.checked}
        var strData = JSON.stringify(data)
        localStorage.setItem('theme', strData);
        var currentTheme = document.body.children
        HomeIMG[0].style.removeProperty("filter")
        for (var i = 0; i < currentTheme.length; i++) {
            currentTheme[i].style.removeProperty("color")
            currentTheme[i].style.removeProperty("background-color")
            currentTheme[i].style.removeProperty("border-color")
        }
        document.body.style.removeProperty("background-color")
        for (var i = 0; i < inputsTheme.length; i++) {
            inputsTheme[i].style.removeProperty("background-color")
            inputsTheme[i].style.removeProperty("color")
        }
    }
}