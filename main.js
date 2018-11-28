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
const hour = 3600;
const day = hour * 24;
const week = day * 7;
const month = day * 30; // assume month = 30 days

const miningAPI = "https://keops.cc/dbs/pansia_current.json";

const hyperPriceAPI = "https://api.coingecko.com/api/v3/coins/hyperspace/market_chart?vs_currency=usd&days=1"
const siaPriceAPI = "https://api.coingecko.com/api/v3/coins/siacoin/market_chart?vs_currency=usd&days=1"
const primePriceAPI = "" //Not on exchanges yet
const classicPriceAPI = "" //Wait for API to be on CoinGecko

let hshrt = 0

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

let hyperProfitHour
let hyperProfitDay
let hyperProfitWeek
let hyperProfitMonth

let hyperProfitHourFinal
let hyperProfitDayFinal
let hyperProfitWeekFinal
let hyperProfitMonthFinal

let hyperHourresult
let hyperHourFinal
let hyperDayresult
let hyperDayFinal
let hyperWeekresult
let hyperWeekFinal
let hyperMonthresult
let hyperMonthFinal

let hyperUSDHourresult
let hyperUSDHourFinal
let hyperUSDDayresult
let hyperUSDDayFinal
let hyperUSDWeekresult
let hyperUSDWeekFinal
let hyperUSDMonthresult
let hyperUSDMonthFinal

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

let primeProfitHour
let primeProfitDay
let primeProfitWeek
let primeProfitMonth

let primeProfitHourFinal
let primeProfitDayFinal
let primeProfitWeekFinal
let primeProfitMonthFinal

let primeHourresult
let primeHourFinal
let primeDayresult
let primeDayFinal
let primeWeekresult
let primeWeekFinal
let primeMonthresult
let primeMonthFinal

let primeUSDHourresult
let primeUSDHourFinal
let primeUSDDayresult
let primeUSDDayFinal
let primeUSDWeekresult
let primeUSDWeekFinal
let primeUSDMonthresult
let primeUSDMonthFinal

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

let classicProfitHour
let classicProfitDay
let classicProfitWeek
let classicProfitMonth

let classicProfitHourFinal
let classicProfitDayFinal
let classicProfitWeekFinal
let classicProfitMonthFinal

let sccHourresult
let sccHourFinal
let sccDayresult
let sccDayFinal
let sccWeekresult
let sccWeekFinal
let sccMonthresult
let sccMonthFinal

let sccUSDHourresult
let sccUSDHourFinal
let sccUSDDayresult
let sccUSDDayFinal
let sccUSDWeekresult
let sccUSDWeekFinal
let sccUSDMonthresult
let sccUSDMonthFinal

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

let siaProfitHour
let siaProfitDay
let siaProfitWeek
let siaProfitMonth

let siaProfitHourFinal
let siaProfitDayFinal
let siaProfitWeekFinal
let siaProfitMonthFinal

let siaHourresult
let siaHourFinal
let siaDayresult
let siaDayFinal
let siaWeekresult
let siaWeekFinal
let siaMonthresult
let siaMonthFinal

let siaUSDHourresult
let siaUSDHourFinal
let siaUSDDayresult
let siaUSDDayFinal
let siaUSDWeekresult
let siaUSDWeekFinal
let siaUSDMonthresult
let siaUSDMonthFinal

let siaFeeHour
let siaFeeDay
let siaFeeWeek
let siaFeeMonth

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

const donationAdd = document.getElementById("address")
function copyAdd() {
    donationAdd.select();
    document.execCommand("copy");
    alert("Copied the text: " + donationAdd.textContent);
}

function liveHashrate() {
    userHshrt.value = userHshrt.value.replace(/[^1234567890.]|\-/g, "")
    poolFee.value = poolFee.value.replace(/[^1234567890.]|\-/g, "")
    elecCost.value = elecCost.value.replace(/[^1234567890.]|\-/g, "")
    powerConsumtion.value = powerConsumtion.value.replace(/[^1234567890.]|\-/g, "")
    
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
    
    hyper()
    hyperPrice()
    prime()
    classic()
    sia()
    siaPrice()
    calcProfit()
}


let miningAPIData = 0
fetch(miningAPI)
    .then(function(response) {
    return response.json();
})
.then(function(myJson){
    miningAPIData = myJson
})
try {
    reloadAPI()
} catch (e) {
    reloadAPI()
}


let siaPriceAPIData
fetch(siaPriceAPI)
    .then(function(response) {
    return response.json();
})
.then(function(myJson){
    siaPriceAPIData = myJson
})
try {
    reloadAPI()
} catch (e) {
    reloadAPI()
}


let hyperPriceAPIData
fetch(hyperPriceAPI)
    .then(function(response) {
    return response.json();
})
.then(function(myJson){
    hyperPriceAPIData = myJson
})
try {
    reloadAPI()
} catch (e) {
    reloadAPI()
}


/*
let classicPriceAPIData
fetch(classicPriceAPI)
    .then(function(response) {
    return response.json();
})
.then(function(myJson){
    classicPriceAPIData = myJson
})
try {
    reloadAPI()
} catch (e) {
    reloadAPI()
}
*/

poolFee.value = 1
elecCost.value = 0.1
const randomHshrt = [[815, 1275], [4300, 1350], [550, 500]]
const randomizer = randomHshrt[Math.floor(Math.random()*randomHshrt.length)]
userHshrt.value = randomizer[0]
powerConsumtion.value = randomizer[1]

function reloadAPI() {
    
    fetch(miningAPI)
        .then(function(response) {
        return response.json();
    })
    .then(function(myJson){
        miningAPIData = myJson
    })
    .then("error", (err) => {
        console.log("Keops API error: " + err.message);
        reloadAPI()
    })
    
    fetch(siaPriceAPI)
        .then(function(response) {
        return response.json();
    })
    .then(function(myJson){
        siaPriceAPIData = myJson
    })
    .then("error", (err) => {
        console.log("Coingecko Sia API error: " + err.message);
        reloadAPI()
    })
    
    
    fetch(hyperPriceAPI)
        .then(function(response) {
        return response.json();
    })
    .then(function(myJson){
        hyperPriceAPIData = myJson
    })
    .then("error", (err) => {
        console.log("Coingecko Hyperspace API error: " + err.message);
        reloadAPI()
    })
    
    /*
    let classicPriceAPIData
    fetch(classicPriceAPI)
        .then(function(response) {
        return response.json();
    })
    .then(function(myJson){
        classicPriceAPIData = myJson
    })
    .then("error", (err) => {
        console.log("QBTC API error: " + err.message);
        reloadAPI()
    })
    */
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
   
        const siaAPIDifficulty = miningAPIData[0].difficulty;
        const siaAPIheight = miningAPIData[0].height;
        
        siaHourresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, hour)
        siaDayresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, day)
        siaWeekresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, week)
        siaMonthresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, month)
        
        siaProfitHour = siaHourresult
        siaProfitDay = siaDayresult
        siaProfitWeek = siaWeekresult
        siaProfitMonth = siaMonthresult
        
        //Hour
        if(siaHourresult <= 999 && siaHourresult >= 0) {
            siaHourFinal = siaHourresult.toFixed(2)
        }
        else if(siaHourresult >= 1000 && siaHourresult < 1000000) {
            siaHourFinal = (siaHourresult/1000).toFixed(2) + " k"
        }
        else if(siaHourresult >= 1000000 && siaHourresult < 1000000000) {
            siaHourFinal = (siaHourresult/1000000).toFixed(2) + " M"
        }
        else if(siaHourresult >= 1000000000 && siaHourresult < 99999999999) {
            siaHourFinal = (siaHourresult/1000000000).toFixed(2) + " B"
        }
        else if(siaHourresult >= 99999999999){
            siaHourFinal = 99.99 + "+ B"
        }
        else {
            siaHourFinal = "NaN"
        }
        
        

        //Day
        if(siaDayresult <= 999 && siaDayresult >= 0) {
            siaDayFinal = siaDayresult.toFixed(2)
        }
        else if(siaDayresult >= 1000 && siaDayresult < 1000000) {
            siaDayFinal = (siaDayresult/1000).toFixed(2) + " k"
        }
        else if(siaDayresult >= 1000000 && siaDayresult < 1000000000) {
            siaDayFinal = (siaDayresult/1000000).toFixed(2) + " M"
        }
        else if(siaDayresult >= 1000000000 && siaDayresult < 99999999999) {
            siaDayFinal = (siaDayresult/1000000000).toFixed(2) + " B"
        }
        else if(siaDayresult >= 99999999999){
            siaDayFinal = 99.99 + "+ B"
        }
        else {
            siaDayFinal = "NaN"
        }
        
        
        //Week
        if(siaWeekresult <= 999 && siaWeekresult >= 0) {
            siaWeekFinal = siaWeekresult.toFixed(2)
        }
        else if(siaWeekresult >= 1000 && siaWeekresult < 1000000) {
            siaWeekFinal = (siaWeekresult/1000).toFixed(2) + " k"
        }
        else if(siaWeekresult >= 1000000 && siaWeekresult < 1000000000) {
            siaWeekFinal = (siaWeekresult/1000000).toFixed(2) + " M"
        }
        else if(siaWeekresult >= 1000000000 && siaWeekresult < 99999999999) {
            siaWeekFinal = (siaWeekresult/1000000000).toFixed(2) + " B"
        }
        else if(siaWeekresult >= 99999999999){
            siaWeekFinal = 99.99 + "+ B"
        }
        else {
            siaWeekFinal = "NaN"
        }
        
        
        //Month
        if(siaMonthresult <= 999 && siaMonthresult >= 0) {
            siaMonthFinal = siaMonthresult.toFixed(2)
        }
        else if(siaMonthresult >= 1000 && siaMonthresult < 1000000) {
            siaMonthFinal = (siaMonthresult/1000).toFixed(2) + " k"
        }
        else if(siaMonthresult >= 1000000 && siaMonthresult < 1000000000) {
            siaMonthFinal = (siaMonthresult/1000000).toFixed(2) + " M"
        }
        else if(siaMonthresult >= 1000000000 && siaMonthresult < 99999999999) {
            siaMonthFinal = (siaMonthresult/1000000000).toFixed(2) + " B"
        }
        else if(siaMonthresult >= 99999999999){
            siaMonthFinal = 99.99 + "+ B"
        }
        else {
            siaMonthFinal = "NaN"
        }


        SiacalcHour.innerHTML = siaHourFinal
        SiacalcDay.innerHTML = siaDayFinal
        SiacalcWeek.innerHTML = siaWeekFinal
        SiacalcMonth.innerHTML = siaMonthFinal

