/* Copyright (c) 2018 by Michael Galstyan <mike505222@gmail.com>
 * All rights reserved.
 *
 * License: 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   - Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */




const siaBlockTime = 600; // all time done in seconds
const hyperBlockTime = 600;
const primeBlockTime = 600;
const classicBlockTime = 600;
const cash2BlockTime = 9;

const hour = 3600;
const day = hour * 24;
const week = day * 7;
const month = day * 30; // assume month = 30 days

const miningAPI = "https://keops.cc/dbs/pansia_current.json";
var mineAPILoad = false

const cash2API = "https://blocks.cash2.org:8080/getinfo";
var cash2APILoad = false

const hyperPriceAPI = "https://api.coingecko.com/api/v3/coins/hyperspace/market_chart?vs_currency=usd&days=1"
var hyperPriceAPILoad = false

const siaPriceAPI = "https://api.coingecko.com/api/v3/coins/siacoin/market_chart?vs_currency=usd&days=1"
var siaPriceAPILoad = false

const primePriceAPI = "https://api.coingecko.com/api/v3/coins/siaprime-coin/market_chart?vs_currency=usd&days=1"
var primePriceAPILoad = false

const classicPriceAPI = "https://api.coingecko.com/api/v3/coins/siaclassic/market_chart?vs_currency=usd&days=1"
var classicPriceAPILoad = false

const cash2PriceAPI = "" //Wait for API to be on CoinGecko
var cash2PriceAPILoad = false

let hshrt = 0

const greenColor = "#30ff30"
const redColor = "#ff0000"

const PowerCostHour = document.querySelector("#PowerCostHour")
const PowerCostDay = document.querySelector("#PowerCostDay")
const PowerCostWeek = document.querySelector("#PowerCostWeek")
const PowerCostMonth = document.querySelector("#PowerCostMonth")

let PowerCostHourResult
let PowerCostDayResult
let PowerCostWeekResult
let PowerCostMonthResult

//Hyperspace-------------------------------------------------------------------
const XSCcalcHour = document.querySelector("#XSCresultHour")
const XSCcalcDay = document.querySelector("#XSCresultDay")
const XSCcalcWeek = document.querySelector("#XSCresultWeek")
const XSCcalcMonth = document.querySelector("#XSCresultMonth")

const XSCcalcHourUSD = document.querySelector("#XSCresultHourUSD")
const XSCcalcDayUSD = document.querySelector("#XSCresultDayUSD")
const XSCcalcWeekUSD = document.querySelector("#XSCresultWeekUSD")
const XSCcalcMonthUSD = document.querySelector("#XSCresultMonthUSD")

const XSCresultHourProfit = document.querySelector("#XSCresultHourProfit")
const XSCresultDayProfit = document.querySelector("#XSCresultDayProfit")
const XSCresultWeekProfit = document.querySelector("#XSCresultWeekProfit")
const XSCresultMonthProfit = document.querySelector("#XSCresultMonthProfit")

var hyperAPIDifficulty
var hyperAPIheight

let hyperHourresult
let hyperDayresult
let hyperWeekresult
let hyperMonthresult

let hyperUSDHourresult
let hyperUSDDayresult
let hyperUSDWeekresult
let hyperUSDMonthresult

let hyperFeeHour
let hyperFeeDay
let hyperFeeWeek
let hyperFeeMonth

//Sia Prime
const SCPcalcHour = document.querySelector("#SCPresultHour")
const SCPcalcDay = document.querySelector("#SCPresultDay")
const SCPcalcWeek = document.querySelector("#SCPresultWeek")
const SCPcalcMonth = document.querySelector("#SCPresultMonth")

const SCPcalcHourUSD = document.querySelector("#SCPresultHourUSD")
const SCPcalcDayUSD = document.querySelector("#SCPresultDayUSD")
const SCPcalcWeekUSD = document.querySelector("#SCPresultWeekUSD")
const SCPcalcMonthUSD = document.querySelector("#SCPresultMonthUSD")

const SCPresultHourProfit = document.querySelector("#SCPresultHourProfit")
const SCPresultDayProfit = document.querySelector("#SCPresultDayProfit")
const SCPresultWeekProfit = document.querySelector("#SCPresultWeekProfit")
const SCPresultMonthProfit = document.querySelector("#SCPresultMonthProfit")

var primeAPIDifficulty
var primeAPIheight

let primeHourresult
let primeDayresult
let primeWeekresult
let primeMonthresult

let primeUSDHourresult
let primeUSDDayresult
let primeUSDWeekresult
let primeUSDMonthresult

let primeFeeHour
let primeFeeDay
let primeFeeWeek
let primeFeeMonth

//Sia Classic
const SCCcalcHour = document.querySelector("#SCCresultHour")
const SCCcalcDay = document.querySelector("#SCCresultDay")
const SCCcalcWeek = document.querySelector("#SCCresultWeek")
const SCCcalcMonth = document.querySelector("#SCCresultMonth")

const SCCcalcHourUSD = document.querySelector("#SCCresultHourUSD")
const SCCcalcDayUSD = document.querySelector("#SCCresultDayUSD")
const SCCcalcWeekUSD = document.querySelector("#SCCresultWeekUSD")
const SCCcalcMonthUSD = document.querySelector("#SCCresultMonthUSD")

const SCCresultHourProfit = document.querySelector("#SCCresultHourProfit")
const SCCresultDayProfit = document.querySelector("#SCCresultDayProfit")
const SCCresultWeekProfit = document.querySelector("#SCCresultWeekProfit")
const SCCresultMonthProfit = document.querySelector("#SCCresultMonthProfit")

