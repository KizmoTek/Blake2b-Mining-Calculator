/* Copyright (c) 2018 by KizmoTek <KizmoTek@gmail.com>
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

moment().format();

const greenColor = "green"
const yellowColor = "yellow"
const redColor = "red"

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
let mineAPILoad = false


// const cash2API = "https://blocks.cash2.org:8080/getinfo";
const cash2API = "https://www.soloblox.com:8119/stats";
let cash2APILoad = false

const hyperPriceAPI = "https://api.coingecko.com/api/v3/coins/hyperspace/market_chart?vs_currency=usd&days=1"
let hyperPriceAPILoad = false

const siaPriceAPI = "https://api.coingecko.com/api/v3/coins/siacoin/market_chart?vs_currency=usd&days=1"
let siaPriceAPILoad = false

const primePriceAPI = "https://api.coingecko.com/api/v3/coins/siaprime-coin/market_chart?vs_currency=usd&days=1"
let primePriceAPILoad = false

const classicPriceAPI = "https://api.coingecko.com/api/v3/coins/siaclassic/market_chart?vs_currency=usd&days=1"
let classicPriceAPILoad = false

const cash2PriceAPI = "https://api.coingecko.com/api/v3/coins/cash2/market_chart?vs_currency=usd&days=1"
let cash2PriceAPILoad = false

const btcPriceAPI = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
let btcPriceAPILoad = false
let bitcoinUSDPrice

let diffToggle = document.getElementById("difficultyToggle")
let diffAdjust = true // Toggles adjusting difficulty for added hashrate
let hshrt = 0

const PowerCost = document.getElementById("PowerCost")

let PowerCostHourDay = PowerCost.childNodes[3].childNodes[1]
let PowerCostWeekMonth = PowerCost.childNodes[3].childNodes[3]

let PowerCostHourResult
let PowerCostDayResult
let PowerCostWeekResult
let PowerCostMonthResult

//Hyperspace-------------------------------------------------------------------
const XSC = document.getElementById("XSC")

let XSCVolumeValue = XSC.childNodes[7].childNodes[3]
let XSCPriceValue = XSC.childNodes[7].childNodes[1]
let XSCMarketCapValue = XSC.childNodes[7].childNodes[5]

let XSCcalcHourDay = XSC.childNodes[9].childNodes[1]
let XSCcalcWeekMonth = XSC.childNodes[9].childNodes[3]

let XSCcalcHourDayUSD = XSC.childNodes[11].childNodes[1]
let XSCcalcWeekMonthUSD = XSC.childNodes[11].childNodes[3]

let XSCresultHourDayProfitUSD = XSC.childNodes[13].childNodes[1]
let XSCresultWeekMonthProfitUSD = XSC.childNodes[13].childNodes[3]

let hyperAPIDifficulty
let hyperAPIheight

let hyperHourresult
let hyperDayresult
let hyperWeekresult
let hyperMonthresult

let hyperUSDHourresult
let hyperUSDDayresult
let hyperUSDWeekresult
let hyperUSDMonthresult

//Sia Prime dev fee calculation
const SCPDevFeeStart = moment('04/30/2019').unix()
const SCPDevFeeEnd = moment('10/31/2020').unix()

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
let newToday = yyyy + '-' + mm + '-' + dd

let currDate = moment(newToday).unix()

let SCPDevFee = .20  // Starts at 20%
if (currDate > SCPDevFeeStart) {
    if (currDate < SCPDevFeeEnd) {
        SCPDevFee = (0.2 - (SCPDevFeeEnd - currDate) * (0.1 / (SCPDevFeeEnd - SCPDevFeeStart)))
    } else {
        SCPDevFee = 0
    }
}

const SCP = document.getElementById("SCP")

let SCPVolumeValue = SCP.childNodes[7].childNodes[3]
let SCPPriceValue = SCP.childNodes[7].childNodes[1]
let SCPMarketCapValue = SCP.childNodes[7].childNodes[5]

let SCPcalcHourDay = SCP.childNodes[9].childNodes[1]
let SCPcalcWeekMonth = SCP.childNodes[9].childNodes[3]

let SCPcalcHourDayUSD = SCP.childNodes[11].childNodes[1]
let SCPcalcWeekMonthUSD = SCP.childNodes[11].childNodes[3]

let SCPresultHourDayProfitUSD = SCP.childNodes[13].childNodes[1]
let SCPresultWeekMonthProfitUSD = SCP.childNodes[13].childNodes[3]

let primeAPIDifficulty
let primeAPIheight

let primeHourresult
let primeDayresult
let primeWeekresult
let primeMonthresult

let primeUSDHourresult
let primeUSDDayresult
let primeUSDWeekresult
let primeUSDMonthresult

//Sia Classic
const SCC = document.getElementById("SCC")

let SCCVolumeValue = SCC.childNodes[7].childNodes[3]
let SCCPriceValue = SCC.childNodes[7].childNodes[1]
let SCCMarketCapValue = SCC.childNodes[7].childNodes[5]

let SCCcalcHourDay = SCC.childNodes[9].childNodes[1]
let SCCcalcWeekMonth = SCC.childNodes[9].childNodes[3]

let SCCcalcHourDayUSD = SCC.childNodes[11].childNodes[1]
let SCCcalcWeekMonthUSD = SCC.childNodes[11].childNodes[3]

let SCCresultHourDayProfitUSD = SCC.childNodes[13].childNodes[1]
let SCCresultWeekMonthProfitUSD = SCC.childNodes[13].childNodes[3]

let classicAPIDifficulty
let classicAPIheight

let sccHourresult
let sccDayresult
let sccWeekresult
let sccMonthresult

let sccUSDHourresult
let sccUSDDayresult
let sccUSDWeekresult
let sccUSDMonthresult

//Sia
const Sia = document.getElementById("SC")

let SiaVolumeValue = Sia.childNodes[7].childNodes[3]
let SiaPriceValue = Sia.childNodes[7].childNodes[1]
let SiaMarketCapValue = Sia.childNodes[7].childNodes[5]

let SiacalcHourDay = Sia.childNodes[9].childNodes[1]
let SiacalcWeekMonth = Sia.childNodes[9].childNodes[3]

let SiacalcHourDayUSD = Sia.childNodes[11].childNodes[1]
let SiacalcWeekMonthUSD = Sia.childNodes[11].childNodes[3]

let SiaresultHourDayProfitUSD = Sia.childNodes[13].childNodes[1]
let SiaresultWeekMonthProfitUSD = Sia.childNodes[13].childNodes[3]

let siaAPIDifficulty
let siaAPIheight

let siaHourresult
let siaDayresult
let siaWeekresult
let siaMonthresult

let siaUSDHourresult
let siaUSDDayresult
let siaUSDWeekresult
let siaUSDMonthresult

//Cash2
const Cash2 = document.getElementById("CASH2")

let Cash2VolumeValue = Cash2.childNodes[7].childNodes[3]
let Cash2PriceValue = Cash2.childNodes[7].childNodes[1]
let Cash2MarketCapValue = Cash2.childNodes[7].childNodes[5]

let Cash2calcHourDay = Cash2.childNodes[9].childNodes[1]
let Cash2calcWeekMonth = Cash2.childNodes[9].childNodes[3]

let Cash2calcHourDayUSD = Cash2.childNodes[11].childNodes[1]
let Cash2calcWeekMonthUSD = Cash2.childNodes[11].childNodes[3]

let Cash2resultHourDayProfitUSD = Cash2.childNodes[13].childNodes[1]
let Cash2resultWeekMonthProfitUSD = Cash2.childNodes[13].childNodes[3]

let CASH2APIDifficulty
let CASH2APIheight

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

//----------------------------------------------------------------------------
let customInput = document.getElementsByClassName("customInput")
let userHshrt = customInput[0].childNodes[3]
let hashPower = customInput[0].childNodes[5]

let rejectRate = customInput[2].childNodes[3]
let poolFee = customInput[3].childNodes[3]
let elecCost = customInput[4].childNodes[3]
let powerConsumtion = customInput[5].childNodes[3]

let presetMiners = document.getElementsByClassName("miners")
let A3 = presetMiners[0].childNodes[3]
let Baik = presetMiners[1].childNodes[3]
let B52 = presetMiners[2].childNodes[3]
let iBe = presetMiners[3].childNodes[3]
let S11 = presetMiners[4].childNodes[3]
let StrongU = presetMiners[5].childNodes[3]
let SC1 = presetMiners[6].childNodes[3]
let SC200 = presetMiners[7].childNodes[3]

let totalPresetHashrate
let totalBlake2bHashrate
let totalBlake2bPower
let totalSiaHashrate
let totalSiaPower
let totalPresetPower
let usingPreset

let A3preset = 0
let Baikpreset = 0
let B52preset = 0
let iBepreset = 0
let S11preset = 0
let SC1preset = 0
let SC200preset = 0
let StrongUpreset = 0

let A3presetFinal = 0
let BaikpresetFinal = 0
let B52presetFinal = 0
let iBepresetFinal = 0
let S11presetFinal = 0
let SC1presetFinal = 0
let SC200presetFinal = 0
let StrongUpresetFinal = 0

let A3presetPower = 0
let BaikpresetPower = 0
let B52presetPower = 0
let iBepresetPower = 0
let S11presetPower = 0
let SC1presetPower = 0
let SC200presetPower = 0
let StrongUpresetPower = 0




let APILoaded = 0
let APINeeded = 8
const APIStatus = document.getElementById("apiStatus")

function APIError(API) {
    APIStatus.classList.add("apiError");
    APIStatus.classList.remove("apiActive")
    APIStatus.innerHTML = "Error"
    APIStatus.parentNode.setAttribute('data-value', "Error with loading " + API + " API");
}

//Load's Mining API
let miningAPIData
loadAPI(miningAPI).then(data => {
    miningAPIData = data
    mineAPILoad = true
    APILoaded += 1

    // Sia
    siaAPIDifficulty = miningAPIData[0].difficulty
    siaAPIheight = miningAPIData[0].height
    Sia.childNodes[3].childNodes[1].innerHTML = numberWithCommas(miningAPIData[0].blockreward) + " SC"
    Sia.childNodes[3].childNodes[3].innerHTML = numberWithCommas(siaAPIheight)
    Sia.childNodes[5].childNodes[1].innerHTML = hashrateShortner(miningAPIData[0].hashrate)
    Sia.childNodes[5].childNodes[3].innerHTML = hashrateShortner(siaAPIDifficulty)

    // Hyperspace
    hyperAPIDifficulty = miningAPIData[1].difficulty
    hyperAPIheight = miningAPIData[1].height
    XSC.childNodes[3].childNodes[1].innerHTML = numberWithCommas(miningAPIData[1].blockreward) + " XSC"
    XSC.childNodes[3].childNodes[3].innerHTML = numberWithCommas(hyperAPIheight)
    XSC.childNodes[5].childNodes[1].innerHTML = hashrateShortner(miningAPIData[1].hashrate)
    XSC.childNodes[5].childNodes[3].innerHTML = hashrateShortner(hyperAPIDifficulty)

    // ScPrime
    primeAPIDifficulty = miningAPIData[2].difficulty
    primeAPIheight = miningAPIData[2].height
    SCP.childNodes[3].childNodes[1].innerHTML = numberWithCommas(miningAPIData[2].blockreward) + " SCP"
    SCP.childNodes[3].childNodes[3].innerHTML = numberWithCommas(primeAPIheight)
    SCP.childNodes[5].childNodes[1].innerHTML = hashrateShortner(miningAPIData[2].hashrate)
    SCP.childNodes[5].childNodes[3].innerHTML = hashrateShortner(primeAPIDifficulty)

    // SiaClassic
    classicAPIDifficulty = miningAPIData[3].difficulty
    classicAPIheight = miningAPIData[3].height
    SCC.childNodes[3].childNodes[1].innerHTML = numberWithCommas(miningAPIData[3].blockreward) + " SCC"
    SCC.childNodes[3].childNodes[3].innerHTML = numberWithCommas(classicAPIheight)
    SCC.childNodes[5].childNodes[1].innerHTML = hashrateShortner(miningAPIData[3].hashrate)
    SCC.childNodes[5].childNodes[3].innerHTML = hashrateShortner(classicAPIDifficulty)
    apiLoadVerify()
}).catch(function (error) {
    console.log(error);
    mineAPILoad = false;
    APIError("Mining Data");
    APILoaded -= 1;
})

//Load's Cash2 mining API
let cash2APIData
loadAPI(cash2API).then(data => {
    cash2APIData = data
    cash2APILoad = true
    APILoaded += 1

    CASH2APIDifficulty = cash2APIData.network.difficulty / 1099511627776
    CASH2APIheight = cash2APIData.network.height
    // CASH2APIDifficulty = cash2APIData.difficulty
    // CASH2APIheight = cash2APIData.height
    Cash2.childNodes[3].childNodes[1].innerHTML = getCash2BlockReward(CASH2APIheight).toFixed(4) + " CASH2"
    Cash2.childNodes[3].childNodes[3].innerHTML = numberWithCommas(CASH2APIheight)
    // Cash2.childNodes[5].childNodes[1].innerHTML = hashrateShortner(cash2APIData.hashrate)
    Cash2.childNodes[5].childNodes[3].innerHTML = hashrateShortner(CASH2APIDifficulty * 1099511627776)
    apiLoadVerify()
}).catch(function (error) {
    console.log(error);
    cash2APILoad = false;
    APIError("Cash2 Data");
    APILoaded -= 1;
})


//Load's Cash2 price API
let cash2PriceAPIData
loadAPI(cash2PriceAPI).then(data => {
    cash2PriceAPIData = data
    cash2PriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
}).catch(function (error) {
    console.log(error);
    cash2PriceAPILoad = false;
    APIError("Cash2 Price");
    APILoaded -= 1;
})

//Load's Sia price API
let siaPriceAPIData
loadAPI(siaPriceAPI).then(data => {
    siaPriceAPIData = data
    siaPriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
}).catch(function (error) {
    console.log(error);
    siaPriceAPILoad = false;
    APIError("Sia Price");
    APILoaded -= 1;
})

//Load's Hyperspace price API
let hyperPriceAPIData
loadAPI(hyperPriceAPI).then(data => {
    hyperPriceAPIData = data
    hyperPriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
}).catch(function (error) {
    console.log(error);
    hyperPriceAPILoad = false;
    APIError("Hyperspace Price");
    APILoaded -= 1;
})

//Load's ScPrime price API
let primePriceAPIData
loadAPI(primePriceAPI).then(data => {
    primePriceAPIData = data
    primePriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
}).catch(function (error) {
    console.log(error);
    primePriceAPILoad = false;
    APIError("ScPrime Price");
    APILoaded -= 1;
})

//Load's SiaClassic price API
let classicPriceAPIData
loadAPI(classicPriceAPI).then(data => {
    classicPriceAPIData = data
    classicPriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
}).catch(function (error) {
    console.log(error);
    classicPriceAPILoad = false;
    APIError("SiaClassic Price");
    APILoaded -= 1;
})

//Load's Bitcoin price API
let btcPriceAPIData
loadAPI(btcPriceAPI).then(data => {
    btcPriceAPIData = data
    bitcoinUSDPrice = data.prices[btcPriceAPIData.prices.length - 1][1]
    btcPriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
}).catch(function (error) {
    console.log(error);
    btcPriceAPILoad = false;
    APIError("Bitcoin Price");
    APILoaded -= 1;
})

// Set's coin volume
async function coinVolume(data, currency) {
    var color
    var notification
    data = Math.round((data.total_volumes[data.total_volumes.length - 1][1]) * 100) / 100

    if (data <= 500) {
        color = redColor
        notification = "Very Low Volume"
    } else if (data <= 1000) {
        color = yellowColor
        notification = "Low Volume"
    } else {
        color = greenColor
    }

    if (currency == "USD") {
        return { volume: "$" + numberWithCommas(data).toString(), textColor: color, warning: notification }
    } else {
        return { volume: (data / bitcoinUSDPrice).toFixed(8).toString() + " BTC", textColor: color, warning: notification }
    }
}

async function coinMarket(data, currency) {
    let marketCap = Math.round((data.market_caps[data.market_caps.length - 1][1]) * 100) / 100
    let exchangeRate = data.prices[data.prices.length - 1][1].toFixed(8)

    if (currency == "USD") {
        return { marketCap: "$" + numberWithCommas(marketCap).toString(), exchangeRate: "$" + exchangeRate.toString() }
    } else {
        return { marketCap: (marketCap / bitcoinUSDPrice).toFixed(8).toString() + " BTC", exchangeRate: (exchangeRate / bitcoinUSDPrice).toFixed(8).toString() + " BTC" }
    }
}


async function loadAPI(URL) {
    return await fetch(URL).then(res => res.json())
}

function apiLoadVerify() {
    if (APILoaded >= 8) {
        APIStatus.classList.add("apiActive");
        APIStatus.innerHTML = "Active"
    }
    if (APILoaded >= APINeeded) {
        console.log(APILoaded + " API's loaded")
        liveHashrate()
        presetUpdate()
        toggleCurrency()
    } else {
        console.log(APILoaded + " API's loaded")
    }
}

function liveHashrate() {

    userHshrt.value = splitInput(userHshrt.value)
    rejectRate.value = splitInput(rejectRate.value)
    poolFee.value = splitInput(poolFee.value)
    elecCost.value = splitInput(elecCost.value)
    powerConsumtion.value = splitInput(powerConsumtion.value)

    if (userHshrt.value == ".") {
        hshrt = 0
    }
    else {
        hshrt = userHshrt.value
    }

    if (rejectRate.value > 100) {
        rejectRate.value = 100
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

        prime()

        classic()

        sia()
    }

    if (cash2APILoad == true) {
        cash2()
    }



    if (currency == "USD") {
        PowerCostHourResult = (((powerConsumtion.value * 1) / 1000) * elecCost.value) * -1
        PowerCostDayResult = (((powerConsumtion.value * 24) / 1000) * elecCost.value) * -1
        PowerCostWeekResult = ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value) * -1
        PowerCostMonthResult = ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value) * -1
        PowerCostHourDay.innerHTML = numberShortener(PowerCostHourResult) + " | " + numberShortener(PowerCostDayResult)
        PowerCostWeekMonth.innerHTML = numberShortener(PowerCostWeekResult) + " | " + numberShortener(PowerCostMonthResult)
    } else if (currency == "BTC") {
        PowerCostHourResult = (((((powerConsumtion.value * 1) / 1000) * elecCost.value) * -1) / bitcoinUSDPrice).toFixed(8)
        PowerCostDayResult = (((((powerConsumtion.value * 24) / 1000) * elecCost.value) * -1) / bitcoinUSDPrice).toFixed(8)
        PowerCostWeekResult = ((((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value) * -1) / bitcoinUSDPrice).toFixed(8)
        PowerCostMonthResult = ((((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value) * -1) / bitcoinUSDPrice).toFixed(8)
        PowerCostHourDay.innerHTML = PowerCostHourResult + " | " + PowerCostDayResult
        PowerCostWeekMonth.innerHTML = PowerCostWeekResult + " | " + PowerCostMonthResult
    }
    if (PowerCostHourResult < 0) {
        PowerCostHourDay.style.color = yellowColor
        PowerCostWeekMonth.style.color = yellowColor
    } else {
        PowerCostHourDay.style.color = "white"
        PowerCostWeekMonth.style.color = "white"
    }
}

function clearPreset() {
    usingPreset = false

    A3.value = 0
    A3preset = 0

    Baik.value = 0
    Baikpreset = 0

    B52.value = 0
    B52presetPower = 0

    iBe.value = 0
    iBepreset = 0

    S11.value = 0
    S11preset = 0

    StrongU.value = 0
    StrongUpreset = 0

    SC1.value = 0
    SC1preset = 0

    SC200.value = 0
    SC200preset = 0
}

rejectRate.value = 0
poolFee.value = 1
elecCost.value = 0.1

if (localStorage.getItem('mainData') == null) {
    S11.value = 1
} else {
    let data = localStorage.getItem('mainData')
    let newData = JSON.parse(data)
    userHshrt.value = newData.Hashrate
    hashPower.value = newData.HashPower
    diffToggle.checked = newData.DifficultyAdjust
    if (diffToggle.checked == true) {
        diffAdjust = true
    } else {
        diffAdjust = false
    }
    rejectRate.value = newData.RejectRate
    poolFee.value = newData.PoolFee
    elecCost.value = newData.ElectricityCost
    powerConsumtion.value = newData.PowerConsumption

    if (newData.A3 == undefined) {
        A3.value = 0
    } else {
        A3.value = newData.A3
    }

    if (newData.Baik == undefined) {
        Baik.value = 0
    } else {
        Baik.value = newData.Baik
    }

    if (newData.B52 == undefined) {
        B52.value = 0
    } else {
        B52.value = newData.B52
    }

    if (newData.iBe == undefined) {
        iBe.value = 0
    } else {
        iBe.value = newData.iBe
    }

    if (newData.S11 == undefined) {
        S11.value = 1
    } else {
        S11.value = newData.S11
    }

    if (newData.StrongU == undefined) {
        StrongU.value = 0
    } else {
        StrongU.value = newData.StrongU
    }

    if (newData.SC1 == undefined) {
        SC1.value = 0
    } else {
        SC1.value = newData.SC1
    }

    if (newData.SC200 == undefined) {
        SC200.value = 0
    } else {
        SC200.value = newData.SC200
    }

}


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

function calcDiff() {
    if (diffToggle.checked) {
        diffAdjust = true
        liveHashrate()
    } else {
        diffAdjust = false
        liveHashrate()
    }
}

const currencyToggleSwitch = document.getElementById("currencyToggleSwitch")
let currency
const currencyText = document.getElementsByClassName("currencyText")
const resultTableInfo = document.getElementById("resultTableInfo")
const powerCostText = document.getElementById("powerCostText")

function toggleCurrency() {
    if (currencyToggleSwitch.checked) { //BTC
        currency = "BTC"
        resultTableInfo.childNodes[11].childNodes[1].innerHTML = "Income (BTC)"
        resultTableInfo.childNodes[13].childNodes[1].innerHTML = "Profit (BTC)"
        liveHashrate()
    } else { //USD
        currency = "USD"
        resultTableInfo.childNodes[11].childNodes[1].innerHTML = "Income (USD)"
        resultTableInfo.childNodes[13].childNodes[1].innerHTML = "Profit (USD)"
        liveHashrate()
    }

    for (i = 0; i < currencyText.length; i++) {
        currencyText[i].innerHTML = currency
    }

    // Sia
    coinVolume(siaPriceAPIData, currency).then(data => {
        SiaVolumeValue.innerHTML = data.volume
        SiaVolumeValue.style.color = data.textColor
        if (data.warning) {
            SiaVolumeValue.className = "warningPopup"
        }
    })

    coinMarket(siaPriceAPIData, currency).then(data => {
        SiaPriceValue.innerHTML = data.exchangeRate
        SiaMarketCapValue.innerHTML = data.marketCap
    })

    // SCP
    coinVolume(primePriceAPIData, currency).then(data => {
        SCPVolumeValue.innerHTML = data.volume
        SCPVolumeValue.style.color = data.textColor
        if (data.warning) {
            SCPVolumeValue.className = "warningPopup"
        }
    })

    coinMarket(primePriceAPIData, currency).then(data => {
        SCPPriceValue.innerHTML = data.exchangeRate
        SCPMarketCapValue.innerHTML = data.marketCap
    })

    // Cash2
    coinVolume(cash2PriceAPIData, currency).then(data => {
        Cash2VolumeValue.innerHTML = data.volume
        Cash2VolumeValue.style.color = data.textColor
        if (data.warning) {
            Cash2VolumeValue.className = "warningPopup"
        }
    })

    coinMarket(cash2PriceAPIData, currency).then(data => {
        Cash2PriceValue.innerHTML = data.exchangeRate
        Cash2MarketCapValue.innerHTML = data.marketCap
    })

    // XSC
    coinVolume(hyperPriceAPIData, currency).then(data => {
        XSCVolumeValue.innerHTML = data.volume
        XSCVolumeValue.style.color = data.textColor
        if (data.warning) {
            XSCVolumeValue.className = "warningPopup"
        }

    })

    coinMarket(hyperPriceAPIData, currency).then(data => {
        XSCPriceValue.innerHTML = data.exchangeRate
        XSCMarketCapValue.innerHTML = data.marketCap
    })

    // SCC
    coinVolume(classicPriceAPIData, currency).then(data => {
        SCCVolumeValue.innerHTML = data.volume
        SCCVolumeValue.style.color = data.textColor
        if (data.warning) {
            SCCVolumeValue.className = "warningPopup"
        }
    })

    coinMarket(classicPriceAPIData, currency).then(data => {
        SCCPriceValue.innerHTML = data.exchangeRate
        if (data.marketCap == "$0" || data.marketCap == "0.00000000 BTC") {
            SCCMarketCapValue.innerHTML = "Not Available"
            SCCMarketCapValue.style.color = redColor
        } else {
            SCCMarketCapValue.innerHTML = data.marketCap
        }
    })


}



function sia() {

    if (usingPreset == true) {
        siaHourresult = siaReward(siaAPIDifficulty, totalSiaHashrate * 1e9, siaAPIheight, hour)
        siaDayresult = siaReward(siaAPIDifficulty, totalSiaHashrate * 1e9, siaAPIheight, day)
        siaWeekresult = siaReward(siaAPIDifficulty, totalSiaHashrate * 1e9, siaAPIheight, week)
        siaMonthresult = siaReward(siaAPIDifficulty, totalSiaHashrate * 1e9, siaAPIheight, month)
    } else {
        siaHourresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, hour)
        siaDayresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, day)
        siaWeekresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, week)
        siaMonthresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, month)
    }

    if (siaPriceAPILoad == true) {
        siaUSDHourresult = setCurrency(siaHourresult, siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1])
        siaUSDDayresult = setCurrency(siaDayresult, siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1])
        siaUSDWeekresult = setCurrency(siaWeekresult, siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1])
        siaUSDMonthresult = setCurrency(siaMonthresult, siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1])
    }

    SiacalcHourDay.innerHTML = numberShortener(feeCalc(rejectCalc(siaHourresult)), true) + " | " + numberShortener(feeCalc(rejectCalc(siaDayresult)), true)
    SiacalcWeekMonth.innerHTML = numberShortener(feeCalc(rejectCalc(siaWeekresult)), true) + " | " + numberShortener(feeCalc(rejectCalc(siaMonthresult)), true)

    SiacalcHourDayUSD.innerHTML = numberShortener(rejectCalc(feeCalc(siaUSDHourresult))) + " | " + numberShortener(rejectCalc(feeCalc(siaUSDDayresult)))
    SiacalcWeekMonthUSD.innerHTML = numberShortener(rejectCalc(feeCalc(siaUSDWeekresult))) + " | " + numberShortener(rejectCalc(feeCalc(siaUSDMonthresult)))

    SiaresultHourDayProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcObelisk(siaUSDHourresult, 1, 1), SiaresultHourDayProfitUSD))) + " | " + numberShortener(rejectCalc(colorProfit(feeCalcObelisk(siaUSDDayresult, 24, 1), SiaresultHourDayProfitUSD)))
    SiaresultWeekMonthProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcObelisk(siaUSDWeekresult, 24, 7), SiaresultWeekMonthProfitUSD))) + " | " + numberShortener(rejectCalc(colorProfit(feeCalcObelisk(siaUSDMonthresult, 24, 30), SiaresultWeekMonthProfitUSD)))


    function siaReward(difficulty, hashrate, height, period) {
        if (diffAdjust) {
            return (hashrate / ((difficulty + hashrate * siaBlockTime) / siaBlockTime)) * ((300000 - height - ((period / siaBlockTime) / 2)) * (period / siaBlockTime));
        } else {
            return (hashrate / (difficulty / siaBlockTime)) * ((300000 - height - ((period / siaBlockTime) / 2)) * (period / siaBlockTime));
        }
    }
}

function hyper() {

    hyperHourresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, hour)
    hyperDayresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, day)
    hyperWeekresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, week)
    hyperMonthresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, month)

    if (hyperPriceAPILoad == true) {
        hyperUSDHourresult = setCurrency(hyperHourresult, hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1])
        hyperUSDDayresult = setCurrency(hyperDayresult, hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1])
        hyperUSDWeekresult = setCurrency(hyperWeekresult, hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1])
        hyperUSDMonthresult = setCurrency(hyperMonthresult, hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1])
    }

    XSCcalcHourDay.innerHTML = numberShortener(feeCalc(rejectCalc(hyperHourresult)), true) + " | " + numberShortener(feeCalc(rejectCalc(hyperDayresult)), true)
    XSCcalcWeekMonth.innerHTML = numberShortener(feeCalc(rejectCalc(hyperWeekresult)), true) + " | " + numberShortener(feeCalc(rejectCalc(hyperMonthresult)), true)

    XSCcalcHourDayUSD.innerHTML = numberShortener(rejectCalc(feeCalc(hyperUSDHourresult))) + " | " + numberShortener(rejectCalc(feeCalc(hyperUSDDayresult)))
    XSCcalcWeekMonthUSD.innerHTML = numberShortener(rejectCalc(feeCalc(hyperUSDWeekresult))) + " | " + numberShortener(rejectCalc(feeCalc(hyperUSDMonthresult)))

    XSCresultHourDayProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(hyperUSDHourresult, 1, 1), XSCresultHourDayProfitUSD))) + " | " + numberShortener(rejectCalc(colorProfit(feeCalcUSD(hyperUSDDayresult, 24, 1), XSCresultHourDayProfitUSD)))
    XSCresultWeekMonthProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(hyperUSDWeekresult, 24, 7), XSCresultWeekMonthProfitUSD))) + " | " + numberShortener(rejectCalc(colorProfit(feeCalcUSD(hyperUSDMonthresult, 24, 30), XSCresultWeekMonthProfitUSD)))

    function hyperReward(difficulty, hashrate, height, period) {
        if (diffAdjust) {
            return (hashrate / ((difficulty + hshrt * hyperBlockTime) / hyperBlockTime)) * ((60000 - (height * 0.2) - ((period / hyperBlockTime) / 2)) * (period / hyperBlockTime)) * 0.9;
        } else {
            return (hashrate / (difficulty / hyperBlockTime)) * ((60000 - (height * 0.2) - ((period / hyperBlockTime) / 2)) * (period / hyperBlockTime)) * 0.9;
        }
    }

}


function classic() {

    sccHourresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, hour)
    sccDayresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, day)
    sccWeekresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, week)
    sccMonthresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, month)

    if (classicPriceAPILoad == true) {
        sccUSDHourresult = setCurrency(sccHourresult, classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1])
        sccUSDDayresult = setCurrency(sccDayresult, classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1])
        sccUSDWeekresult = setCurrency(sccWeekresult, classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1])
        sccUSDMonthresult = setCurrency(sccMonthresult, classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1])
    }

    SCCcalcHourDay.innerHTML = numberShortener(feeCalc(rejectCalc(sccHourresult)), true) + " | " + numberShortener(feeCalc(rejectCalc(sccDayresult)), true)
    SCCcalcWeekMonth.innerHTML = numberShortener(feeCalc(rejectCalc(sccWeekresult)), true) + " | " + numberShortener(feeCalc(rejectCalc(sccMonthresult)), true)

    SCCcalcHourDayUSD.innerHTML = numberShortener(rejectCalc(feeCalc(sccUSDHourresult))) + " | " + numberShortener(rejectCalc(feeCalc(sccUSDDayresult)))
    SCCcalcWeekMonthUSD.innerHTML = numberShortener(rejectCalc(feeCalc(sccUSDWeekresult))) + " | " + numberShortener(rejectCalc(feeCalc(sccUSDMonthresult)))

    SCCresultHourDayProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(sccUSDHourresult, 1, 1), SCCresultHourDayProfitUSD))) + " | " + numberShortener(rejectCalc(colorProfit(feeCalcUSD(sccUSDDayresult, 24, 1), SCCresultHourDayProfitUSD)))
    SCCresultWeekMonthProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(sccUSDWeekresult, 24, 7), SCCresultWeekMonthProfitUSD))) + " | " + numberShortener(rejectCalc(colorProfit(feeCalcUSD(sccUSDMonthresult, 24, 30), SCCresultWeekMonthProfitUSD)))

    function classicReward(difficulty, hashrate, height, period) {
        if (diffAdjust) {
            return (hashrate / ((difficulty + hshrt * classicBlockTime) / classicBlockTime)) * ((300000 - height - ((period / classicBlockTime) / 2)) * (period / classicBlockTime));
        } else {
            return (hashrate / (difficulty / classicBlockTime)) * ((300000 - height - ((period / classicBlockTime) / 2)) * (period / classicBlockTime));
        }
    }
}

function prime() {

    primeHourresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, hour)
    primeDayresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, day)
    primeWeekresult = primeDayresult * 7 //primeReward(primeAPIDifficulty, hshrt, primeAPIheight, week)
    primeMonthresult = primeDayresult * 30 //primeReward(primeAPIDifficulty, hshrt, primeAPIheight, month)

    if (primePriceAPILoad == true) {
        primeUSDHourresult = setCurrency(primeHourresult, primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1])
        primeUSDDayresult = setCurrency(primeDayresult, primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1])
        primeUSDWeekresult = setCurrency(primeWeekresult, primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1])
        primeUSDMonthresult = setCurrency(primeMonthresult, primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1])
    }

    SCPcalcHourDay.innerHTML = numberShortener(feeCalc(rejectCalc(primeHourresult)), true) + " | " + numberShortener(feeCalc(rejectCalc(primeDayresult)), true)
    SCPcalcWeekMonth.innerHTML = numberShortener(feeCalc(rejectCalc(primeWeekresult)), true) + " | " + numberShortener(feeCalc(rejectCalc(primeMonthresult)), true)

    SCPcalcHourDayUSD.innerHTML = numberShortener(rejectCalc(feeCalc(primeUSDHourresult))) + " | " + numberShortener(rejectCalc(feeCalc(primeUSDDayresult)))
    SCPcalcWeekMonthUSD.innerHTML = numberShortener(rejectCalc(feeCalc(primeUSDWeekresult))) + " | " + numberShortener(rejectCalc(feeCalc(primeUSDMonthresult)))

    SCPresultHourDayProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(primeUSDHourresult, 1, 1), SCPresultHourDayProfitUSD))) + " | " + numberShortener(rejectCalc(colorProfit(feeCalcUSD(primeUSDDayresult, 24, 1), SCPresultHourDayProfitUSD)))
    SCPresultWeekMonthProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(primeUSDWeekresult, 24, 7), SCPresultWeekMonthProfitUSD))) + " | " + numberShortener(rejectCalc(colorProfit(feeCalcUSD(primeUSDMonthresult, 24, 30), SCPresultWeekMonthProfitUSD)))

    function primeReward(difficulty, hashrate, height, period) {
        if (diffAdjust) {
            return (hashrate / ((difficulty + hshrt * primeBlockTime) / primeBlockTime)) * ((300 - height / 1000 - ((period / primeBlockTime) / 2000)) * (period / primeBlockTime) * (1 - SCPDevFee));
        } else {
            return (hashrate / (difficulty / primeBlockTime)) * ((300 - height / 1000 - ((period / primeBlockTime) / 2000)) * (period / primeBlockTime) * (1 - SCPDevFee));
        }
    }
}

function cash2() {

    if (usingPreset == true) {
        Cash2Hourresult = cash2Reward(CASH2APIDifficulty, hshrt * 0.72, CASH2APIheight, hour)
        Cash2Dayresult = cash2Reward(CASH2APIDifficulty, hshrt * 0.72, CASH2APIheight, day)
        Cash2Weekresult = cash2Reward(CASH2APIDifficulty, hshrt * 0.72, CASH2APIheight, week)
        Cash2Monthresult = cash2Reward(CASH2APIDifficulty, hshrt * 0.72, CASH2APIheight, month)
    } else {
        Cash2Hourresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, hour)
        Cash2Dayresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, day)
        Cash2Weekresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, week)
        Cash2Monthresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, month)
    }

    if (cash2PriceAPILoad == true) {
        Cash2USDHourresult = setCurrency(Cash2Hourresult, cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1])
        Cash2USDDayresult = setCurrency(Cash2Dayresult, cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1])
        Cash2USDWeekresult = setCurrency(Cash2Weekresult, cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1])
        Cash2USDMonthresult = setCurrency(Cash2Monthresult, cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1])
    }

    Cash2calcHourDay.innerHTML = numberShortener(feeCalc(rejectCalc(Cash2Hourresult)), true) + " | " + numberShortener(feeCalc(rejectCalc(Cash2Dayresult)), true)
    Cash2calcWeekMonth.innerHTML = numberShortener(feeCalc(rejectCalc(Cash2Weekresult)), true) + " | " + numberShortener(feeCalc(rejectCalc(Cash2Monthresult)), true)

    Cash2calcHourDayUSD.innerHTML = numberShortener(rejectCalc(feeCalc(Cash2USDHourresult))) + " | " + numberShortener(rejectCalc(feeCalc(Cash2USDDayresult)))
    Cash2calcWeekMonthUSD.innerHTML = numberShortener(rejectCalc(feeCalc(Cash2USDWeekresult))) + " | " + numberShortener(rejectCalc(feeCalc(Cash2USDMonthresult)))

    Cash2resultHourDayProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(Cash2USDHourresult, 1, 1), Cash2resultHourDayProfitUSD))) + " | " + numberShortener(rejectCalc(colorProfit(feeCalcUSD(Cash2USDDayresult, 24, 1), Cash2resultHourDayProfitUSD)))
    Cash2resultWeekMonthProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(Cash2USDWeekresult, 24, 7), Cash2resultWeekMonthProfitUSD))) + " | " + numberShortener(rejectCalc(colorProfit(feeCalcUSD(Cash2USDMonthresult, 24, 30), Cash2resultWeekMonthProfitUSD)))



    function cash2Reward(difficulty, hashrate, height, period) {
        if (diffAdjust) {
            return (hashrate / (((difficulty * 1099511627776) + hshrt * cash2BlockTime) / cash2BlockTime)) * ((getCash2BlockReward(height + ((period / cash2BlockTime) / 2))) * (period / cash2BlockTime))
        } else {
            return (hashrate / ((difficulty * 1099511627776) / cash2BlockTime)) * ((getCash2BlockReward(height + ((period / cash2BlockTime) / 2))) * (period / cash2BlockTime))
        }
    }
}

function getCash2BlockReward(height) {
    let alreadyGeneratedCoins = 0;

    for (let i = 0; i < height; i++) {
        alreadyGeneratedCoins += (15000000 - alreadyGeneratedCoins) / 16777216;
    }

    return (15000000 - alreadyGeneratedCoins) / 16777216;
}

//Currency Calculation
function setCurrency(coinAmount, coinUSDPrice) {
    if (currency == "USD") {
        try {
            return coinAmount * coinUSDPrice
        } catch (error) {
            console.log(error)
        }
    } else if (currency == "BTC") {
        try {
            return (coinAmount * coinUSDPrice) / bitcoinUSDPrice
        } catch (error) {
            console.log(error)
        }
    }
}

function presetUpdate() {
    A3.value = A3.value.replace(/[^1234567890]/g, "")
    Baik.value = Baik.value.replace(/[^1234567890]/g, "")
    B52.value = B52.value.replace(/[^1234567890]/g, "")
    iBe.value = iBe.value.replace(/[^1234567890]/g, "")
    S11.value = S11.value.replace(/[^1234567890]/g, "")
    SC1.value = SC1.value.replace(/[^1234567890]/g, "")
    SC200.value = SC200.value.replace(/[^1234567890]/g, "")
    StrongU.value = StrongU.value.replace(/[^1234567890]/g, "")

    A3preset = A3.value
    Baikpreset = Baik.value
    B52preset = B52.value
    iBepreset = iBe.value
    S11preset = S11.value
    SC1preset = SC1.value
    SC200preset = SC200.value
    StrongUpreset = StrongU.value

    //Antminer A3
    if (A3preset >= 1 && A3preset < 999) {
        A3presetFinal = 815 * A3preset
        A3presetPower = 1275 * A3preset
    }
    else if (A3preset >= 999) {
        A3.value = 999
        A3presetFinal = 815 * 999
        A3presetPower = 1275 * 999
    }
    else if (A3preset <= 0) {
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
        BaikpresetFinal = 160 * 999
        BaikpresetPower = 410 * 999
    }
    else if (Baikpreset <= 0) {
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
        B52presetFinal = 3830 * 999
        B52presetPower = 1380 * 999
    }
    else if (B52preset <= 0) {
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
        iBepresetFinal = 7000 * 999
        iBepresetPower = 2100 * 999
    }
    else if (iBepreset <= 0) {
        iBepresetFinal = 0
        iBepresetPower = 0
    }

    //Innosilicon S11
    if (S11preset >= 1 && S11preset < 999) {
        S11presetFinal = 4300 * S11preset
        S11presetPower = 1350 * S11preset
    }
    else if (S11preset >= 999) {
        S11.value = 999
        S11presetFinal = 4300 * 999
        S11presetPower = 1350 * 999
    }
    else if (S11preset <= 0) {
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
        SC1presetFinal = 550 * 999
        SC1presetPower = 500 * 999
    }
    else if (SC1preset <= 0) {
        SC1presetFinal = 0
        SC1presetPower = 0
    }

    //ePic SC200
    if (SC200preset >= 1 && SC200preset < 999) {
        SC200presetFinal = 2200 * SC200preset
        SC200presetPower = 1300 * SC200preset
    }
    else if (SC200preset >= 999) {
        SC200.value = 999
        SC200presetFinal = 2200 * 999
        SC200presetPower = 1300 * 999
    }
    else if (SC200preset <= 0) {
        SC200presetFinal = 0
        SC200presetPower = 0
    }

    //StrongU STU-U2
    if (StrongUpreset >= 1 && StrongUpreset < 999) {
        StrongUpresetFinal = 6000 * StrongUpreset
        StrongUpresetPower = 1600 * StrongUpreset
    }
    else if (StrongUpreset >= 999) {
        StrongU.value = 999
        StrongUpresetFinal = 6000 * 999
        StrongUpresetPower = 1600 * 999
    }
    else if (StrongUpreset <= 0) {
        StrongUpresetFinal = 0
        StrongUpresetPower = 0
    }

    totalBlake2bHashrate = A3presetFinal + BaikpresetFinal + B52presetFinal + iBepresetFinal + S11presetFinal + StrongUpresetFinal
    totalSiaHashrate = SC1presetFinal + SC200presetFinal

    totalPresetHashrate = totalBlake2bHashrate + totalSiaHashrate

    if (totalPresetHashrate >= 1000) {
        totalPresetHashrate = totalPresetHashrate / 1000
        hashPower.selectedIndex = 1
    }
    else {
        hashPower.selectedIndex = 0
    }

    totalBlake2bPower = A3presetPower + BaikpresetPower + B52presetPower + iBepresetPower + S11presetPower + StrongUpresetPower
    totalSiaPower = SC1presetPower + SC200presetPower
    totalPresetPower = totalSiaPower + totalBlake2bPower
    userHshrt.value = totalPresetHashrate.toFixed(2)
    powerConsumtion.value = totalPresetPower.toFixed(2)
    usingPreset = true
    liveHashrate()
}

function numberShortener(num, coin) {
    let tempNum
    if (currency == "USD" || coin == true) {
        if (num <= 999 && num >= 0) {
            tempNum = num.toFixed(2)
        }
        else if (num >= 1000 && num < 1000000) {
            tempNum = (num / 1000).toFixed(2) + " k"
        }
        else if (num >= 1000000 && num < 1000000000) {
            tempNum = (num / 1000000).toFixed(2) + " M"
        }
        else if (num >= 1000000000 && num < 99999999999) {
            tempNum = (num / 1000000000).toFixed(2) + " B"
        }
        else if (num >= 99999999999) {
            tempNum = 99.99 + "+ B"
        }
        else if (num >= -999 && num < 0) {
            tempNum = num.toFixed(2)
        }
        else if (num <= -1000 && num > -1000000) {
            tempNum = (num / 1000).toFixed(2) + " k"
        }
        else if (num <= 1000000 && num > -1000000000) {
            tempNum = (num / 1000000).toFixed(2) + " M"
        }
        else if (num <= -1000000000 && num > -99999999999) {
            tempNum = (num / 1000000000).toFixed(2) + " B"
        }
        else if (num <= -99999999999) {
            tempNum = -99.99 + "+ B"
        }
        else {
            tempNum = "0.00"
        }
    } else {
        if (num <= 999 && num >= 0) {
            tempNum = num.toFixed(6)
        }
        else if (num >= 1000 && num < 1000000) {
            tempNum = (num / 1000).toFixed(2) + " k"
        }
        else if (num >= 1000000 && num < 1000000000) {
            tempNum = (num / 1000000).toFixed(2) + " M"
        }
        else if (num >= 1000000000 && num < 99999999999) {
            tempNum = (num / 1000000000).toFixed(2) + " B"
        }
        else if (num >= 99999999999) {
            tempNum = 99.99 + "+ B"
        }
        else if (num >= -999 && num < 0) {
            tempNum = num.toFixed(6)
        }
        else if (num <= -1000 && num > -1000000) {
            tempNum = (num / 1000).toFixed(2) + " k"
        }
        else if (num <= 1000000 && num > -1000000000) {
            tempNum = (num / 1000000).toFixed(2) + " M"
        }
        else if (num <= -1000000000 && num > -99999999999) {
            tempNum = (num / 1000000000).toFixed(2) + " B"
        }
        else if (num <= -99999999999) {
            tempNum = -99.99 + "+ B"
        }
        else {
            tempNum = "0.00"
        }
    }
    return tempNum
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function hashrateShortner(num) {
    if (num > 1000000000000000000) {
        return numberWithCommas((num / 1000000000000000000).toFixed(3)) + " EH/s"
    } if (num > 1000000000000000) {
        return numberWithCommas((num / 1000000000000000).toFixed(3)) + " PH/s"
    } else {
        return numberWithCommas((num / 1000000000000).toFixed(3)) + " TH/s"
    }
}



function rejectCalc(coin) {
    if (rejectRate.value > 0) {
        return coin - (coin * (rejectRate.value / 100))
    } else {
        return coin
    }
}

function feeCalc(coin) {
    return coin - (coin * (poolFee.value / 100))
}

function feeCalcUSD(coin, time1, time2) {
    if (currency == "USD") {
        return (coin - (coin * (poolFee.value / 100))) - ((((powerConsumtion.value * time1) / 1000) * time2) * elecCost.value)
    } else if (currency == "BTC") {
        return (coin - (coin * (poolFee.value / 100))) - (((((powerConsumtion.value * time1) / 1000) * time2) * elecCost.value) / bitcoinUSDPrice)
    }
}

function feeCalcObelisk(coin, time1, time2) {
    if (currency == "USD") {
        return (coin - (coin * (poolFee.value / 100))) - ((((totalSiaPower * time1) / 1000) * time2) * elecCost.value)
    } else if (currency == "BTC") {
        return (coin - (coin * (poolFee.value / 100))) - (((((totalSiaPower * time1) / 1000) * time2) * elecCost.value) / bitcoinUSDPrice)
    }
}

function colorProfit(coin, coinHTML) {
    if (coin > 0) {
        coinHTML.style.color = greenColor
    } else {
        coinHTML.style.color = redColor
    }
    return coin
}


function saveData() {
    let data = { Hashrate: userHshrt.value, HashPower: hashPower.value, DifficultyAdjust: diffToggle.checked, RejectRate: rejectRate.value, PoolFee: poolFee.value, ElectricityCost: elecCost.value, PowerConsumption: powerConsumtion.value, A3: A3.value, Baik: Baik.value, B52: B52.value, iBe: iBe.value, S11: S11.value, StrongU: StrongU.value, SC1: SC1.value }
    let strData = JSON.stringify(data)
    localStorage.setItem('mainData', strData);
}

function deleteData() {
    localStorage.removeItem('mainData');
}