function siaReward(difficulty, hashrate, height, period){
    return (hashrate/(difficulty/siaBlockTime)) * ((300000 - height - ((period/siaBlockTime)/2)) * (period/siaBlockTime));
}
}

function siaPrice() {

        siaUSDHourresult = siaProfitHour * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        siaUSDDayresult = siaProfitDay * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        siaUSDWeekresult = siaProfitWeek * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        siaUSDMonthresult = siaProfitMonth * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        
        //Hour
        if(siaUSDHourresult <= 999 && siaUSDHourresult >= 0) {
            siaUSDHourFinal = siaUSDHourresult.toFixed(2)
        }
        else if(siaUSDHourresult >= 1000 && siaUSDHourresult < 1000000) {
            siaUSDHourFinal = (siaUSDHourresult/1000).toFixed(2) + " k"
            
        }
        else if(siaUSDHourresult >= 1000000 && siaUSDHourresult < 1000000000) {
            siaUSDHourFinal = (siaUSDHourresult/1000000).toFixed(2) + " M"
        }
        else if(siaUSDHourresult >= 1000000000 && siaUSDHourresult < 99999999999) {
            siaUSDHourFinal = (siaUSDHourresult/1000000000).toFixed(2) + " B"
        }
        else if(siaUSDHourresult >= 99999999999){
            siaUSDHourFinal = 99.99 + "+ B"
        }
        else if(siaUSDHourresult >= -999 && siaUSDHourresult < 0) {
            siaUSDHourFinal = siaUSDHourresult.toFixed(2)
        }
        else if(siaUSDHourresult <= -1000 && siaUSDHourresult > -1000000) {
            siaUSDHourFinal = (siaUSDHourresult/1000).toFixed(2) + " k"
        }
        else if(siaUSDHourresult <= -1000000 && siaUSDHourresult > -1000000000) {
            siaUSDHourFinal = (siaUSDHourresult/1000000).toFixed(2) + " M"
        }
        else if(siaUSDHourresult <= -1000000000 && siaUSDHourresult > -99999999999) {
            siaUSDHourFinal = (siaUSDHourresult/1000000000).toFixed(2) + " B"
        }
        else if(siaUSDHourresult <= -99999999999){
            siaUSDHourFinal = -99.99 + "+ B"
        }
        else {
            siaUSDHourFinal = "NaN"
        }
        

        //Day
        if(siaUSDDayresult <= 999 && siaUSDDayresult >= 0) {
            siaUSDDayFinal = siaUSDDayresult.toFixed(2)
        }
        else if(siaUSDDayresult >= 1000 && siaUSDDayresult < 1000000) {
            siaUSDDayFinal = (siaUSDDayresult/1000).toFixed(2) + " k"
        }
        else if(siaUSDDayresult >= 1000000 && siaUSDDayresult < 1000000000) {
            siaUSDDayFinal = (siaUSDDayresult/1000000).toFixed(2) + " M"
        }
        else if(siaUSDDayresult >= 1000000000 && siaUSDDayresult < 99999999999) {
            siaUSDDayFinal = (siaUSDDayresult/1000000000).toFixed(2) + " B"
        }
        else if(siaUSDDayresult >= 99999999999){
            siaUSDDayFinal = 99.99 + "+ B"
        }
        else if(siaUSDDayresult >= -999 && siaUSDDayresult < 0) {
            siaUSDDayFinal = siaUSDDayresult.toFixed(2)
        }
        else if(siaUSDDayresult <= -1000 && siaUSDDayresult > -1000000) {
            siaUSDDayFinal = (siaUSDDayresult/1000).toFixed(2) + " k"
        }
        else if(siaUSDDayresult <= -1000000 && siaUSDDayresult > -1000000000) {
            siaUSDDayFinal = (siaUSDDayresult/1000000).toFixed(2) + " M"
        }
        else if(siaUSDDayresult <= -1000000000 && siaUSDDayresult > -99999999999) {
            siaUSDDayFinal = (siaUSDDayresult/1000000000).toFixed(2) + " B"
        }
        else if(siaUSDDayresult <= -99999999999){
            siaUSDDayFinal = -99.99 + "+ B"
        } 
        else {
            siaUSDDayFinal = "NaN"
        }
        
        
        //Week
        if(siaUSDWeekresult <= 999 && siaUSDWeekresult >= 0) {
            siaUSDWeekFinal = siaUSDWeekresult.toFixed(2)
        }
        else if(siaUSDWeekresult >= 1000 && siaUSDWeekresult < 1000000) {
            siaUSDWeekFinal = (siaUSDWeekresult/1000).toFixed(2) + " k"
        }
        else if(siaUSDWeekresult >= 1000000 && siaUSDWeekresult < 1000000000) {
            siaUSDWeekFinal = (siaUSDWeekresult/1000000).toFixed(2) + " M"
        }
        else if(siaUSDWeekresult >= 1000000000 && siaUSDWeekresult < 99999999999) {
            siaUSDWeekFinal = (siaUSDWeekresult/1000000000).toFixed(2) + " B"
        }
        else if(siaUSDWeekresult >= 99999999999){
            siaUSDWeekFinal = 99.99 + "+ B"
        }
        else if(siaUSDWeekresult >= -999 && siaUSDWeekresult < 0) {
            siaUSDWeekFinal = siaUSDWeekresult.toFixed(2)
        }
        else if(siaUSDWeekresult <= -1000 && siaUSDWeekresult > -1000000) {
            siaUSDWeekFinal = (siaUSDWeekresult/1000).toFixed(2) + " k"
        }
        else if(siaUSDWeekresult <= 1000000 && siaUSDWeekresult > -1000000000) {
            siaUSDWeekFinal = (siaUSDWeekresult/1000000).toFixed(2) + " M"
        }
        else if(siaUSDWeekresult <= -1000000000 && siaUSDWeekresult > -99999999999) {
            siaUSDWeekFinal = (siaUSDWeekresult/1000000000).toFixed(2) + " B"
        }
        else if(siaUSDWeekresult <= -99999999999){
            siaUSDWeekFinal = -99.99 + "+ B"
        }
        else {
            siaUSDWeekFinal = "NaN"
        }
        
        
        //Month
        if(siaUSDMonthresult <= 999 && siaUSDMonthresult >= 0) {
            siaUSDMonthFinal = siaUSDMonthresult.toFixed(2)
        }
        else if(siaUSDMonthresult >= 1000 && siaUSDMonthresult < 1000000) {
            siaUSDMonthFinal = (siaUSDMonthresult/1000).toFixed(2) + " k"
        }
        else if(siaUSDMonthresult >= 1000000 && siaUSDMonthresult < 1000000000) {
            siaUSDMonthFinal = (siaUSDMonthresult/1000000).toFixed(2) + " M"
        }
        else if(siaUSDMonthresult >= 1000000000 && siaUSDMonthresult < 99999999999) {
            siaUSDMonthFinal = (siaUSDMonthresult/1000000000).toFixed(2) + " B"
        }
        else if(siaUSDMonthresult >= 99999999999){
            siaUSDMonthFinal = 99.99 + "+ B"
        }
        else if(siaUSDMonthresult >= -999 && siaUSDMonthresult < 0) {
            siaUSDMonthFinal = siaUSDMonthresult.toFixed(2)
        }
        else if(siaUSDMonthresult <= -1000 && siaUSDMonthresult > -1000000) {
            siaUSDMonthFinal = (siaUSDMonthresult/1000).toFixed(2) + " k"
        }
        else if(siaUSDMonthresult <= -1000000 && siaUSDMonthresult > -1000000000) {
            siaUSDMonthFinal = (siaUSDMonthresult/1000000).toFixed(2) + " M"
        }
        else if(siaUSDMonthresult <= -1000000000 && siaUSDMonthresult > -99999999999) {
            siaUSDMonthFinal = (siaUSDMonthresult/1000000000).toFixed(2) + " B"
        }
        else if (siaUSDMonthresult <= -99999999999){
            siaUSDMonthFinal = -99.99 + "+ B"
        }
        else {
            siaUSDMonthFinal = "NaN"
        }

        
        SiacalcHourUSD.innerHTML = siaUSDHourFinal
        SiacalcDayUSD.innerHTML = siaUSDDayFinal
        SiacalcWeekUSD.innerHTML = siaUSDWeekFinal
        SiacalcMonthUSD.innerHTML = siaUSDMonthFinal
}