var classicAPIDifficulty
var classicAPIheight

let sccHourresult
let sccDayresult
let sccWeekresult
let sccMonthresult

let sccUSDHourresult
let sccUSDDayresult
let sccUSDWeekresult
let sccUSDMonthresult

let classicFeeHour
let classicFeeDay
let classicFeeWeek
let classicFeeMonth

//Sia
const SiacalcHour = document.querySelector("#SiaresultHour")
const SiacalcDay = document.querySelector("#SiaresultDay")
const SiacalcWeek = document.querySelector("#SiaresultWeek")
const SiacalcMonth = document.querySelector("#SiaresultMonth")

const SiacalcHourUSD = document.querySelector("#SiaresultHourUSD")
const SiacalcDayUSD = document.querySelector("#SiaresultDayUSD")
const SiacalcWeekUSD = document.querySelector("#SiaresultWeekUSD")
const SiacalcMonthUSD = document.querySelector("#SiaresultMonthUSD")

const SiaresultHourProfit = document.querySelector("#SiaresultHourProfit")
const SiaresultDayProfit = document.querySelector("#SiaresultDayProfit")
const SiaresultWeekProfit = document.querySelector("#SiaresultWeekProfit")
const SiaresultMonthProfit = document.querySelector("#SiaresultMonthProfit")

var siaAPIDifficulty
var siaAPIheight

let siaHourresult
let siaDayresult
let siaWeekresult
let siaMonthresult

let siaUSDHourresult
let siaUSDDayresult
let siaUSDWeekresult
let siaUSDMonthresult

let siaFeeHour
let siaFeeDay
let siaFeeWeek
let siaFeeMonth

//Cash2
const Cash2calcHour = document.querySelector("#CASH2resultHour")
const Cash2calcDay = document.querySelector("#CASH2resultDay")
const Cash2calcWeek = document.querySelector("#CASH2resultWeek")
const Cash2calcMonth = document.querySelector("#CASH2resultMonth")
/*
const Cash2calcHourUSD = document.querySelector("#CASH2resultHourUSD")
const Cash2calcDayUSD = document.querySelector("#CASH2resultDayUSD")
const Cash2calcWeekUSD = document.querySelector("#CASH2resultWeekUSD")
const Cash2calcMonthUSD = document.querySelector("#CASH2resultMonthUSD")

const Cash2resultHourProfit = document.querySelector("#CASH2resultHourProfit")
const Cash2resultDayProfit = document.querySelector("#CASH2resultDayProfit")
const Cash2resultWeekProfit = document.querySelector("#CASH2resultWeekProfit")
const Cash2resultMonthProfit = document.querySelector("#CASH2resultMonthProfit")
*/

var CASH2APIDifficulty
var CASH2APIheight

let Cash2Hourresult
let Cash2HourFinal
let Cash2Dayresult
let Cash2DayFinal
let Cash2Weekresult
let Cash2WeekFinal
let Cash2Monthresult
let Cash2MonthFinal

let Cash2USDHourresult
let Cash2USDDayresult
let Cash2USDWeekresult
let Cash2USDMonthresult

let Cash2FeeHour
let Cash2FeeDay
let Cash2FeeWeek
let Cash2FeeMonth

//----------------------------------------------------------------------------
const calcHour = document.querySelector("#resultHour")
const calcDay = document.querySelector("#resultDay")
const calcWeek = document.querySelector("#resultWeek")
const calcMonth = document.querySelector("#resultMonth")

const userHshrt = document.getElementById("hashrate")
const hashPower = document.getElementById("hashPower")

const poolFee = document.getElementById("poolFee")
const elecCost = document.getElementById("elecCost")
const powerConsumtion = document.getElementById("powerConsumtion")

const A3 = document.getElementById("A3")
const Baik = document.getElementById("Baik")
const B52 = document.getElementById("B52")
const iBe = document.getElementById("iBe")
const S11 = document.getElementById("S11")
const SC1 = document.getElementById("SC1")
const StrongU = document.getElementById("StrongU")
let totalPresetHashrate
let totalPresetPower

let A3preset = 0
let Baikpreset = 0
let B52preset = 0
let iBepreset = 0
let S11preset = 0
let SC1preset = 0
let StrongUpreset = 0

let A3presetFinal = 0
let BaikpresetFinal = 0
let B52presetFinal = 0
let iBepresetFinal = 0
let S11presetFinal = 0
let SC1presetFinal = 0
let StrongUpresetFinal = 0

let A3presetPower = 0
let BaikpresetPower = 0
let B52presetPower = 0
let iBepresetPower = 0
let S11presetPower = 0
let SC1presetPower = 0
let StrongUpresetPower = 0

var coinAddress
var coin

var popup

function BTCSet() {
    coinAddress = "1DNEmupDWC873fDv4Lpy1xY2us6eYKwXTH"
    coin = "BTC"
    popup = document.getElementById("myPopup");
    copyAdd()
}

function SIASet() {
    coinAddress = "f7e6b31b7fbfd78894964d81e418ad0d1b9f0a8ae59be37e932e5853670feb89e0f4021df521"
    coin = "SIA"
    popup = document.getElementById("myPopup2");
    copyAdd()
}

