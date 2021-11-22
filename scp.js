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

const primeBlockTime = 600;

const hour = 3600;
const day = hour * 24;
const week = day * 7;
const month = day * 30; // assume month = 30 days

// const miningAPI = "https://keops.cc/dbs/pansia_current.json";
const miningAPI = "https://keops.cc/dbs/pansia_current.json";
let mineAPILoad = false

const primePriceAPI = "https://api.coingecko.com/api/v3/coins/siaprime-coin/market_chart?vs_currency=usd&days=1"
let primePriceAPILoad = false

const btcPriceAPI = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
let btcPriceAPILoad = false
let bitcoinUSDPrice

const siaBlockTime = 600; // all time done in seconds

const siaPriceAPI = "https://api.coingecko.com/api/v3/coins/siacoin/market_chart?vs_currency=usd&days=1"
let siaPriceAPILoad = false

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

//Sia Prime dev fee calculation
let SCPBurnPercent = .10  // 10% of the coins are "burned"

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
let HS3se = presetMiners[8].childNodes[3]
let HS3 = presetMiners[9].childNodes[3]
let HS5 = presetMiners[10].childNodes[3]

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
let HS3sepreset = 0
let HS3preset = 0
let HS5preset = 0

let A3presetFinal = 0
let BaikpresetFinal = 0
let B52presetFinal = 0
let iBepresetFinal = 0
let S11presetFinal = 0
let SC1presetFinal = 0
let SC200presetFinal = 0
let StrongUpresetFinal = 0
let HS3sepresetFinal = 0
let HS3presetFinal = 0
let HS5presetFinal = 0

let A3presetPower = 0
let BaikpresetPower = 0
let B52presetPower = 0
let iBepresetPower = 0
let S11presetPower = 0
let SC1presetPower = 0
let SC200presetPower = 0
let StrongUpresetPower = 0
let HS3sepresetPower = 0
let HS3presetPower = 0
let HS5presetPower = 0

let APILoaded = 0
let APINeeded = 3
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

    // ScPrime
    primeAPIDifficulty = miningAPIData[2].difficulty
    primeAPIheight = miningAPIData[2].height
    SCP.childNodes[3].childNodes[1].innerHTML = numberWithCommas(miningAPIData[2].blockreward * .9 /*SCP burns 10% of the coins*/) + " SCP"
    SCP.childNodes[3].childNodes[3].innerHTML = numberWithCommas(primeAPIheight)
    SCP.childNodes[5].childNodes[1].innerHTML = hashrateShortner(miningAPIData[2].hashrate)
    SCP.childNodes[5].childNodes[3].innerHTML = hashrateShortner(primeAPIDifficulty)

    // Sia
    siaAPIDifficulty = miningAPIData[0].difficulty
    siaAPIheight = miningAPIData[0].height
    Sia.childNodes[3].childNodes[1].innerHTML = numberWithCommas(miningAPIData[0].blockreward) + " SC"
    Sia.childNodes[3].childNodes[3].innerHTML = numberWithCommas(siaAPIheight)
    Sia.childNodes[5].childNodes[1].innerHTML = hashrateShortner(miningAPIData[0].hashrate)
    Sia.childNodes[5].childNodes[3].innerHTML = hashrateShortner(siaAPIDifficulty)

    apiLoadVerify()
}).catch(function (error) {
    console.log(error);
    mineAPILoad = false;
    APIError("Mining Data");
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
    let color
    let notification
    if (data != undefined) {
        data = Math.round((data.total_volumes[data.total_volumes.length - 1][1]) * 100) / 100
    } else {
        data = 0
    }
    

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
    let marketCap = 0
    let exchangeRate = 0
    if (data != undefined) {
        marketCap = Math.round((data.market_caps[data.market_caps.length - 1][1]) * 100) / 100
        exchangeRate = data.prices[data.prices.length - 1][1].toFixed(8)
    }
    

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
    if (APILoaded >= 1) {
        APIStatus.classList.add("apiActive");
        APIStatus.innerHTML = "Active"
    }
        console.log(APILoaded + " API's loaded")
        liveHashrate()
        presetUpdate()
        toggleCurrency()

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
        prime()
        sia()
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
let currency = "USD"
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

    // Sia
    console.log(currency)
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
            return (hashrate / ((difficulty + hashrate * siaBlockTime) / siaBlockTime)) * (30000 * (period / siaBlockTime));
        } else {
            return (hashrate / (difficulty / siaBlockTime)) * (30000 * (period / siaBlockTime));
        }
    }
}