function siaPriceError() {
        SiacalcHourUSD.innerHTML = "Unable to load API"
        SiacalcDayUSD.innerHTML = "Try refreshring page or clearing cache"
        SiacalcWeekUSD.innerHTML = ""
        SiacalcMonthUSD.innerHTML = ""
}

function hyper(){
       
        const hyperAPIDifficulty = miningAPIData[1].difficulty
        const hyperAPIheight = miningAPIData[1].height;
        
        hyperHourresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, hour)
        hyperDayresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, day)
        hyperWeekresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, week)
        hyperMonthresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, month)
        
        hyperProfitHour = hyperHourresult
        hyperProfitDay = hyperDayresult
        hyperProfitWeek = hyperWeekresult
        hyperProfitMonth = hyperMonthresult
        
        //Hour
        if(hyperHourresult <= 999 && hyperHourresult >= 0) {
            hyperHourFinal = hyperHourresult.toFixed(2)
        }
        else if(hyperHourresult >= 1000 && hyperHourresult < 1000000) {
            hyperHourFinal = (hyperHourresult/1000).toFixed(2) + " k"
        }
        else if(hyperHourresult >= 1000000 && hyperHourresult < 1000000000) {
            hyperHourFinal = (hyperHourresult/1000000).toFixed(2) + " M"
        }
        else if(hyperHourresult >= 1000000000 && hyperHourresult < 99999999999) {
            hyperHourFinal = (hyperHourresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperHourresult >= 99999999999){
            hyperHourFinal = 99.99 + "+ B"
        }
        else {
            hyperHourFinal = "NaN"
        }

        //Day
        if(hyperDayresult <= 999 && hyperDayresult >= 0) {
            hyperDayFinal = hyperDayresult.toFixed(2)
        }
        else if(hyperDayresult >= 1000 && hyperDayresult < 1000000) {
            hyperDayFinal = (hyperDayresult/1000).toFixed(2) + " k"
        }
        else if(hyperDayresult >= 1000000 && hyperDayresult < 1000000000) {
            hyperDayFinal = (hyperDayresult/1000000).toFixed(2) + " M"
        }
        else if(hyperDayresult >= 1000000000 && hyperDayresult < 99999999999) {
            hyperDayFinal = (hyperDayresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperDayresult >= 99999999999){
            hyperDayFinal = 99.99 + "+ B"
        }
        else {
            hyperDayFinal = "NaN"
        }
        
        //Week
        if(hyperWeekresult <= 999 && hyperWeekresult >= 0) {
            hyperWeekFinal = hyperWeekresult.toFixed(2)
        }
        else if(hyperWeekresult >= 1000 && hyperWeekresult < 1000000) {
            hyperWeekFinal = (hyperWeekresult/1000).toFixed(2) + " k"
        }
        else if(hyperWeekresult >= 1000000 && hyperWeekresult < 1000000000) {
            hyperWeekFinal = (hyperWeekresult/1000000).toFixed(2) + " M"
        }
        else if(hyperWeekresult >= 1000000000 && hyperWeekresult < 99999999999) {
            hyperWeekFinal = (hyperWeekresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperWeekresult >= 99999999999){
            hyperWeekFinal = 99.99 + "+ B"
        }
        else {
            hyperWeekFinal = "NaN"
        }
        
        //Month
        if(hyperMonthresult <= 999 && hyperMonthresult >= 0) {
            hyperMonthFinal = hyperMonthresult.toFixed(2)
        }
        else if(hyperMonthresult >= 1000 && hyperMonthresult < 1000000) {
            hyperMonthFinal = (hyperMonthresult/1000).toFixed(2) + " k"
        }
        else if(hyperMonthresult >= 1000000 && hyperMonthresult < 1000000000) {
            hyperMonthFinal = (hyperMonthresult/1000000).toFixed(2) + " M"
        }
        else if(hyperMonthresult >= 1000000000 && hyperMonthresult < 99999999999) {
            hyperMonthFinal = (hyperMonthresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperMonthresult >= 99999999999){
            hyperMonthFinal = 99.99 + "+ B"
        }
        else {
            hyperMonthFinal = "NaN"
        }
        
        XSCcalcHour.innerHTML = hyperHourFinal
        XSCcalcDay.innerHTML = hyperDayFinal
        XSCcalcWeek.innerHTML = hyperWeekFinal
        XSCcalcMonth.innerHTML = hyperMonthFinal
    
function hyperReward(difficulty, hashrate, height, period){
    return (hashrate/(difficulty/hyperBlockTime)) * ((60000 - (height * 0.2) - ((period/hyperBlockTime)/2)) * (period/hyperBlockTime)) * 0.9;
}

    }
    
function hyperPrice() {
        
        hyperUSDHourresult = hyperProfitHour * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        hyperUSDDayresult = hyperProfitDay * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        hyperUSDWeekresult = hyperProfitWeek * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        hyperUSDMonthresult = hyperProfitMonth * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        
        //Hour
        if(hyperUSDHourresult <= 999 && hyperUSDHourresult >= 0) {
            hyperUSDHourFinal = hyperUSDHourresult.toFixed(2)
        }
        else if(hyperUSDHourresult >= 1000 && hyperUSDHourresult < 1000000) {
            hyperUSDHourFinal = (hyperUSDHourresult/1000).toFixed(2) + " k"
        }
        else if(hyperUSDHourresult >= 1000000 && hyperUSDHourresult < 1000000000) {
            hyperUSDHourFinal = (hyperUSDHourresult/1000000).toFixed(2) + " M"
        }
        else if(hyperUSDHourresult >= 1000000000 && hyperUSDHourresult < 99999999999) {
            hyperUSDHourFinal = (hyperUSDHourresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperUSDHourresult >= 99999999999){
            hyperUSDHourFinal = 99.99 + "+ B"
        }
        else {
            hyperUSDHourFinal = "NaN"
        }

        //Day
        if(hyperUSDDayresult <= 999 && hyperUSDDayresult >= 0) {
            hyperUSDDayFinal = hyperUSDDayresult.toFixed(2)
        }
        else if(hyperUSDDayresult >= 1000 && hyperUSDDayresult < 1000000) {
            hyperUSDDayFinal = (hyperUSDDayresult/1000).toFixed(2) + " k"
        }
        else if(hyperUSDDayresult >= 1000000 && hyperUSDDayresult < 1000000000) {
            hyperUSDDayFinal = (hyperUSDDayresult/1000000).toFixed(2) + " M"
        }
        else if(hyperUSDDayresult >= 1000000000 && hyperUSDDayresult < 99999999999) {
            hyperUSDDayFinal = (hyperUSDDayresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperUSDDayresult >= 99999999999){
            hyperUSDDayFinal = 99.99 + "+ B"
        }
        else {
            hyperUSDDayFinal = "NaN"
        }
        
        //Week
        if(hyperUSDWeekresult <= 999 && hyperUSDWeekresult >= 0) {
            hyperUSDWeekFinal = hyperUSDWeekresult.toFixed(2)
        }
        else if(hyperUSDWeekresult >= 1000 && hyperUSDWeekresult < 1000000) {
            hyperUSDWeekFinal = (hyperUSDWeekresult/1000).toFixed(2) + " k"
        }
        else if(hyperUSDWeekresult >= 1000000 && hyperUSDWeekresult < 1000000000) {
            hyperUSDWeekFinal = (hyperUSDWeekresult/1000000).toFixed(2) + " M"
        }
        else if(hyperUSDWeekresult >= 1000000000 && hyperUSDWeekresult < 99999999999) {
            hyperUSDWeekFinal = (hyperUSDWeekresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperUSDWeekresult >= 99999999999){
            hyperUSDWeekFinal = 99.99 + "+ B"
        }
        else {
            hyperUSDWeekFinal = "NaN"
        }
        
        //Month
        if(hyperUSDMonthresult <= 999 && hyperUSDMonthresult >= 0) {
            hyperUSDMonthFinal = hyperUSDMonthresult.toFixed(2)
        }
        else if(hyperUSDMonthresult >= 1000 && hyperUSDMonthresult < 1000000) {
            hyperUSDMonthFinal = (hyperUSDMonthresult/1000).toFixed(2) + " k"
        }
        else if(hyperUSDMonthresult >= 1000000 && hyperUSDMonthresult < 1000000000) {
            hyperUSDMonthFinal = (hyperUSDMonthresult/1000000).toFixed(2) + " M"
        }
        else if(hyperUSDMonthresult >= 1000000000 && hyperUSDMonthresult < 99999999999) {
            hyperUSDMonthFinal = (hyperUSDMonthresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperUSDMonthresult >= 99999999999){
            hyperUSDMonthFinal = 99.99 + "+ B"
        }
        else {
            hyperUSDMonthFinal = "NaN"
        }

        XSCcalcHourUSD.innerHTML = hyperUSDHourFinal
        XSCcalcDayUSD.innerHTML = hyperUSDDayFinal
        XSCcalcWeekUSD.innerHTML = hyperUSDWeekFinal
        XSCcalcMonthUSD.innerHTML = hyperUSDMonthFinal
}

function hyperPriceError() {
        XSCcalcHourUSD.innerHTML = "Unable to load API"
        XSCcalcDayUSD.innerHTML = "Try refreshring page"
        XSCcalcWeekUSD.innerHTML = "or clearing cache"
        XSCcalcMonthUSD.innerHTML = ""
}

function classic(){ // having trouble calling API at https://classic.siamining.com/api/v1/network

        const classicAPIDifficulty = miningAPIData[3].difficulty;
        const classicAPIheight = miningAPIData[3].height;
        
        sccHourresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, hour)
        sccDayresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, day)
        sccWeekresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, week)
        sccMonthresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, month)
        
        
        //Hour
        if(sccHourresult <= 999) {
            sccHourFinal = sccHourresult.toFixed(2)
        }
        else if(sccHourresult >= 1000 && sccHourresult < 1000000) {
            sccHourFinal = (sccHourresult/1000).toFixed(2) + " k"
        }
        else if(sccHourresult >= 1000000 && sccHourresult < 1000000000) {
            sccHourFinal = (sccHourresult/1000000).toFixed(2) + " M"
        }
        else if(sccHourresult >= 1000000000 && sccHourresult < 99999999999) {
            sccHourFinal = (sccHourresult/1000000000).toFixed(2) + " B"
        }
        else if(sccHourresult >= 99999999999){
            sccHourFinal = 99.99 + "+ B"
        }
        else {
            sccHourFinal = "NaN"
        }

        //Day
        if(sccDayresult <= 999) {
            sccDayFinal = sccDayresult.toFixed(2)
        }
        else if(sccDayresult >= 1000 && sccDayresult < 1000000) {
            sccDayFinal = (sccDayresult/1000).toFixed(2) + " k"
        }
        else if(sccDayresult >= 1000000 && sccDayresult < 1000000000) {
            sccDayFinal = (sccDayresult/1000000).toFixed(2) + " M"
        }
        else if(sccDayresult >= 1000000000 && sccDayresult < 99999999999) {
            sccDayFinal = (sccDayresult/1000000000).toFixed(2) + " B"
        }
        else if(sccDayresult >= 99999999999){
            sccDayFinal = 99.99 + "+ B"
        }
        else {
            sccDayFinal = "NaN"
        }
        
        //Week
        if(sccWeekresult <= 999) {
            sccWeekFinal = sccWeekresult.toFixed(2)
        }
        else if(sccWeekresult >= 1000 && sccWeekresult < 1000000) {
            sccWeekFinal = (sccWeekresult/1000).toFixed(2) + " k"
        }
        else if(sccWeekresult >= 1000000 && sccWeekresult < 1000000000) {
            sccWeekFinal = (sccWeekresult/1000000).toFixed(2) + " M"
        }
        else if(sccWeekresult >= 1000000000 && sccWeekresult < 99999999999) {
            sccWeekFinal = (sccWeekresult/1000000000).toFixed(2) + " B"
        }
        else if(sccWeekresult >= 99999999999){
            sccWeekFinal = 99.99 + "+ B"
        }
        else {
            sccWeekFinal = "NaN"
        }
        
        //Month
        if(sccMonthresult <= 999) {
            sccMonthFinal = sccMonthresult.toFixed(2)
        }
        else if(sccMonthresult >= 1000 && sccMonthresult < 1000000) {
            sccMonthFinal = (sccMonthresult/1000).toFixed(2) + " k"
        }
        else if(sccMonthresult >= 1000000 && sccMonthresult < 1000000000) {
            sccMonthFinal = (sccMonthresult/1000000).toFixed(2) + " M"
        }
        else if(sccMonthresult >= 1000000000 && sccMonthresult < 99999999999) {
            sccMonthFinal = (sccMonthresult/1000000000).toFixed(2) + " B"
        }
        else if(sccMonthresult >= 99999999999){
            sccMonthFinal = 99.99 + "+ B"
        }
        else {
            sccMonthFinal = "NaN"
        }
        
        
        SCCcalcHour.innerHTML = sccHourFinal
        SCCcalcDay.innerHTML = sccDayFinal
        SCCcalcWeek.innerHTML = sccWeekFinal
        SCCcalcMonth.innerHTML = sccMonthFinal
    

function classicReward(difficulty, hashrate, height, period){
    return (hashrate/(difficulty/classicBlockTime)) * ((300000 - height - ((period/classicBlockTime)/2)) * (period/classicBlockTime));
}
}

function classicPrice() {
    
        sccUSDHourresult = classicProfitHour * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        sccUSDDayresult = classicProfitDay * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        sccUSDWeekresult = classicProfitWeek * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        sccUSDMonthresult = classicProfitMonth * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        
        //Hour
        if(hyperUSDHourresult <= 999 && hyperUSDHourresult >= 0) {
            hyperUSDHourFinal = hyperUSDHourresult.toFixed(2)
        }
        else if(hyperUSDHourresult >= 1000 && hyperUSDHourresult < 1000000) {
            hyperUSDHourFinal = (hyperUSDHourresult/1000).toFixed(2) + " k"
        }
        else if(hyperUSDHourresult >= 1000000 && hyperUSDHourresult < 1000000000) {
            hyperUSDHourFinal = (hyperUSDHourresult/1000000).toFixed(2) + " M"
        }
        else if(hyperUSDHourresult >= 1000000000 && hyperUSDHourresult < 99999999999) {
            hyperUSDHourFinal = (hyperUSDHourresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperUSDHourresult >= 99999999999){
            hyperUSDHourFinal = 99.99 + "+ B"
        }
        else {
            hyperUSDHourFinal = "NaN"
        }

        //Day
        if(hyperUSDDayresult <= 999 && hyperUSDDayresult >= 0) {
            hyperUSDDayFinal = hyperUSDDayresult.toFixed(2)
        }
        else if(hyperUSDDayresult >= 1000 && hyperUSDDayresult < 1000000) {
            hyperUSDDayFinal = (hyperUSDDayresult/1000).toFixed(2) + " k"
        }
        else if(hyperUSDDayresult >= 1000000 && hyperUSDDayresult < 1000000000) {
            hyperUSDDayFinal = (hyperUSDDayresult/1000000).toFixed(2) + " M"
        }
        else if(hyperUSDDayresult >= 1000000000 && hyperUSDDayresult < 99999999999) {
            hyperUSDDayFinal = (hyperUSDDayresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperUSDDayresult >= 99999999999){
            hyperUSDDayFinal = 99.99 + "+ B"
        }
        else {
            hyperUSDDayFinal = "NaN"
        }
        
        //Week
        if(hyperUSDWeekresult <= 999 && hyperUSDWeekresult >= 0) {
            hyperUSDWeekFinal = hyperUSDWeekresult.toFixed(2)
        }
        else if(hyperUSDWeekresult >= 1000 && hyperUSDWeekresult < 1000000) {
            hyperUSDWeekFinal = (hyperUSDWeekresult/1000).toFixed(2) + " k"
        }
        else if(hyperUSDWeekresult >= 1000000 && hyperUSDWeekresult < 1000000000) {
            hyperUSDWeekFinal = (hyperUSDWeekresult/1000000).toFixed(2) + " M"
        }
        else if(hyperUSDWeekresult >= 1000000000 && hyperUSDWeekresult < 99999999999) {
            hyperUSDWeekFinal = (hyperUSDWeekresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperUSDWeekresult >= 99999999999){
            hyperUSDWeekFinal = 99.99 + "+ B"
        }
        else {
            hyperUSDWeekFinal = "NaN"
        }
        
        //Month
        if(hyperUSDMonthresult <= 999 && hyperUSDMonthresult >= 0) {
            hyperUSDMonthFinal = hyperUSDMonthresult.toFixed(2)
        }
        else if(hyperUSDMonthresult >= 1000 && hyperUSDMonthresult < 1000000) {
            hyperUSDMonthFinal = (hyperUSDMonthresult/1000).toFixed(2) + " k"
        }
        else if(hyperUSDMonthresult >= 1000000 && hyperUSDMonthresult < 1000000000) {
            hyperUSDMonthFinal = (hyperUSDMonthresult/1000000).toFixed(2) + " M"
        }
        else if(hyperUSDMonthresult >= 1000000000 && hyperUSDMonthresult < 99999999999) {
            hyperUSDMonthFinal = (hyperUSDMonthresult/1000000000).toFixed(2) + " B"
        }
        else if(hyperUSDMonthresult >= 99999999999){
            hyperUSDMonthFinal = 99.99 + "+ B"
        }
        else {
            hyperUSDMonthFinal = "NaN"
        }

        SCCcalcHourUSD.innerHTML = hyperUSDHourFinal
        SCCcalcDayUSD.innerHTML = hyperUSDDayFinal
        SCCcalcWeekUSD.innerHTML = hyperUSDWeekFinal
        SCCcalcMonthUSD.innerHTML = hyperUSDMonthFinal
}

function classicPriceAPIError() {
        SCCcalcHourUSD.innerHTML = "Unable to load API"
        SCCcalcDayUSD.innerHTML = "Try refreshring page"
        SCCcalcWeekUSD.innerHTML = "or clearing cache"
        SCCcalcMonthUSD.innerHTML = ""
}


function prime(){
    
    const primeAPIDifficulty = miningAPIData[2].difficulty;
    const primeAPIheight = miningAPIData[2].height;
    
    primeHourresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, hour)
    primeDayresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, day)
    primeWeekresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, week)
    primeMonthresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, month)
    

        //Hour
        if(primeHourresult <= 999) {
            primeHourFinal = primeHourresult.toFixed(2)
        }
        else if(primeHourresult >= 1000 && primeHourresult < 1000000) {
            primeHourFinal = (primeHourresult/1000).toFixed(2) + " k"
        }
        else if(primeHourresult >= 1000000 && primeHourresult < 1000000000) {
            primeHourFinal = (primeHourresult/1000000).toFixed(2) + " M"
        }
        else if(primeHourresult >= 1000000000 && primeHourresult < 99999999999) {
            primeHourFinal = (primeHourresult/1000000000).toFixed(2) + " B"
        }
        else if(primeHourresult >= 99999999999){
            primeHourFinal = 99.99 + "+ B"
        }
        else {
            primeHourFinal = "NaN"
        }

        //Day
        if(primeDayresult <= 999) {
            primeDayFinal = primeDayresult.toFixed(2)
        }
        else if(primeDayresult >= 1000 && primeDayresult < 1000000) {
            primeDayFinal = (primeDayresult/1000).toFixed(2) + " k"
        }
        else if(primeDayresult >= 1000000 && primeDayresult < 1000000000) {
            primeDayFinal = (primeDayresult/1000000).toFixed(2) + " M"
        }
        else if(primeDayresult >= 1000000000 && primeDayresult < 99999999999) {
            primeDayFinal = (primeDayresult/1000000000).toFixed(2) + " B"
        }
        else if(primeDayresult >= 99999999999){
            primeDayFinal = 99.99 + "+ B"
        }
        else {
            primeDayFinal = "NaN"
        }
        
        //Week
        if(primeWeekresult <= 999) {
            primeWeekFinal = primeWeekresult.toFixed(2)
        }
        else if(primeWeekresult >= 1000 && primeWeekresult < 1000000) {
            primeWeekFinal = (primeWeekresult/1000).toFixed(2) + " k"
        }
        else if(primeWeekresult >= 1000000 && primeWeekresult < 1000000000) {
            primeWeekFinal = (primeWeekresult/1000000).toFixed(2) + " M"
        }
        else if(primeWeekresult >= 1000000000 && primeWeekresult < 99999999999) {
            primeWeekFinal = (primeWeekresult/1000000000).toFixed(2) + " B"
        }
        else if(primeWeekresult >= 99999999999){
            primeWeekFinal = 99.99 + "+ B"
        }
        else {
            primeWeekFinal = "NaN"
        }
        
        //Month
        if(primeMonthresult <= 999) {
            primeMonthFinal = primeMonthresult.toFixed(2)
        }
        else if(primeMonthresult >= 1000 && primeMonthresult < 1000000) {
            primeMonthFinal = (primeMonthresult/1000).toFixed(2) + " k"
        }
        else if(primeMonthresult >= 1000000 && primeMonthresult < 1000000000) {
            primeMonthFinal = (primeMonthresult/1000000).toFixed(2) + " M"
        }
        else if(primeMonthresult >= 1000000000 && primeMonthresult < 99999999999) {
            primeMonthFinal = (primeMonthresult/1000000000).toFixed(2) + " B"
        }
        else if(primeMonthresult >= 99999999999){
            primeMonthFinal = 99.99 + "+ B"
        }
        else {
            primeMonthFinal = "NaN"
        }
    
        SCPcalcHour.innerHTML = primeHourFinal
        SCPcalcDay.innerHTML = primeDayFinal
        SCPcalcWeek.innerHTML = primeWeekFinal
        SCPcalcMonth.innerHTML = primeMonthFinal

function primeReward(difficulty, hashrate, height, period){
    return (hashrate/(difficulty/primeBlockTime)) * ((300000 - height - ((period/primeBlockTime)/2)) * (period/primeBlockTime) * 0.8);
}
}

function calcProfit() {
    if (poolFee.value >= 0 || elecCost.value >= 0 || powerConsumtion.value >= 0) {
        hyperFeeHour = (hyperUSDHourresult - (hyperUSDHourresult * (poolFee.value / 100))) - (((powerConsumtion.value * 1) / 1000) * elecCost.value)
        hyperFeeDay = (hyperUSDDayresult - (hyperUSDDayresult * (poolFee.value / 100))) - (((powerConsumtion.value * 24) / 1000) * elecCost.value)
        hyperFeeWeek = (hyperUSDWeekresult - (hyperUSDWeekresult * (poolFee.value / 100))) - ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value)
        hyperFeeMonth = (hyperUSDMonthresult - (hyperUSDMonthresult * (poolFee.value / 100))) - ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value)
        
        primeFeeHour = (((powerConsumtion.value * 1) / 1000) * elecCost.value) * -1
        primeFeeDay = (((powerConsumtion.value * 24) / 1000) * elecCost.value) * -1
        primeFeeWeek = ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value) * -1
        primeFeeMonth = ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value) * -1
        
        classicFeeHour = (((powerConsumtion.value * 1) / 1000) * elecCost.value) * -1
        classicFeeDay = (((powerConsumtion.value * 24) / 1000) * elecCost.value) * -1
        classicFeeWeek = ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value) * -1
        classicFeeMonth = ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value) * -1
        
        siaFeeHour = siaUSDHourresult - (siaUSDHourresult * (poolFee.value / 100)) - (((powerConsumtion.value * 1) / 1000) * elecCost.value)
        siaFeeDay = siaUSDDayresult - (siaUSDDayresult * (poolFee.value / 100)) - (((powerConsumtion.value * 24) / 1000) * elecCost.value)
        siaFeeWeek = siaUSDWeekresult - (siaUSDWeekresult * (poolFee.value / 100)) - ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value)
        siaFeeMonth = siaUSDMonthresult - (siaUSDMonthresult * (poolFee.value / 100)) - ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value)
        
        //Hour
        
        //HyperSpace
        if(hyperFeeHour <= 999 && hyperFeeHour >= 0) {
            hyperProfitHour = hyperFeeHour.toFixed(2)
        }
        else if(hyperFeeHour >= 1000 && hyperFeeHour < 1000000) {
            hyperProfitHour = (hyperFeeHour/1000).toFixed(2) + " k"
        }
        else if(hyperFeeHour >= 1000000 && hyperFeeHour < 1000000000) {
            hyperProfitHour = (hyperFeeHour/1000000).toFixed(2) + " M"
        }
        else if(hyperFeeHour >= 1000000000 && hyperFeeHour < 99999999999) {
            hyperProfitHour = (hyperFeeHour/1000000000).toFixed(2) + " B"
        }
        else if(hyperFeeHour >= 99999999999){
            hyperProfitHour = 99.99 + "+ B"
        }
        else if(hyperFeeHour >= -999 && hyperFeeHour < 0) {
            hyperProfitHour = hyperFeeHour.toFixed(2)
        }
        else if(hyperFeeHour <= -1000 && hyperFeeHour > -1000000) {
            hyperProfitHour = (hyperFeeHour/1000).toFixed(2) + " k"
        }
        else if(hyperFeeHour <= -1000000 && hyperFeeHour > -1000000000) {
            hyperProfitHour = (hyperFeeHour/1000000).toFixed(2) + " M"
        }
        else if(hyperFeeHour <= -1000000000 && hyperFeeHour > -99999999999) {
            hyperProfitHour = (hyperFeeHour/1000000000).toFixed(2) + " B"
        }
        else if(hyperFeeHour <= -99999999999){
            hyperProfitHour = -99.99 + "+ B"
        }
        else {
            hyperProfitHour = "NaN"
        }
        
        //Sia Prime
        if(primeFeeHour <= 999 && primeFeeHour >= 0) {
            primeProfitHour = primeFeeHour.toFixed(2)
        }
        else if(primeFeeHour >= 1000 && primeFeeHour < 1000000) {
            primeProfitHour = (primeFeeHour/1000).toFixed(2) + " k"
        }
        else if(primeFeeHour >= 1000000 && primeFeeHour < 1000000000) {
            primeProfitHour = (primeFeeHour/1000000).toFixed(2) + " M"
        }
        else if(primeFeeHour >= 1000000000 && primeFeeHour < 99999999999) {
            primeProfitHour = (primeFeeHour/1000000000).toFixed(2) + " B"
        }
        else if(primeFeeHour >= 99999999999){
            primeProfitHour = 99.99 + "+ B"
        }
        else if(primeFeeHour >= -999 && primeFeeHour < 0) {
            primeProfitHour = primeFeeHour.toFixed(2)
        }
        else if(primeFeeHour <= -1000 && primeFeeHour > -1000000) {
            primeProfitHour = (primeFeeHour/1000).toFixed(2) + " k"
        }
        else if(primeFeeHour <= -1000000 && primeFeeHour > -1000000000) {
            primeProfitHour = (primeFeeHour/1000000).toFixed(2) + " M"
        }
        else if(primeFeeHour <= -1000000000 && primeFeeHour > -99999999999) {
            primeProfitHour = (primeFeeHour/1000000000).toFixed(2) + " B"
        }
        else if(primeFeeHour <= -99999999999){
            primeProfitHour = -99.99 + "+ B"
        }
        else {
            primeProfitHour = "NaN"
        }
        
        //Sia Classic
        if(classicFeeHour <= 999 && classicFeeHour >= 0) {
            classicProfitHour = classicFeeHour.toFixed(2)
        }
        else if(primeFeeHour >= 1000 && classicFeeHour < 1000000) {
            classicProfitHour = (classicFeeHour/1000).toFixed(2) + " k"
        }
        else if(classicFeeHour >= 1000000 && classicFeeHour < 1000000000) {
            classicProfitHour = (classicFeeHour/1000000).toFixed(2) + " M"
        }
        else if(classicFeeHour >= 1000000000 && classicFeeHour < 99999999999) {
            classicProfitHour = (classicFeeHour/1000000000).toFixed(2) + " B"
        }
        else if(classicFeeHour >= 99999999999){
            classicProfitHour = 99.99 + "+ B"
        }
        else if(classicFeeHour >= -999 && classicFeeHour < 0) {
            classicProfitHour = classicFeeHour.toFixed(2)
        }
        else if(classicFeeHour <= -1000 && classicFeeHour > -1000000) {
            classicProfitHour = (classicFeeHour/1000).toFixed(2) + " k"
        }
        else if(classicFeeHour <= -1000000 && classicFeeHour > -1000000000) {
            classicProfitHour = (classicFeeHour/1000000).toFixed(2) + " M"
        }
        else if(classicFeeHour <= -1000000000 && classicFeeHour > -99999999999) {
            classicProfitHour = (classicFeeHour/1000000000).toFixed(2) + " B"
        }
        else if(classicFeeHour <= -99999999999){
            classicProfitHour = -99.99 + "+ B"
        }
        else {
            classicProfitHour = "NaN"
        }

        //Sia
        if(siaFeeHour <= 999 && siaFeeHour >= 0) {
            siaProfitHour = siaFeeHour.toFixed(2)
        }
        else if(siaFeeHour >= 1000 && siaFeeHour < 1000000) {
            siaProfitHour = (siaFeeHour/1000).toFixed(2) + " k"
        }
        else if(siaFeeHour >= 1000000 && siaFeeHour < 1000000000) {
            siaProfitHour = (siaFeeHour/1000000).toFixed(2) + " M"
        }
        else if(siaFeeHour >= 1000000000 && siaFeeHour < 99999999999) {
            siaProfitHour = (siaFeeHour/1000000000).toFixed(2) + " B"
        }
        else if(siaFeeHour >= 99999999999){
            siaProfitHour = 99.99 + "+ B"
        }
        else if(siaFeeHour >= -999 && siaFeeHour < 0) {
            siaProfitHour = siaFeeHour.toFixed(2)
        }
        else if(siaFeeHour <= -1000 && siaFeeHour > -1000000) {
            siaProfitHour = (siaFeeHour/1000).toFixed(2) + " k"
        }
        else if(siaFeeHour <= -1000000 && siaFeeHour > -1000000000) {
            siaProfitHour = (siaFeeHour/1000000).toFixed(2) + " M"
        }
        else if(siaFeeHour <= -1000000000 && siaFeeHour > -99999999999) {
            siaProfitHour = (siaFeeHour/1000000000).toFixed(2) + " B"
        }
        else if(siaFeeHour <= -99999999999){
            siaProfitHour = -99.99 + "+ B"
        }
        else {
            siaProfitHour = "NaN"
        }

        //Day
        
        //HyperSpace
        if(hyperFeeDay <= 999 && hyperFeeDay >= 0) {
            hyperProfitDay = hyperFeeDay.toFixed(2)
        }
        else if(hyperFeeDay >= 1000 && hyperFeeDay < 1000000) {
            hyperProfitDay = (hyperFeeDay/1000).toFixed(2) + " k"
        }
        else if(hyperFeeDay >= 1000000 && hyperFeeDay < 1000000000) {
            hyperProfitDay = (hyperFeeDay/1000000).toFixed(2) + " M"
        }
        else if(hyperFeeDay >= 1000000000 && hyperFeeDay < 99999999999) {
            hyperProfitDay = (hyperFeeDay/1000000000).toFixed(2) + " B"
        }
        else if(hyperFeeDay >= 99999999999){
            hyperProfitDay = 99.99 + "+ B"
        }
        else if(hyperFeeDay >= -999 && hyperFeeDay < 0) {
            hyperProfitDay = hyperFeeDay.toFixed(2)
        }
        else if(hyperFeeDay <= -1000 && hyperFeeDay > -1000000) {
            hyperProfitDay = (hyperFeeDay/1000).toFixed(2) + " k"
        }
        else if(hyperFeeDay <= -1000000 && hyperFeeDay > -1000000000) {
            hyperProfitDay = (hyperFeeDay/1000000).toFixed(2) + " M"
        }
        else if(hyperFeeDay <= -1000000000 && hyperFeeDay > -99999999999) {
            hyperProfitDay = (hyperFeeDay/1000000000).toFixed(2) + " B"
        }
        else if(hyperFeeDay <= -99999999999){
            hyperProfitDay = -99.99 + "+ B"
        }
        else {
            hyperProfitDay = "NaN"
        }
        
        //Sia Prime
        if(primeFeeDay <= 999 && primeFeeDay >= 0) {
            primeProfitDay = primeFeeDay.toFixed(2)
        }
        else if(primeFeeDay >= 1000 && primeFeeDay < 1000000) {
            primeProfitDay = (primeFeeDay/1000).toFixed(2) + " k"
        }
        else if(primeFeeDay >= 1000000 && primeFeeDay < 1000000000) {
            primeProfitDay = (primeFeeDay/1000000).toFixed(2) + " M"
        }
        else if(primeFeeDay >= 1000000000 && primeFeeDay < 99999999999) {
            primeProfitDay = (primeFeeDay/1000000000).toFixed(2) + " B"
        }
        else if(primeFeeDay >= 99999999999){
            primeProfitDay = 99.99 + "+ B"
        }
        else if(primeFeeDay >= -999 && primeFeeDay < 0) {
            primeProfitDay = primeFeeDay.toFixed(2)
        }
        else if(primeFeeDay <= -1000 && primeFeeDay > -1000000) {
            primeProfitDay = (primeFeeDay/1000).toFixed(2) + " k"
        }
        else if(primeFeeDay <= -1000000 && primeFeeDay > -1000000000) {
            primeProfitDay = (primeFeeDay/1000000).toFixed(2) + " M"
        }
        else if(primeFeeDay <= -1000000000 && primeFeeDay > -99999999999) {
            primeProfitDay = (primeFeeDay/1000000000).toFixed(2) + " B"
        }
        else if(primeFeeDay <= -99999999999){
            primeProfitDay = -99.99 + "+ B"
        }
        else {
            primeProfitDay = "NaN"
        }
        
        //Sia Classic
        if(classicFeeDay <= 999 && classicFeeDay >= 0) {
            classicProfitDay = classicFeeDay.toFixed(2)
        }
        else if(primeFeeDay >= 1000 && classicFeeDay < 1000000) {
            classicProfitDay = (classicFeeDay/1000).toFixed(2) + " k"
        }
        else if(classicFeeDay >= 1000000 && classicFeeDay < 1000000000) {
            classicProfitDay = (classicFeeDay/1000000).toFixed(2) + " M"
        }
        else if(classicFeeDay >= 1000000000 && classicFeeDay < 99999999999) {
            classicProfitDay = (classicFeeDay/1000000000).toFixed(2) + " B"
        }
        else if(classicFeeDay >= 99999999999){
            classicProfitDay = 99.99 + "+ B"
        }
        else if(classicFeeDay >= -999 && classicFeeDay < 0) {
            classicProfitDay = classicFeeDay.toFixed(2)
        }
        else if(classicFeeDay <= -1000 && classicFeeDay > -1000000) {
            classicProfitDay = (classicFeeDay/1000).toFixed(2) + " k"
        }
        else if(classicFeeDay <= -1000000 && classicFeeDay > -1000000000) {
            classicProfitDay = (classicFeeDay/1000000).toFixed(2) + " M"
        }
        else if(classicFeeDay <= -1000000000 && classicFeeDay > -99999999999) {
            classicProfitDay = (classicFeeDay/1000000000).toFixed(2) + " B"
        }
        else if(classicFeeDay <= -99999999999){
            classicProfitDay = -99.99 + "+ B"
        }
        else {
            classicProfitDay = "NaN"
        }
        
        //Sia
        if(siaFeeDay <= 999 && siaFeeDay >= 0) {
            siaProfitDay = siaFeeDay.toFixed(2)
        }
        else if(siaFeeDay >= 1000 && siaFeeDay < 1000000) {
            siaProfitDay = (siaFeeDay/1000).toFixed(2) + " k"
        }
        else if(siaFeeDay >= 1000000 && siaFeeDay < 1000000000) {
            siaProfitDay = (siaFeeDay/1000000).toFixed(2) + " M"
        }
        else if(siaFeeDay >= 1000000000 && siaFeeDay < 99999999999) {
            siaProfitDay = (siaFeeDay/1000000000).toFixed(2) + " B"
        }
        else if(siaFeeDay >= 99999999999){
            siaProfitDay = 99.99 + "+ B"
        }
        else if(siaFeeDay >= -999 && siaFeeDay < 0) {
            siaProfitDay = siaFeeDay.toFixed(2)
        }
        else if(siaFeeDay <= -1000 && siaFeeDay > -1000000) {
            siaProfitDay = (siaFeeDay/1000).toFixed(2) + " k"
        }
        else if(siaFeeDay <= -1000000 && siaFeeDay > -1000000000) {
            siaProfitDay = (siaFeeDay/1000000).toFixed(2) + " M"
        }
        else if(siaFeeDay <= -1000000000 && siaFeeDay > -99999999999) {
            siaProfitDay = (siaFeeDay/1000000000).toFixed(2) + " B"
        }
        else if(siaFeeDay <= -99999999999){
            siaProfitDay = -99.99 + "+ B"
        }
        else {
            siaProfitDay = "NaN"
        }

        //Week
        
        //HyperSpace
        if(hyperFeeWeek <= 999 && hyperFeeWeek >= 0) {
            hyperProfitWeek = hyperFeeWeek.toFixed(2)
        }
        else if(hyperFeeWeek >= 1000 && hyperFeeWeek < 1000000) {
            hyperProfitWeek = (hyperFeeWeek/1000).toFixed(2) + " k"
        }
        else if(hyperFeeWeek >= 1000000 && hyperFeeWeek < 1000000000) {
            hyperProfitWeek = (hyperFeeWeek/1000000).toFixed(2) + " M"
        }
        else if(hyperFeeWeek >= 1000000000 && hyperFeeWeek < 99999999999) {
            hyperProfitWeek = (hyperFeeWeek/1000000000).toFixed(2) + " B"
        }
        else if(hyperFeeWeek >= 99999999999){
            hyperProfitWeek = 99.99 + "+ B"
        }
        else if(hyperFeeWeek >= -999 && hyperFeeWeek < 0) {
            hyperProfitWeek = hyperFeeWeek.toFixed(2)
        }
        else if(hyperFeeWeek <= -1000 && hyperFeeWeek > -1000000) {
            hyperProfitWeek = (hyperFeeWeek/1000).toFixed(2) + " k"
        }
        else if(hyperFeeWeek <= 1000000 && hyperFeeWeek > -1000000000) {
            hyperProfitWeek = (hyperFeeWeek/1000000).toFixed(2) + " M"
        }
        else if(hyperFeeWeek <= -1000000000 && hyperFeeWeek > -99999999999) {
            hyperProfitWeek = (hyperFeeWeek/1000000000).toFixed(2) + " B"
        }
        else if(hyperFeeWeek <= -99999999999){
            hyperProfitWeek = -99.99 + "+ B"
        }
        else {
            hyperProfitWeek = "NaN"
        }
        
        //Sia Prime
        if(primeFeeWeek <= 999 && primeFeeWeek >= 0) {
            primeProfitWeek = primeFeeWeek.toFixed(2)
        }
        else if(primeFeeWeek >= 1000 && primeFeeWeek < 1000000) {
            primeProfitWeek = (primeFeeWeek/1000).toFixed(2) + " k"
        }
        else if(primeFeeWeek >= 1000000 && primeFeeWeek < 1000000000) {
            primeProfitWeek = (primeFeeWeek/1000000).toFixed(2) + " M"
        }
        else if(primeFeeWeek >= 1000000000 && primeFeeWeek < 99999999999) {
            primeProfitWeek = (primeFeeWeek/1000000000).toFixed(2) + " B"
        }
        else if(primeFeeWeek >= 99999999999){
            primeProfitWeek = 99.99 + "+ B"
        }
        else if(primeFeeWeek >= -999 && primeFeeWeek < 0) {
            primeProfitWeek = primeFeeWeek.toFixed(2)
        }
        else if(primeFeeWeek <= -1000 && primeFeeWeek > -1000000) {
            primeProfitWeek = (primeFeeWeek/1000).toFixed(2) + " k"
        }
        else if(primeFeeWeek<= -1000000 && primeFeeWeek > -1000000000) {
            primeProfitWeek = (primeFeeWeek/1000000).toFixed(2) + " M"
        }
        else if(primeFeeWeek <= -1000000000 && primeFeeWeek > -99999999999) {
            primeProfitWeek = (primeFeeWeek/1000000000).toFixed(2) + " B"
        }
        else if(primeFeeWeek <= -99999999999){
            primeProfitWeek = -99.99 + "+ B"
        }
        else {
            primeProfitWeek = "NaN"
        }
        
        //Sia Classic
        if(classicFeeWeek <= 999 && classicFeeWeek >= 0) {
            classicProfitWeek = classicFeeWeek.toFixed(2)
        }
        else if(primeFeeWeek >= 1000 && classicFeeWeek < 1000000) {
            classicProfitWeek = (classicFeeWeek/1000).toFixed(2) + " k"
        }
        else if(classicFeeWeek >= 1000000 && classicFeeWeek < 1000000000) {
            classicProfitWeek = (classicFeeWeek/1000000).toFixed(2) + " M"
        }
        else if(classicFeeWeek >= 1000000000 && classicFeeWeek < 99999999999) {
            classicProfitWeek = (classicFeeWeek/1000000000).toFixed(2) + " B"
        }
        else if(classicFeeWeek >= 99999999999){
            classicProfitWeek = 99.99 + "+ B"
        }
        else if(classicFeeWeek >= -999 && classicFeeWeek < 0) {
            classicProfitWeek = classicFeeWeek.toFixed(2)
        }
        else if(classicFeeWeek <= -1000 && classicFeeWeek > -1000000) {
            classicProfitWeek = (classicFeeWeek/1000).toFixed(2) + " k"
        }
        else if(classicFeeWeek <= -1000000 && classicFeeWeek > -1000000000) {
            classicProfitWeek = (classicFeeWeek/1000000).toFixed(2) + " M"
        }
        else if(classicFeeWeek <= -1000000000 && classicFeeWeek > -99999999999) {
            classicProfitWeek = (classicFeeWeek/1000000000).toFixed(2) + " B"
        }
        else if(classicFeeWeek <= -99999999999){
            classicProfitWeek = -99.99 + "+ B"
        }
        else {
            classicProfitWeek = "NaN"
        }
        
        //Sia
        if(siaFeeWeek <= 999 && siaFeeWeek >= 0) {
            siaProfitWeek = siaFeeWeek.toFixed(2)
        }
        else if(siaFeeWeek >= 1000 && siaFeeWeek < 1000000) {
            siaProfitWeek = (siaFeeWeek/1000).toFixed(2) + " k"
        }
        else if(siaFeeWeek >= 1000000 && siaFeeWeek < 1000000000) {
            siaProfitWeek = (siaFeeWeek/1000000).toFixed(2) + " M"
        }
        else if(siaFeeWeek >= 1000000000 && siaFeeWeek < 99999999999) {
            siaProfitWeek = (siaFeeWeek/1000000000).toFixed(2) + " B"
        }
        else if(siaFeeWeek >= 99999999999){
            siaProfitWeek = 99.99 + "+ B"
        }
        else if(siaFeeWeek >= -999 && siaFeeWeek < 0) {
            siaProfitWeek = siaFeeWeek.toFixed(2)
        }
        else if(siaFeeWeek <= -1000 && siaFeeWeek > -1000000) {
            siaProfitWeek = (siaFeeWeek/1000).toFixed(2) + " k"
        }
        else if(siaFeeWeek <= -1000000 && siaFeeWeek > -1000000000) {
            siaProfitWeek = (siaFeeWeek/1000000).toFixed(2) + " M"
        }
        else if(siaFeeWeek <= -1000000000 && siaFeeWeek > -99999999999) {
            siaProfitWeek = (siaFeeWeek/1000000000).toFixed(2) + " B"
        }
        else if(siaFeeWeek <= -99999999999){
            siaProfitWeek = -99.99 + "+ B"
        }
        else {
            siaProfitWeek = "NaN"
        }
        
        //Month
        
        //HyperSpace
        if(hyperFeeMonth <= 999 && hyperFeeMonth >= 0) {
            hyperProfitMonth = hyperFeeMonth.toFixed(2)
        }
        else if(hyperFeeMonth >= 1000 && hyperFeeMonth < 1000000) {
            hyperProfitMonth = (hyperFeeMonth/1000).toFixed(2) + " k"
        }
        else if(hyperFeeMonth >= 1000000 && hyperFeeMonth < 1000000000) {
            hyperProfitMonth = (hyperFeeMonth/1000000).toFixed(2) + " M"
        }
        else if(hyperFeeMonth >= 1000000000 && hyperFeeMonth < 99999999999) {
            hyperProfitMonth = (hyperFeeMonth/1000000000).toFixed(2) + " B"
        }
        else if(hyperFeeMonth >= 99999999999){
            hyperProfitMonth = 99.99 + "+ B"
        }
        else if(hyperFeeMonth >= -999 && hyperFeeMonth < 0) {
            hyperProfitMonth = hyperFeeMonth.toFixed(2)
        }
        else if(hyperFeeMonth <= -1000 && hyperFeeMonth > -1000000) {
            hyperProfitMonth = (hyperFeeMonth/1000).toFixed(2) + " k"
        }
        else if(hyperFeeMonth <= -1000000 && hyperFeeMonth > -1000000000) {
            hyperProfitMonth = (hyperFeeMonth/1000000).toFixed(2) + " M"
        }
        else if(hyperFeeMonth <= -1000000000 && hyperFeeMonth > -99999999999) {
            hyperProfitMonth = (hyperFeeMonth/1000000000).toFixed(2) + " B"
        }
        else if (hyperFeeMonth <= -99999999999){
            hyperProfitMonth = -99.99 + "+ B"
        }
        else {
            hyperProfitMonth = "NaN"
        }
        
        //Sia Prime
        if(primeFeeMonth <= 999 && primeFeeMonth >= 0) {
            primeProfitMonth = primeFeeMonth.toFixed(2)
        }
        else if(primeFeeMonth >= 1000 && primeFeeMonth < 1000000) {
            primeProfitMonth = (primeFeeMonth/1000).toFixed(2) + " k"
        }
        else if(primeFeeMonth >= 1000000 && primeFeeMonth < 1000000000) {
            primeProfitMonth = (primeFeeMonth/1000000).toFixed(2) + " M"
        }
        else if(primeFeeMonth >= 1000000000 && primeFeeMonth < 99999999999) {
            primeProfitMonth = (primeFeeMonth/1000000000).toFixed(2) + " B"
        }
        else if(primeFeeMonth >= 99999999999){
            primeProfitMonth = 99.99 + "+ B"
        }
        else if(primeFeeMonth >= -999 && primeFeeMonth < 0) {
            primeProfitMonth = primeFeeMonth.toFixed(2)
        }
        else if(primeFeeMonth <= -1000 && primeFeeMonth > -1000000) {
            primeProfitMonth = (primeFeeMonth/1000).toFixed(2) + " k"
        }
        else if(primeFeeMonth<= -1000000 && primeFeeMonth > -1000000000) {
            primeProfitMonth = (primeFeeMonth/1000000).toFixed(2) + " M"
        }
        else if(primeFeeMonth <= -1000000000 && primeFeeMonth > -99999999999) {
            primeProfitMonth = (primeFeeMonth/1000000000).toFixed(2) + " B"
        }
        else if(primeFeeMonth <= -99999999999){
            primeProfitMonth = -99.99 + "+ B"
        }
        else {
            primeProfitMonth = "NaN"
        }
        
        //Sia Classic
        if(classicFeeMonth <= 999 && classicFeeMonth >= 0) {
            classicProfitMonth = classicFeeMonth.toFixed(2)
        }
        else if(primeFeeMonth >= 1000 && classicFeeMonth < 1000000) {
            classicProfitMonth = (classicFeeMonth/1000).toFixed(2) + " k"
        }
        else if(classicFeeMonth >= 1000000 && classicFeeMonth < 1000000000) {
            classicProfitMonth = (classicFeeMonth/1000000).toFixed(2) + " M"
        }
        else if(classicFeeMonth >= 1000000000 && classicFeeMonth < 99999999999) {
            classicProfitMonth = (classicFeeMonth/1000000000).toFixed(2) + " B"
        }
        else if(classicFeeMonth >= 99999999999){
            classicProfitMonth = 99.99 + "+ B"
        }
        else if(classicFeeMonth >= -999 && classicFeeMonth < 0) {
            classicProfitMonth = classicFeeMonth.toFixed(2)
        }
        else if(classicFeeMonth <= -1000 && classicFeeMonth > -1000000) {
            classicProfitMonth = (classicFeeMonth/1000).toFixed(2) + " k"
        }
        else if(classicFeeMonth <= -1000000 && classicFeeMonth > -1000000000) {
            classicProfitMonth = (classicFeeMonth/1000000).toFixed(2) + " M"
        }
        else if(classicFeeMonth <= -1000000000 && classicFeeMonth > -99999999999) {
            classicProfitMonth = (classicFeeMonth/1000000000).toFixed(2) + " B"
        }
        else if(classicFeeMonth <= -99999999999){
            classicProfitMonth = -99.99 + "+ B"
        }
        else {
            classicProfitMonth = "NaN"
        }
        
        //Sia
        if(siaFeeMonth <= 999 && siaFeeMonth >= 0) {
            siaProfitMonth = siaFeeMonth.toFixed(2)
        }
        else if(siaFeeMonth >= 1000 && siaFeeMonth < 1000000) {
            siaProfitMonth = (siaFeeMonth/1000).toFixed(2) + " k"
        }
        else if(siaFeeMonth >= 1000000 && siaFeeMonth < 1000000000) {
            siaProfitMonth = (siaFeeMonth/1000000).toFixed(2) + " M"
        }
        else if(siaFeeMonth >= 1000000000 && siaFeeMonth < 99999999999) {
            siaProfitMonth = (siaFeeMonth/1000000000).toFixed(2) + " B"
        }
        else if(siaFeeMonth >= 99999999999){
            siaProfitMonth = 99.99 + "+ B"
        }
        else if(siaFeeMonth >= -999 && siaFeeMonth < 0) {
            siaProfitMonth = siaFeeMonth.toFixed(2)
        }
        else if(siaFeeMonth <= -1000 && siaFeeMonth > -1000000) {
            siaProfitMonth = (siaFeeMonth/1000).toFixed(2) + " k"
        }
        else if(siaFeeMonth <= -1000000 && siaFeeMonth > -1000000000) {
            siaProfitMonth = (siaFeeMonth/1000000).toFixed(2) + " M"
        }
        else if(siaFeeMonth <= -1000000000 && siaFeeMonth > -99999999999) {
            siaProfitMonth = (siaFeeMonth/1000000000).toFixed(2) + " B"
        }
        else if(siaFeeMonth <= -99999999999){
            siaProfitMonth = -99.99 + "+ B"
        }
        else {
            siaProfitMonth = "NaN"
        }
        
        
        
        XSCresultHourProfit.innerHTML = hyperProfitHour
        XSCresultDayProfit.innerHTML = hyperProfitDay
        XSCresultWeekProfit.innerHTML = hyperProfitWeek
        XSCresultMonthProfit.innerHTML = hyperProfitMonth
        
        SCPresultHourProfit.innerHTML = primeProfitHour
        SCPresultDayProfit.innerHTML = primeProfitDay
        SCPresultWeekProfit.innerHTML = primeProfitWeek
        SCPresultMonthProfit.innerHTML = primeProfitMonth
        
        SCCresultHourProfit.innerHTML = classicProfitHour
        SCCresultDayProfit.innerHTML = classicProfitDay
        SCCresultWeekProfit.innerHTML = classicProfitWeek
        SCCresultMonthProfit.innerHTML = classicProfitMonth
        
        SiaresultHourProfit.innerHTML = siaProfitHour
        SiaresultDayProfit.innerHTML = siaProfitDay
        SiaresultWeekProfit.innerHTML = siaProfitWeek
        SiaresultMonthProfit.innerHTML = siaProfitMonth
        
        
    }
    else {
        //XSCresultHourProfit.innerHTML = hyperUSDHourresult.toFixed(2)
    }
}