function XSCSet() {
    coinAddress = "ebe11b2258f11caba02e7d2c1a5766b94175a5155d9e620a7f77a95d4bd1f5856fdb2d513cb3"
    coin = "XSC"
    popup = document.getElementById("myPopup3");
    copyAdd()
}

function SCPSet() {
    coinAddress = "bd187fa1c247a297e364d67ee59b66a4cbecec2d4a3cf2c01d4d5540c9d6a03f6279d40657a3"
    coin = "SCP"
    popup = document.getElementById("myPopup4");
    copyAdd()
}

function copyAdd() {
      const el = document.createElement('textarea');
      el.value = coinAddress;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      popup.classList.toggle("show");
      setTimeout( () => {popup.classList.toggle("show")}, 3000);
      
}

var APILoaded = 0

let miningAPIData = 0
fetch(miningAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
    fetch(miningAPI)
        .then(function(response) {
            if (response.ok == true) {
                return response.json();
            } else {
                mineAPILoad = false
                alert("Error with loading Keops API data for Hyperspace, SiaPrime, SiaClassic, and Sia.")
            }
        })
        .then(function(myJson){
            miningAPIData = myJson
            mineAPILoad = true
            APILoaded += 1
            apiLoadVerify()
        })
    }
        
})
.then(function(myJson){
    miningAPIData = myJson
    mineAPILoad = true
    APILoaded += 1
    apiLoadVerify()
})

let cash2APIData = 0
fetch(cash2API)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
    fetch(cash2API)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        cash2APILoad = false
        alert("Error with loading Cash2 API.")
    }
    })
    .then(function(myJson){
        cash2APIData = myJson
        cash2APILoad = true
        APILoaded += 1
        apiLoadVerify()
    })
    }
})
.then(function(myJson){
    cash2APIData = myJson
    cash2APILoad = true
    APILoaded += 1
    apiLoadVerify()
})

let siaPriceAPIData
fetch(siaPriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        fetch(siaPriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        siaPriceAPILoad = false
        alert("Error with loading Sia API for Coingecko.")
    }
    })
    .then(function(myJson){
        siaPriceAPIData = myJson
        siaPriceAPILoad = true
        APILoaded += 1
        apiLoadVerify()
    })
    }
})
.then(function(myJson){
    siaPriceAPIData = myJson
    siaPriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
})

let hyperPriceAPIData
fetch(hyperPriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        fetch(hyperPriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        hyperPriceAPILoad = false
        alert("Error with loading Hyperspace API for Coingecko.")
    }
    })
    .then(function(myJson){
        hyperPriceAPIData = myJson
        hyperPriceAPILoad = true
        APILoaded += 1
        apiLoadVerify()
    })
    }
})
.then(function(myJson){
    hyperPriceAPIData = myJson
    hyperPriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
})

let primePriceAPIData
fetch(primePriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        fetch(primePriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        alert("Error with loading SiaPrime API from Coingecko.")
        primePriceAPILoad = false
    }
    })
    .then(function(myJson){
        primePriceAPIData = myJson
        primePriceAPILoad = true
        APILoaded += 1
        apiLoadVerify()
    })
    }
})
.then(function(myJson){
    primePriceAPIData = myJson
    primePriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
})

let classicPriceAPIData
fetch(classicPriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        fetch(classicPriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        classicPriceAPILoad = false
        alert("Error with loading SiaClassic API from Coingecko.")
    }
    })
    .then(function(myJson){
        classicPriceAPIData = myJson
        classicPriceAPILoad = true
        APILoaded += 1
        apiLoadVerify()
    })
    }
})
.then(function(myJson){
    classicPriceAPIData = myJson
    classicPriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
})

function apiLoadVerify() {
    if(APILoaded >= 6) {
        console.log(APILoaded)
        liveHashrate()
    }
}

function liveHashrate() {
    userHshrt.value = splitInput(userHshrt.value)
    poolFee.value = splitInput(poolFee.value)
    elecCost.value = splitInput(elecCost.value)
    powerConsumtion.value = splitInput(powerConsumtion.value)
    
    if (userHshrt.value == ".") {
        hshrt = 0
    }
    else {
        hshrt = userHshrt.value
    }
    
    if (poolFee.value > 100) {
        poolFee.value = 100
    }
    
    if (hashPower.selectedIndex == 0) {
        hshrt = hshrt * 1e9
    }
    else if (hashPower.selectedIndex == 1) {
        hshrt = hshrt * 1e12
    }
    
    if (mineAPILoad == true) {
        hyper()
        if (hyperPriceAPILoad == true) {
            hyperPrice()
        }
        
        prime()
        if (primePriceAPILoad == true) {
            primePrice()
        }
        classic()
        if (classicPriceAPILoad == true) {
            classicPrice()
        }
        
        sia()
        if (siaPriceAPILoad == true) {
            siaPrice()
        }
    }
    
    if (cash2APILoad == true) {
        cash2()
    }
    
    calcProfit()
}

poolFee.value = 1
elecCost.value = 0.1
const randomHshrt = [[815, 1275], [4300, 1350], [550, 500], [3830, 1380], [7000, 2100], [5500, 1600]]
const randomizer = randomHshrt[Math.floor(Math.random()*randomHshrt.length)]
userHshrt.value = randomizer[0]
powerConsumtion.value = randomizer[1]


function splitInput(number) {
    let tempHshrt
    
    tempHshrt = number.split(".")
    if (tempHshrt.length > 1) {
        tempHshrt[0] += "."
        tempHshrt = tempHshrt.join("")
        return tempHshrt.replace(/[^1234567890.]|\-/g, "")
    }
    return number.replace(/[^1234567890.]|\-/g, "")
}