function prime() {

    primeHourresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, hour)
    
    primeDayresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, day)
    primeWeekresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, week)
    primeMonthresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, month)

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
            return (hashrate / ((difficulty + hshrt * primeBlockTime) / primeBlockTime)) * ((300 - height / 1000 - ((period / primeBlockTime) / 2000)) * (period / primeBlockTime) * (1 - SCPBurnPercent));
        } else {
            return (hashrate / (difficulty / primeBlockTime)) * ((300 - height / 1000 - ((period / primeBlockTime) / 2000)) * (period / primeBlockTime) * (1 - SCPBurnPercent));
        }
    }
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
    HS3se.value = HS3se.value.replace(/[^1234567890]/g, "")
    HS3.value = HS3.value.replace(/[^1234567890]/g, "")
    HS5.value = HS5.value.replace(/[^1234567890]/g, "")

    A3preset = A3.value
    Baikpreset = Baik.value
    B52preset = B52.value
    iBepreset = iBe.value
    S11preset = S11.value
    SC1preset = SC1.value
    SC200preset = SC200.value
    StrongUpreset = StrongU.value
    HS3sepreset = HS3se.value
    HS3preset = HS3.value
    HS5preset = HS5.value

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

    //Goldshell HS3-SE
    if (HS3sepreset >= 1 && HS3sepreset < 999) {
        HS3sepresetFinal = 1860 * HS3sepreset
        HS3sepresetPower = 500 * HS3sepreset
    }
    else if (HS3sepreset >= 999) {
        HS3se.value = 999
        HS3sepresetFinal = 1860 * 999
        HS3sepresetPower = 500 * 999
    }
    else if (HS3sepreset <= 0) {
        HS3sepresetFinal = 0
        HS3sepresetPower = 0
    }

    //Goldshell HS3
    if (HS3preset >= 1 && HS3preset < 999) {
        HS3presetFinal = 4000 * HS3preset
        HS3presetPower = 1000 * HS3preset
    }
    else if (HS3preset >= 999) {
        HS3.value = 999
        HS3presetFinal = 4000 * 999
        HS3presetPower = 1000 * 999
    }
    else if (HS3preset <= 0) {
        HS3presetFinal = 0
        HS3presetPower = 0
    }

    //Goldshell HS5
    if (HS5preset >= 1 && HS5preset < 999) {
        HS5presetFinal = 5400 * HS5preset
        HS5presetPower = 1500 * HS5preset
    }
    else if (HS5preset >= 999) {
        HS3.value = 999
        HS5presetFinal = 5400 * 999
        HS5presetPower = 1500 * 999
    }
    else if (HS5preset <= 0) {
        HS5presetFinal = 0
        HS5presetPower = 0
    }

    totalBlake2bHashrate = A3presetFinal + BaikpresetFinal + B52presetFinal + iBepresetFinal + S11presetFinal + StrongUpresetFinal
    totalSiaHashrate = SC1presetFinal + SC200presetFinal + HS3sepresetFinal + HS3presetFinal + HS5presetFinal

    totalPresetHashrate = totalBlake2bHashrate + totalSiaHashrate

    if (totalPresetHashrate >= 1000) {
        totalPresetHashrate = totalPresetHashrate / 1000
        hashPower.selectedIndex = 1
    }
    else {
        hashPower.selectedIndex = 0
    }

    totalBlake2bPower = A3presetPower + BaikpresetPower + B52presetPower + iBepresetPower + S11presetPower + StrongUpresetPower
    totalSiaPower = SC1presetPower + SC200presetPower + HS3sepresetPower + HS3presetPower + HS5presetPower
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