function presetUpdate() {
    A3preset = A3.value.replace(/[^1234567890]|\-/g, "")
    Baikpreset = Baik.value.replace(/[^1234567890]|\-/g, "")
    B52preset = B52.value.replace(/[^1234567890]|\-/g, "")
    iBepreset = iBe.value.replace(/[^1234567890]|\-/g, "")
    S11preset = S11.value.replace(/[^1234567890]|\-/g, "")
    SC1preset = SC1.value.replace(/[^1234567890]|\-/g, "")
    StrongUpreset = StrongU.value.replace(/[^1234567890]|\-/g, "")
    
   /* let A3preset
    let Baikpreset
    let B52preset
    let iBepreset
    let S11preset
    let SC1preset
    let StrongUpreset
    
    let A3presetPower
    let BaikpresetPower
    let B52presetPower
    let iBepresetPower
    let S11presetPower
    let SC1presetPower
    let StrongUpresetPower */
    
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
        A3.value = 0
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
        Baik.value = 0
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
        B52.value = 0
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
        iBe.value = 0
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
        S11.value = 0
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
        SC1.value = 0
        SC1presetFinal = 0
        SC1presetPower = 0
    }
    
    //StrongU STU-U2
    if (StrongUpreset >= 1 && StrongUpreset < 999) {
        StrongUpresetFinal = 7000 * StrongUpreset
        StrongUpresetPower = 1600 * StrongUpreset
    }
    else if (StrongUpreset >= 999) {
        StrongU.value = 999
        StrongUpresetFinal = 7000 * StrongUpreset
        StrongUpresetPower = 1600 * StrongUpreset
    }
    else if (StrongUpreset <= 0){
        StrongU.value = 0
        StrongUpresetFinal = 0
        StrongUpresetPower = 0
    }
    
    totalPresetHashrate = A3presetFinal + BaikpresetFinal + B52presetFinal + iBepresetFinal + S11presetFinal + SC1presetFinal + StrongUpresetFinal
    console.log("A3: " + A3presetFinal + " Baik: " + BaikpresetFinal+ " B52: "  + B52presetFinal + " iBe " + iBepresetFinal + " S11: "  + S11presetFinal+ " SC1: "  + SC1presetFinal+ " StrongU: "  + StrongUpresetFinal)
    console.log("Total Hashrate: " + totalPresetHashrate)
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