function miningAPIError() {
        SiacalcHour.innerHTML = "Unable to load API"
        SiacalcDay.innerHTML = "Try refreshring page"
        SiacalcWeek.innerHTML = "or clearing cache"
        SiacalcMonth.innerHTML = ""
        
        SiacalcHourUSD.innerHTML = "Unable to load API"
        SiacalcDayUSD.innerHTML = "Try refreshring page"
        SiacalcWeekUSD.innerHTML = "or clearing cache"
        SiacalcMonthUSD.innerHTML = ""
        
        XSCcalcHour.innerHTML = "Unable to load API"
        XSCcalcDay.innerHTML = "Try refreshring page"
        XSCcalcWeek.innerHTML = "or clearing cache"
        XSCcalcMonth.innerHTML = ""
        
        XSCcalcHourUSD.innerHTML = "Unable to load API"
        XSCcalcDayUSD.innerHTML = "Try refreshring page"
        XSCcalcWeekUSD.innerHTML = "or clearing cache"
        XSCcalcMonthUSD.innerHTML = ""
        
        SCCcalcHour.innerHTML = "Unable to load API"
        SCCcalcDay.innerHTML = "Try refreshring page"
        SCCcalcWeek.innerHTML = "or clearing cache"
        SCCcalcMonth.innerHTML = ""
        
        SCCcalcHourUSD.innerHTML = "Unable to load API"
        SCCcalcDayUSD.innerHTML = "Try refreshring page"
        SCCcalcWeekUSD.innerHTML = "or clearing cache"
        SCCcalcMonthUSD.innerHTML = ""
        
        SCPcalcHour.innerHTML = "Unable to load API"
        SCPcalcDay.innerHTML = "Try refreshring page"
        SCPcalcWeek.innerHTML = "or clearing cache"
        SCPcalcMonth.innerHTML = ""
}

function sia(){
        
        try {
            siaAPIDifficulty = miningAPIData[0].difficulty
        } catch(e) {
            try {
                siaAPIDifficulty = miningAPIData[0].difficulty
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            siaAPIheight = miningAPIData[0].height
        } catch(e) {
            try {
                siaAPIheight = miningAPIData[0].height
            } catch(error) {
                console.log(error)
            }
        }
        
        siaHourresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, hour)
        siaDayresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, day)
        siaWeekresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, week)
        siaMonthresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, month)

        SiacalcHour.innerHTML = numberShortener(siaHourresult)
        SiacalcDay.innerHTML = numberShortener(siaDayresult)
        SiacalcWeek.innerHTML = numberShortener(siaWeekresult)
        SiacalcMonth.innerHTML = numberShortener(siaMonthresult)

function siaReward(difficulty, hashrate, height, period){
    return (hashrate/(difficulty/siaBlockTime)) * ((300000 - height - ((period/siaBlockTime)/2)) * (period/siaBlockTime));
}
}

function siaPrice() {
        
        try {
            siaUSDHourresult = siaHourresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                siaUSDHourresult = siaHourresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            siaUSDDayresult = siaDayresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                siaUSDDayresult = siaDayresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            siaUSDWeekresult = siaWeekresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                siaUSDWeekresult = siaWeekresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            siaUSDMonthresult = siaMonthresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                siaUSDMonthresult = siaMonthresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        SiacalcHourUSD.innerHTML = numberShortener(siaUSDHourresult)
        SiacalcDayUSD.innerHTML = numberShortener(siaUSDDayresult)
        SiacalcWeekUSD.innerHTML = numberShortener(siaUSDWeekresult)
        SiacalcMonthUSD.innerHTML = numberShortener(siaUSDMonthresult)
}

function siaPriceError() {
        SiacalcHourUSD.innerHTML = "Unable to load API"
        SiacalcDayUSD.innerHTML = "Try refreshring page or clearing cache"
        SiacalcWeekUSD.innerHTML = ""
        SiacalcMonthUSD.innerHTML = ""
}

function hyper(){
        
        try {
            hyperAPIDifficulty = miningAPIData[1].difficulty
        } catch(e) {
            try {
                hyperAPIDifficulty = miningAPIData[1].difficulty
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            hyperAPIheight = miningAPIData[1].height
        } catch(e) {
            try {
                hyperAPIheight = miningAPIData[1].height
            } catch(error) {
                console.log(error)
            }
        }
        
        hyperHourresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, hour)
        hyperDayresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, day)
        hyperWeekresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, week)
        hyperMonthresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, month)
        
        XSCcalcHour.innerHTML = numberShortener(hyperHourresult)
        XSCcalcDay.innerHTML = numberShortener(hyperDayresult)
        XSCcalcWeek.innerHTML = numberShortener(hyperWeekresult)
        XSCcalcMonth.innerHTML = numberShortener(hyperMonthresult)
    
function hyperReward(difficulty, hashrate, height, period){
    return (hashrate/(difficulty/hyperBlockTime)) * ((60000 - (height * 0.2) - ((period/hyperBlockTime)/2)) * (period/hyperBlockTime)) * 0.9;
}

    }
    
