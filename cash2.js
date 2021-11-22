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

// const cash2API = "https://blocks.cash2.org:8080/getinfo";
const cash2API = "https://www.cash2pool.us:8119/stats";
let cash2APILoad = false

const cash2PriceAPI = "https://api.coingecko.com/api/v3/coins/cash2/market_chart?vs_currency=usd&days=1"
let cash2PriceAPILoad = false

//Cash2
const Cash2 = document.getElementById("CASH2")

const cash2BlockTime = 9;

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

function APIError(API) {
    APIStatus.classList.add("apiError");
    APIStatus.classList.remove("apiActive")
    APIStatus.innerHTML = "Error"
    APIStatus.parentNode.setAttribute('data-value', "Error with loading " + API + " API");
}

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

//Load's Bitcoin price API

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
    if (APILoaded >= 7) {
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
