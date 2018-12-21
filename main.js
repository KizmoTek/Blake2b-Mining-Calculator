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
        
        siaHourFinal = numberShortener(siaProfitHour)
        siaDayFinal = numberShortener(siaProfitDay)
        siaWeekFinal = numberShortener(siaProfitWeek)
        siaMonthFinal = numberShortener(siaProfitMonth)


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
        
        siaUSDHourFinal = numberShortener(siaUSDHourresult)
        siaUSDDayFinal = numberShortener(siaUSDDayresult)
        siaUSDWeekFinal = numberShortener(siaUSDWeekresult)
        siaUSDMonthFinal = numberShortener(siaUSDMonthresult)
        
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
        
        hyperHourFinal = numberShortener(hyperProfitHour)
        hyperDayFinal = numberShortener(hyperProfitDay)
        hyperWeekFinal = numberShortener(hyperProfitWeek)
        hyperMonthFinal = numberShortener(hyperProfitMonth)
        
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
        
        hyperUSDHourFinal = numberShortener(hyperUSDHourresult)
        hyperUSDDayFinal = numberShortener(hyperUSDDayresult)
        hyperUSDWeekFinal = numberShortener(hyperUSDWeekresult)
        hyperUSDMonthFinal = numberShortener(hyperUSDMonthresult)

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
        
        sccHourFinal = numberShortener(sccHourresult)
        sccDayFinal = numberShortener(sccDayresult)
        sccWeekFinal = numberShortener(sccWeekresult)
        sccMonthFinal = numberShortener(sccMonthresult)
        
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
        
        sccUSDHourFinal = numberShortener(sccUSDHourresult)
        sccUSDDayFinal = numberShortener(sccUSDDayresult)
        SCCcalcWeekUSD = numberShortener(sccUSDWeekresult)
        SCCcalcMonthUSD = numberShortener(sccUSDMonthresult)
    
        SCCcalcHourUSD.innerHTML = sccUSDHourFinal
        SCCcalcDayUSD.innerHTML = sccUSDDayFinal
        SCCcalcWeekUSD.innerHTML = sccUSDWeekFinal
        SCCcalcMonthUSD.innerHTML = sccUSDMonthFinal
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
    
    primeHourFinal = numberShortener(primeHourresult)
    primeDayFinal = numberShortener(primeDayresult)
    primeWeekFinal = numberShortener(primeWeekresult)
    primeMonthFinal = numberShortener(primeMonthresult)
    
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
        
        //HyperSpace
        hyperProfitHour = numberShortener(hyperFeeHour)
        hyperProfitDay = numberShortener(hyperFeeDay)
        hyperProfitWeek = numberShortener(hyperFeeWeek)
        hyperProfitMonth = numberShortener(hyperFeeMonth)
        
        //Sia Prime
        primeProfitHour = numberShortener(primeFeeHour)
        primeProfitDay = numberShortener(primeFeeDay)
        primeProfitWeek = numberShortener(primeFeeWeek)
        primeProfitMonth = numberShortener(primeFeeMonth)
        
        //Sia Classic
        classicProfitHour = numberShortener(classicFeeHour)
        classicProfitDay = numberShortener(classicFeeDay)
        classicProfitWeek = numberShortener(classicFeeWeek)
        classicProfitMonth = numberShortener(classicFeeMonth)

        //Sia
        siaProfitHour = numberShortener(siaFeeHour)
        siaProfitDay = numberShortener(siaFeeDay)
        siaProfitWeek = numberShortener(siaFeeWeek)
        siaProfitMonth = numberShortener(siaFeeMonth)
        
        
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
        StrongUpresetFinal = 7000 * StrongUpreset
        StrongUpresetPower = 1600 * StrongUpreset
    }
    else if (StrongUpreset >= 999) {
        StrongU.value = 999
        StrongUpresetFinal = 7000 * StrongUpreset
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