function hyperPrice() {
        try {
            hyperUSDHourresult = hyperHourresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                hyperUSDHourresult = hyperHourresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            hyperUSDDayresult = hyperDayresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                hyperUSDDayresult = hyperDayresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            hyperUSDWeekresult = hyperWeekresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                hyperUSDWeekresult = hyperWeekresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            hyperUSDMonthresult = hyperMonthresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                hyperUSDMonthresult = hyperMonthresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        XSCcalcHourUSD.innerHTML = numberShortener(hyperUSDHourresult)
        XSCcalcDayUSD.innerHTML = numberShortener(hyperUSDDayresult)
        XSCcalcWeekUSD.innerHTML = numberShortener(hyperUSDWeekresult)
        XSCcalcMonthUSD.innerHTML = numberShortener(hyperUSDMonthresult)
}

function hyperPriceError() {
        XSCcalcHourUSD.innerHTML = "Unable to load API"
        XSCcalcDayUSD.innerHTML = "Try refreshring page"
        XSCcalcWeekUSD.innerHTML = "or clearing cache"
        XSCcalcMonthUSD.innerHTML = ""
}

function classic(){
        
        try {
            classicAPIDifficulty = miningAPIData[3].difficulty
        } catch(e) {
            try {
                classicAPIDifficulty = miningAPIData[3].difficulty
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            classicAPIheight = miningAPIData[3].height
        } catch(e) {
            try {
                classicAPIheight = miningAPIData[3].height
            } catch(error) {
                console.log(error)
            }
        }
        
        sccHourresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, hour)
        sccDayresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, day)
        sccWeekresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, week)
        sccMonthresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, month)
        
        SCCcalcHour.innerHTML = numberShortener(sccHourresult)
        SCCcalcDay.innerHTML = numberShortener(sccDayresult)
        SCCcalcWeek.innerHTML = numberShortener(sccWeekresult)
        SCCcalcMonth.innerHTML = numberShortener(sccMonthresult)
    

function classicReward(difficulty, hashrate, height, period){
    return (hashrate/(difficulty/classicBlockTime)) * ((300000 - height - ((period/classicBlockTime)/2)) * (period/classicBlockTime));
}
}

function classicPrice() {
        
        try {
            sccUSDHourresult = sccHourresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                sccUSDHourresult = sccHourresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            sccUSDDayresult = sccDayresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                sccUSDDayresult = sccDayresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            sccUSDWeekresult = sccWeekresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                sccUSDWeekresult = sccWeekresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            sccUSDMonthresult = sccMonthresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                sccUSDMonthresult = sccMonthresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        SCCcalcHourUSD.innerHTML = numberShortener(sccUSDHourresult)
        SCCcalcDayUSD.innerHTML = numberShortener(sccUSDDayresult)
        SCCcalcWeekUSD.innerHTML = numberShortener(sccUSDWeekresult)
        SCCcalcMonthUSD.innerHTML = numberShortener(sccUSDMonthresult)
}

function classicPriceAPIError() {
        SCCcalcHourUSD.innerHTML = "Unable to load API"
        SCCcalcDayUSD.innerHTML = "Try refreshring page"
        SCCcalcWeekUSD.innerHTML = "or clearing cache"
        SCCcalcMonthUSD.innerHTML = ""
}


function prime(){
    
    try {
        primeAPIDifficulty = miningAPIData[2].difficulty
    } catch(e) {
        try {
            primeAPIDifficulty = miningAPIData[2].difficulty
        } catch(error) {
            console.log(error)
        }
    }
    
    try {
        primeAPIheight = miningAPIData[2].height
    } catch(e) {
        try {
            primeAPIheight = miningAPIData[2].height
        } catch(error) {
            console.log(error)
        }
    }
    
    primeHourresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, hour)
    primeDayresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, day)
    primeWeekresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, week)
    primeMonthresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, month)
    
    SCPcalcHour.innerHTML = numberShortener(primeHourresult)
    SCPcalcDay.innerHTML = numberShortener(primeDayresult)
    SCPcalcWeek.innerHTML = numberShortener(primeWeekresult)
    SCPcalcMonth.innerHTML = numberShortener(primeMonthresult)

function primeReward(difficulty, hashrate, height, period){
    return (hashrate/(difficulty/primeBlockTime)) * ((300000 - height - ((period/primeBlockTime)/2)) * (period/primeBlockTime) * 0.8);
}
}

function primePrice() {
        
        try {
            primeUSDHourresult = primeHourresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                primeUSDHourresult = primeHourresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            primeUSDDayresult = primeDayresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                primeUSDDayresult = primeDayresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            primeUSDWeekresult = primeWeekresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                primeUSDWeekresult = primeWeekresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        try {
            primeUSDMonthresult = primeMonthresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
        } catch(e) {
            try {
                primeUSDMonthresult = primeMonthresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
            } catch(error) {
                console.log(error)
            }
        }
        
        SCPcalcHourUSD.innerHTML = numberShortener(primeUSDHourresult)
        SCPcalcDayUSD.innerHTML = numberShortener(primeUSDDayresult)
        SCPcalcWeekUSD.innerHTML = numberShortener(primeUSDWeekresult)
        SCPcalcMonthUSD.innerHTML = numberShortener(primeUSDMonthresult)
}

function primePriceError() {
        SCPcalcHourUSD.innerHTML = "Unable to load API"
        SCPcalcDayUSD.innerHTML = "Try refreshring page or clearing cache"
        SCPcalcWeekUSD.innerHTML = ""
        SCPcalcMonthUSD.innerHTML = ""
}

function cash2(){
    
    try {
        CASH2APIDifficulty = cash2APIData.difficulty
    } catch(e) {
        try {
            CASH2APIDifficulty = cash2APIData.difficulty
        } catch(error) {
            console.log(error)
        }
    }
    
    try {
        CASH2APIheight = cash2APIData.height
    } catch(e) {
        try {
            CASH2APIheight = cash2APIData.height
        } catch(error) {
            console.log(error)
        }
    }
    
    Cash2Hourresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, hour) * 0.36
    Cash2Dayresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, day) * 0.36
    Cash2Weekresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, week) * 0.36
    Cash2Monthresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, month) * 0.36
    
    Cash2calcHour.innerHTML = numberShortener(Cash2Hourresult)
    Cash2calcDay.innerHTML = numberShortener(Cash2Dayresult)
    Cash2calcWeek.innerHTML = numberShortener(Cash2Weekresult)
    Cash2calcMonth.innerHTML = numberShortener(Cash2Monthresult)
    
function getBlockReward(CASH2APIheight)
{
      var alreadyGeneratedCoins = 0;

      for (var i = 0; i < CASH2APIheight; i++)
      {
          alreadyGeneratedCoins += (15000000 - alreadyGeneratedCoins) / 16777216;
      }

      return (15000000 - alreadyGeneratedCoins) / 16777216;
}

function cash2Reward(difficulty, hashrate, height, period){
    return (hashrate/((CASH2APIDifficulty * 1099511627776)/cash2BlockTime)) * ((getBlockReward(CASH2APIheight + ((period/cash2BlockTime)/2)))  * (period/cash2BlockTime))
}
}


function calcProfit() {
    if (poolFee.value >= 0 || elecCost.value >= 0 || powerConsumtion.value >= 0) {
        PowerCostHourResult = (((powerConsumtion.value * 1) / 1000) * elecCost.value) * -1
        PowerCostDayResult = (((powerConsumtion.value * 24) / 1000) * elecCost.value) * -1
        PowerCostWeekResult = ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value) * -1
        PowerCostMonthResult = ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value) * -1
        
        hyperFeeHour = (hyperUSDHourresult - (hyperUSDHourresult * (poolFee.value / 100))) - (((powerConsumtion.value * 1) / 1000) * elecCost.value)
        hyperFeeDay = (hyperUSDDayresult - (hyperUSDDayresult * (poolFee.value / 100))) - (((powerConsumtion.value * 24) / 1000) * elecCost.value)
        hyperFeeWeek = (hyperUSDWeekresult - (hyperUSDWeekresult * (poolFee.value / 100))) - ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value)
        hyperFeeMonth = (hyperUSDMonthresult - (hyperUSDMonthresult * (poolFee.value / 100))) - ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value)
        
        primeFeeHour = (primeUSDHourresult - (primeUSDHourresult * (poolFee.value / 100))) - (((powerConsumtion.value * 1) / 1000) * elecCost.value)
        primeFeeDay = (primeUSDDayresult - (primeUSDDayresult * (poolFee.value / 100))) - (((powerConsumtion.value * 24) / 1000) * elecCost.value)
        primeFeeWeek = (primeUSDWeekresult - (primeUSDWeekresult * (poolFee.value / 100))) - ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value)
        primeFeeMonth = (primeUSDMonthresult - (primeUSDMonthresult * (poolFee.value / 100))) - ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value)
        
        classicFeeHour = sccUSDHourresult - (sccUSDHourresult * (poolFee.value / 100)) - (((powerConsumtion.value * 1) / 1000) * elecCost.value)
        classicFeeDay = sccUSDDayresult - (sccUSDDayresult * (poolFee.value / 100)) - (((powerConsumtion.value * 24) / 1000) * elecCost.value)
        classicFeeWeek = sccUSDWeekresult - (sccUSDWeekresult * (poolFee.value / 100)) - ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value)
        classicFeeMonth = sccUSDMonthresult - (sccUSDMonthresult * (poolFee.value / 100)) - ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value)
        
        siaFeeHour = siaUSDHourresult - (siaUSDHourresult * (poolFee.value / 100)) - (((powerConsumtion.value * 1) / 1000) * elecCost.value)
        siaFeeDay = siaUSDDayresult - (siaUSDDayresult * (poolFee.value / 100)) - (((powerConsumtion.value * 24) / 1000) * elecCost.value)
        siaFeeWeek = siaUSDWeekresult - (siaUSDWeekresult * (poolFee.value / 100)) - ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value)
        siaFeeMonth = siaUSDMonthresult - (siaUSDMonthresult * (poolFee.value / 100)) - ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value)
        
        Cash2FeeHour = (((powerConsumtion.value * 1) / 1000) * elecCost.value) * -1
        Cash2FeeDay = (((powerConsumtion.value * 24) / 1000) * elecCost.value) * -1
        Cash2FeeWeek = ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value) * -1
        Cash2FeeMonth = ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value) * -1
        
        //PowerCost
        PowerCostHour.innerHTML = numberShortener(PowerCostHourResult)
        PowerCostDay.innerHTML = numberShortener(PowerCostDayResult)
        PowerCostWeek.innerHTML = numberShortener(PowerCostWeekResult)
        PowerCostMonth.innerHTML = numberShortener(PowerCostMonthResult)
        
        //HyperSpace
        XSCresultHourProfit.innerHTML = numberShortener(hyperFeeHour)
        XSCresultDayProfit.innerHTML = numberShortener(hyperFeeDay)
        XSCresultWeekProfit.innerHTML = numberShortener(hyperFeeWeek)
        XSCresultMonthProfit.innerHTML = numberShortener(hyperFeeMonth)
        
        //Hour
        if (hyperFeeHour > 0) {
            XSCresultHourProfit.style.color = greenColor
        } else if (hyperFeeHour < 0) {
            XSCresultHourProfit.style.color = redColor
        }
        //Day
        if (hyperFeeDay > 0) {
            XSCresultDayProfit.style.color = greenColor
        } else if (hyperFeeDay < 0) {
            XSCresultDayProfit.style.color = redColor
        }
        //Week
        if (hyperFeeWeek > 0) {
            XSCresultWeekProfit.style.color = greenColor
        } else if (hyperFeeWeek < 0) {
            XSCresultWeekProfit.style.color = redColor
        }
        //Month
        if (hyperFeeMonth > 0) {
            XSCresultMonthProfit.style.color = greenColor
        } else if (hyperFeeMonth < 0) {
            XSCresultMonthProfit.style.color = redColor
        }
        
        //SiaPrime
        SCPresultHourProfit.innerHTML = numberShortener(primeFeeHour)
        SCPresultDayProfit.innerHTML = numberShortener(primeFeeDay)
        SCPresultWeekProfit.innerHTML = numberShortener(primeFeeWeek)
        SCPresultMonthProfit.innerHTML = numberShortener(primeFeeMonth)
        
        //Hour
        if (primeFeeHour > 0) {
            SCPresultHourProfit.style.color = greenColor
        } else if (primeFeeHour < 0) {
            SCPresultHourProfit.style.color = redColor
        }
        //Day
        if (primeFeeDay > 0) {
            SCPresultDayProfit.style.color = greenColor
        } else if (primeFeeDay < 0) {
            SCPresultDayProfit.style.color = redColor
        }
        //Week
        if (primeFeeWeek > 0) {
            SCPresultWeekProfit.style.color = greenColor
        } else if (primeFeeWeek < 0) {
            SCPresultWeekProfit.style.color = redColor
        }
        //Month
        if (primeFeeMonth > 0) {
            SCPresultMonthProfit.style.color = greenColor
        } else if (primeFeeMonth < 0) {
            SCPresultMonthProfit.style.color = redColor
        }
        
        //SiaClassic
        SCCresultHourProfit.innerHTML = numberShortener(classicFeeHour)
        SCCresultDayProfit.innerHTML = numberShortener(classicFeeDay)
        SCCresultWeekProfit.innerHTML = numberShortener(classicFeeWeek)
        SCCresultMonthProfit.innerHTML = numberShortener(classicFeeMonth)
        
        //Hour
        if (classicFeeHour > 0) {
            SCCresultHourProfit.style.color = greenColor
        } else if (classicFeeHour < 0) {
            SCCresultHourProfit.style.color = redColor
        }
        //Day
        if (classicFeeDay > 0) {
            SCCresultDayProfit.style.color = greenColor
        } else if (classicFeeDay < 0) {
            SCCresultDayProfit.style.color = redColor
        }
        //Week
        if (classicFeeWeek > 0) {
            SCCresultWeekProfit.style.color = greenColor
        } else if (classicFeeWeek < 0) {
            SCCresultWeekProfit.style.color = redColor
        }
        //Month
        if (classicFeeMonth > 0) {
            SCCresultMonthProfit.style.color = greenColor
        } else if (classicFeeMonth < 0) {
            SCCresultMonthProfit.style.color = redColor
        }
        
        //Sia
        SiaresultHourProfit.innerHTML = numberShortener(siaFeeHour)
        SiaresultDayProfit.innerHTML = numberShortener(siaFeeDay)
        SiaresultWeekProfit.innerHTML = numberShortener(siaFeeWeek)
        SiaresultMonthProfit.innerHTML = numberShortener(siaFeeMonth)
        
        //Hour
        if (siaFeeHour > 0) {
            SiaresultHourProfit.style.color = greenColor
        } else if (siaFeeHour < 0) {
            SiaresultHourProfit.style.color = redColor
        }
        //Day
        if (siaFeeDay > 0) {
            SiaresultDayProfit.style.color = greenColor
        } else if (siaFeeDay < 0) {
            SiaresultDayProfit.style.color = redColor
        }
        //Week
        if (siaFeeWeek > 0) {
            SiaresultWeekProfit.style.color = greenColor
        } else if (siaFeeWeek < 0) {
            SiaresultWeekProfit.style.color = redColor
        }
        //Month
        if (siaFeeMonth > 0) {
            SiaresultMonthProfit.style.color = greenColor
        } else if (siaFeeMonth < 0) {
            SiaresultMonthProfit.style.color = redColor
        }
        /*
        //Cash2
        Cash2resultHourProfit.innerHTML = numberShortener(Cash2FeeHour)
        Cash2resultDayProfit.innerHTML = numberShortener(Cash2FeeDay)
        Cash2resultWeekProfit.innerHTML = numberShortener(Cash2FeeWeek)
        Cash2resultMonthProfit.innerHTML = numberShortener(Cash2FeeMonth)
        
        //Hour
        if (Cash2FeeHour > 0) {
            Cash2resultHourProfit.style.color = greenColor
        } else if (Cash2FeeHour < 0) {
            Cash2resultHourProfit.style.color = redColor
        }
        //Day
        if (Cash2FeeDay > 0) {
            Cash2resultDayProfit.style.color = greenColor
        } else if (Cash2FeeDay < 0) {
            Cash2resultDayProfit.style.color = redColor
        }
        //Week
        if (Cash2FeeWeek > 0) {
            Cash2resultWeekProfit.style.color = greenColor
        } else if (Cash2FeeWeek < 0) {
            Cash2resultWeekProfit.style.color = redColor
        }
        //Month
        if (Cash2FeeMonth > 0) {
            Cash2resultMonthProfit.style.color = greenColor
        } else if (Cash2FeeMonth < 0) {
            Cash2resultMonthProfit.style.color = redColor
        }
        */
    }
}

function presetUpdate() {
    A3.value = A3.value.replace(/[^1234567890]/g, "")
    Baik.value = Baik.value.replace(/[^1234567890]/g, "")
    B52.value = B52.value.replace(/[^1234567890]/g, "")
    iBe.value = iBe.value.replace(/[^1234567890]/g, "")
    S11.value = S11.value.replace(/[^1234567890]/g, "")
    SC1.value = SC1.value.replace(/[^1234567890]/g, "")
    StrongU.value = StrongU.value.replace(/[^1234567890]/g, "")
    
    A3preset = A3.value
    Baikpreset = Baik.value
    B52preset = B52.value
    iBepreset = iBe.value
    S11preset = S11.value
    SC1preset = SC1.value
    StrongUpreset = StrongU.value
    
    //Antminer A3
    if (A3preset >= 1 && A3preset < 999) {
        A3presetFinal = 815 * A3preset
        A3presetPower = 1275 * A3preset
    }
    else if (A3preset >= 999) {
        A3.value = 999
        A3presetFinal = 815 * A3preset
        A3presetPower = 1275 * A3preset
    }
    else if (A3preset <= 0){
        A3presetFinal = 0
        A3presetPower = 0
    }
    
    //Baikal BK-B
    if (Baikpreset >= 1 && Baikpreset < 999) {
        BaikpresetFinal = 160 * Baikpreset
        BaikpresetPower = 410 * Baikpreset
    }
    else if (Baikpreset >= 999) {
        Baik.value = 999
        BaikpresetFinal = 160 * Baikpreset
        BaikpresetPower = 410 * Baikpreset
    }
    else if (Baikpreset <= 0){
        BaikpresetFinal = 0
        BaikpresetPower = 0
    }
    
    //Halong Mining DragonMint B52
    if (B52preset >= 1 && B52preset < 999) {
        B52presetFinal = 3830 * B52preset
        B52presetPower = 1380 * B52preset
    }
    else if (B52preset >= 999) {
        B52.value = 999
        B52presetFinal = 3830 * B52preset
        B52presetPower = 1380 * B52preset
    }
    else if (B52preset <= 0){
        B52presetFinal = 0
        B52presetPower = 0
    }
    
    //iBeLink DSM7T
    if (iBepreset >= 1 && iBepreset < 999) {
        iBepresetFinal = 7000 * iBepreset
        iBepresetPower = 2100 * iBepreset
    }
    else if (iBepreset >= 999) {
        iBe.value = 999
        iBepresetFinal = 7000 * iBepreset
        iBepresetPower = 2100 * iBepreset
    }
    else if (iBepreset <= 0){
        iBepresetFinal = 0
        iBepresetPower= 0
    }
    
    //Innosilicon S11
    if (S11preset >= 1 && S11preset < 999) {
        S11presetFinal = 4300 * S11preset
        S11presetPower = 1350 * S11preset
    }
    else if (S11preset >= 999) {
        S11.value = 999
        S11presetFinal = 4300 * S11preset
        S11presetPower = 1350 * S11preset
    }
    else if (S11preset <= 0){
        S11presetFinal = 0
        S11presetPower = 0
    }
    
    //Obelisk SC1
    if (SC1preset >= 1 && SC1preset < 999) {
        SC1presetFinal = 550 * SC1preset
        SC1presetPower = 500 * SC1preset
    }
    else if (SC1preset >= 999) {
        SC1.value = 999
        SC1presetFinal = 550 * SC1preset
        SC1presetPower = 500 * SC1preset
    }
    else if (SC1preset <= 0){
        SC1presetFinal = 0
        SC1presetPower = 0
    }
        
    //StrongU STU-U2
    if (StrongUpreset >= 1 && StrongUpreset < 999) {
        StrongUpresetFinal = 5500 * StrongUpreset
        StrongUpresetPower = 1600 * StrongUpreset
    }
    else if (StrongUpreset >= 999) {
        StrongU.value = 999
        StrongUpresetFinal = 5500 * StrongUpreset
        StrongUpresetPower = 1600 * StrongUpreset
    }
    else if (StrongUpreset <= 0){
        StrongUpresetFinal = 0
        StrongUpresetPower = 0
    }
    
    totalPresetHashrate = A3presetFinal + BaikpresetFinal + B52presetFinal + iBepresetFinal + S11presetFinal + SC1presetFinal + StrongUpresetFinal
    
    if (totalPresetHashrate >= 1000) {
        totalPresetHashrate = totalPresetHashrate / 1000
        hashPower.selectedIndex = 1
    }
    else {
        hashPower.selectedIndex = 0
    }
    
    totalPresetPower = A3presetPower + BaikpresetPower + B52presetPower + iBepresetPower + S11presetPower + SC1presetPower + StrongUpresetPower
    userHshrt.value = totalPresetHashrate.toFixed(2)
    powerConsumtion.value = totalPresetPower.toFixed(2)
    
    liveHashrate()
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
            tempNum = "NaN"
        }
        
        return tempNum
}