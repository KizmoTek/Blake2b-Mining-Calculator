moment().format();

const grinPriceAPI = "https://api.coingecko.com/api/v3/coins/grin/market_chart?vs_currency=usd&days=1"
var grinPriceAPILoad

const obeliskSaleAPI = "https://portal.obelisk.tech/api/orderCounts?showAll=yes"
var obeliskSaleAPILoad
var GRN1MiniSale = document.getElementById("GRN1-MiniSale")
var GRN1Sale = document.getElementById("GRN1Sale")
var GRN1IMMSale = document.getElementById("GRN1-IMMSale")
var totalHashrate = document.getElementById("totalHashrate")
var totalMiners = document.getElementById("totalMiners")


var APILoaded = 0

let grinPriceAPIData = 0
fetch(grinPriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
    fetch(grinPriceAPI)
        .then(function(response) {
            if (response.ok == true) {
                return response.json();
            } else {
                grinPriceAPILoad = false
                alert("Error with loading Keops API data for Hyperspace, SiaPrime, SiaClassic, and Sia.")
            }
        })
        .then(function(myJson){
            grinPriceAPIData = myJson
            grinPriceAPILoad = true
            APILoaded += 1
            apiLoadVerify()
        })
    }
        
})
.then(function(myJson){
    grinPriceAPIData = myJson
    grinPriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
})

let obeliskSaleAPIData = 0
fetch(obeliskSaleAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
    fetch(obeliskSaleAPI)
        .then(function(response) {
            if (response.ok == true) {
                return response.json();
            } else {
                obeliskSaleAPILoad = false
                alert("Error with loading Keops API data for Hyperspace, SiaPrime, SiaClassic, and Sia.")
            }
        })
        .then(function(myJson){
            obeliskSaleAPIData = myJson
            obeliskSaleAPILoad = true
            GRN1MiniSale.innerHTML = obeliskSaleAPIData.counts["GRN1-MINI"]
            GRN1Sale.innerHTML = obeliskSaleAPIData.counts["GRN1"] + obeliskSaleAPIData.counts["GRN1-B1"]
            GRN1IMMSale.innerHTML = obeliskSaleAPIData.counts["GRN1-IMM"]
        })
    }
        
})
.then(function(myJson){
    obeliskSaleAPIData = myJson
    obeliskSaleAPILoad = true
    GRN1MiniSale.innerHTML = obeliskSaleAPIData.counts["GRN1-MINI"]
    GRN1Sale.innerHTML = obeliskSaleAPIData.counts["GRN1"] + obeliskSaleAPIData.counts["GRN1-B1"]
    GRN1IMMSale.innerHTML = obeliskSaleAPIData.counts["GRN1-IMM"]
    totalMiners.innerHTML = obeliskSaleAPIData.counts["GRN1-MINI"] + obeliskSaleAPIData.counts["GRN1"] + obeliskSaleAPIData.counts["GRN1-B1"] + obeliskSaleAPIData.counts["GRN1-IMM"]
    totalHashrate.innerHTML = (obeliskSaleAPIData.counts["GRN1-MINI"] * 70) + ((obeliskSaleAPIData.counts["GRN1"] + obeliskSaleAPIData.counts["GRN1-B1"]) * 420) + (obeliskSaleAPIData.counts["GRN1-IMM"] * 840)
})

function apiLoadVerify() {
    if(APILoaded >= 1) {
        console.log(APILoaded + " API's loaded")
        liveHashrate()
        presetUpdate()
    }
}

var userHshrt = document.getElementById("hashrate")
var networkHshrt = document.getElementById("networkHashrate")
var diffToggle = document.getElementById("diffToggleSwitch")
var Grin32Toggle = document.getElementById("Grin32ToggleSwitch")
var poolFee = document.getElementById("poolFee")
var elecCost = document.getElementById("elecCost")
var powerConsumtion = document.getElementById("powerConsumtion")
let hshrt

var startDateInput = document.getElementById("startDate")
var endDateInput = document.getElementById("endDate")

var USDChartColor = "rgb(29, 153, 48, 0.8)"
var USDChartBorderColor = "#27842e"

var GRN1Mini = document.getElementById("GRN1-Mini")
var GRN1MiniPreset = 0
var GRN1MiniPresetPower = 0
var GRN1MiniPresetFinal = 0

var GRN1 = document.getElementById("GRN1")
GRN1.value = 1
var GRN1Preset = 0
var GRN1PresetPower = 0
var GRN1PresetFinal = 0

var GRN1Immersion = document.getElementById("GRN1-Immersion")
var GRN1ImmersionPreset = 0
var GRN1ImmersionPresetPower = 0
var GRN1ImmersionPresetFinal = 0

var G32Mini = document.getElementById("G32-Mini")
var G32MiniPreset = 0
var G32MiniPresetPower = 0
var G32MiniPresetFinal = 0

var G32 = document.getElementById("G32")
var G32Preset = 0
var G32PresetPower = 0
var G32PresetFinal = 0

var G321800 = document.getElementById("G32-1800")
var G321800Preset = 0
var G321800PresetPower = 0
var G321800PresetFinal = 0

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

if (mm < 8 && yyyy == 2019) {
    startDateInput.value = "2019" + '-' + "08" + '-' + "01"
    
    endDateInput.value = "2019" + '-' + "09" + '-' + "01";
} else {
    startDateInput.value = yyyy + '-' + mm + '-' + dd;
    
    if (mm == 1) {
        var tempYear = Number(yyyy)
        endDateInput.value = tempYear + 1 + '-' + 01 + '-' + dd;
    } else {
        var tempMonth = String(today.getMonth() + 2).padStart(2, '0');
        endDateInput.value = yyyy + '-' + tempMonth + '-' + dd;
    }
}

networkHshrt.value = 840000
poolFee.value = 2
elecCost.value = 0.1

var tickColor
var chartArr = []
var chartLabel = []
var chartProfitArr = []

const BLOCK_TIME_SEC = 60

// The block subsidy amount, one grin per second on average
// const REWARD = BLOCK_TIME_SEC * 1 // 1 full grin per second

// Nominal height for standard time intervals, hour is 60 blocks
const HOUR_HEIGHT = 3600 / BLOCK_TIME_SEC

/// A day is 1440 blocks
const DAY_HEIGHT = 24 * HOUR_HEIGHT

/// A week is 10_080 blocks
const WEEK_HEIGHT = 7 * DAY_HEIGHT

const MONTH_HEIGHT = 30 * DAY_HEIGHT

/// A year is 524_160 blocks
const YEAR_HEIGHT = 52 * WEEK_HEIGHT

const dayZero = moment('01/15/2019').unix()
const cc31PhaseOutStartDate = moment('01/15/2020').unix()
const cc31PhaseOutEndDate = moment('08/19/2020').unix()

var state

function secondaryPowRatio(height) {
    const result = 90 - height / ((2 * YEAR_HEIGHT) / 90)
    return Math.max(0, result)
}

function getSharePercent(blockHeight) {
    
        return (100 - secondaryPowRatio(Math.floor(blockHeight))) / 100
}

const getProfits = (state) => {

  // NOTE: This is a placeholder for the output data.  The outputs can be set into your output divs/spans
  //       and the data can be passed into chartjs.
  const profitInfo = {
    data: [[], []],
    totalProfit: 0,
    totalCoinsEarned: 0,
  }

  // NOTE: Convert dates to unix timestamps, which are in seconds since 1970.  This makes it easier to
  //       step over time in integer values.
  let currDate = moment(state.startDate).unix()
  const endDate = moment(state.endDate).unix()

  let pointNum = 0
  // const genesisBlockDate = moment(new Date('2019-01-15T17:38:05')).unix()

  // NOTE: Instead of using the genesis block, I used an actual timestamp and block number from a recent
  //       block.  This doesn't make a big difference, but with all the hashrate that came on the network
  //       it seemed like the block height was not what it should have been when I wrote the calculator.
  const startBlockDate = moment(new Date('2019-01-28T18:39:58')).unix()
  const startBlockHeight = 18768

  // NOTE: There is one block per every 60 seconds, so we figure out what the current block height should
  //       be if blocks are coming on schedule.
  let currBlockHeight = (currDate - startBlockDate) / BLOCK_TIME_SEC + startBlockHeight
  // let currBlockHeight = (currDate - genesisBlockDate) / BLOCK_TIME_SEC

  // NOTE: Figure out what the percentage of the block reward goes to the current algo (e.g., what
  //       percentage goes to Cuckatoo31 on the current date?).
  let algoSharePercent = getSharePercent(currBlockHeight)

  // NOTE: We iterate from the start date to the end date one minute at a time and figure out how much of
  //       the block reward goes to us.
  while (currDate <= endDate) {
    // Step one block
    const totalCoinsThisBlock = 60 * algoSharePercent

    // My percent
    // NOTE: Again, the state contains the inputs from the user like myGPS and networkGPS
    const mySharePercent = state.myGPS / state.networkGPS
    profitInfo.totalCoinsEarned += totalCoinsThisBlock * mySharePercent

    // NOTE: If we added a data point every minute, the graph gets way too much data and the graph
    //       becomes unbearably slow to renderr, so we only show one point per day (every 1440 seconds).

    // Add a data point once a day only to avoid too many data points for the graph
    if (pointNum % 1440 === 0) {
      profitInfo.data[0].push({
        x: new Date(currDate * 1000), // NOTE: We multiply by 1000, because dates are in milliseconds, not seconds
        y: profitInfo.totalCoinsEarned * state.priceAtEndDate,
      })
      profitInfo.data[1].push({ x: new Date(currDate * 1000), y: profitInfo.totalCoinsEarned })

      // NOTE: This should probably be moved so it is done every block, but it probably doesn't make
      //       much difference.  Could just move it out of the loop.
      // Update ASIC share of the POW (secondary algo is the GPU friendly one)
      algoSharePercent = getSharePercent(currBlockHeight)
    }
    pointNum++
    currBlockHeight++

    // Add one minute per block
    currDate += 60
  }

  // NOTE: In case data ends at a data point that is not a multiple of 1440, we add in one last data point.

  // Add a final data point
  profitInfo.data[0].push({
    x: new Date(currDate * 1000),
    y: profitInfo.totalCoinsEarned * state.priceAtEndDate,
  })
  profitInfo.data[1].push({ x: new Date(currDate * 1000), y: profitInfo.totalCoinsEarned })

  // Set the amount owing
  profitInfo.totalProfit = profitInfo.totalCoinsEarned * state.priceAtEndDate

  return profitInfo
}

var chart
var diffArr = []

function createChart() {
    Chart.defaults.LineWithLine = Chart.defaults.line;
        Chart.controllers.LineWithLine = Chart.controllers.line.extend({
           draw: function(ease) {
              Chart.controllers.line.prototype.draw.call(this, ease);
        
              if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                 var activePoint = this.chart.tooltip._active[0],
    
    
                 ctx = this.chart.ctx,
                 x = activePoint.tooltipPosition().x,
                 topY = this.chart.scales['y-axis-0'].top,
                 bottomY = this.chart.scales['y-axis-0'].bottom;
                
             // draw line
             ctx.save();
             ctx.beginPath();
             ctx.moveTo(x, topY);
             ctx.lineTo(x, bottomY);
             ctx.lineWidth = 2;
             ctx.strokeStyle = 'rgb(0, 0, 0, 0.4)';
             ctx.stroke();
             ctx.restore();
          }
       }
    });
    
    chart = new Chart(ctx, {
       type: 'LineWithLine',
       data: {
          labels: chartLabel,
          datasets: [{
             data: chartArr,
             borderColor: "#828427",
             backgroundColor: "rgb(162, 165, 28)",
             fill: true,
             label : ' Grin',
             datalabels : {
    			align	: 'end',
    			anchor : 'end',
    			display: true,
    			backgroundColor: function(context) {
    				return context.dataset.backgroundColor;
    			},
    			borderRadius: 4,
    			color: '#001f3f',
    			font: {
    				weight: 'bold'
    			}
		    }
          }, {
             data: chartProfitArr,
             borderColor: "USDChartBorderColor",
             backgroundColor: "USDChartColor",
             fill: true,
             label : ' USD',
             datalabels : {
    			align	: 'end',
    			anchor : 'end',
    			display: true,
    			backgroundColor: function(context) {
    				return context.dataset.backgroundColor;
    			},
    			borderRadius: 4,
    			color: '#001f3f',
    			font: {
    				weight: 'bold'
    			}
		    }
          }]
       },
       options: {
          responsive: false,
          tooltips: {
             intersect: false,
             mode: 'label'
          },
          legend: {
            display: false
          },
          scales: {
             yAxes: [{
                ticks: {
                   fontColor: tickColor,
                   beginAtZero: true
                }
             }],
             xAxes: [{
                    ticks: {
                        fontColor: tickColor,
                        beginAtZero: true
                    }
                }]
     
          }
       }
    });
}

function updateChart() {
    if (chart) {
        chart.data["labels"] = chartLabel
        chart.data["datasets"][0]["data"] = chartArr
        chart.data["datasets"][1]["data"] = chartProfitArr
        chart.data["datasets"][1]["backgroundColor"] = USDChartColor
        chart.data["datasets"][1]["borderColor"] = USDChartBorderColor
        chart.update()
    } else {
        createChart()
        updateChart()
        changeMode()
    }
    
}

var themeToggle = document.getElementById("diffToggleSwitch2")
if (localStorage.getItem('theme') == null) {
    themeToggle.checked = false
    tickColor = "black"
} else {
    var data = localStorage.getItem('theme')
    var newData = JSON.parse(data)
    themeToggle.checked = newData.Toggle
    tickColor = "white"
    ChangeTheme()
}

var modeToggle = document.getElementById("modeToggle")
if (localStorage.getItem("mode") == null) {
    modeToggle.checked = false
} else {
    var data = localStorage.getItem('mode')
    var newData = JSON.parse(data)
    modeToggle.checked = newData.Toggle
    changeMode()
}

var months = 1

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
    
    state = {startDate: startDateInput.value, endDate: endDateInput.value, priceAtEndDate: grinPriceAPIData.prices[grinPriceAPIData.prices.length - 1][1], myGPS: userHshrt.value, networkGPS: networkHshrt.value}
    var newProfit = getProfits(state)
    
    months = 0
    
    chartLabel = arrDateCreator(newProfit.data[0])
    chartArr = arrCoinsCreator(newProfit.data[1])
    chartProfitArr = arrProfitCreator(newProfit.data[0])
    updateChart()
}

function arrDateCreator(data) {
    diffArr = []
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var newArr = []
    var count = 1
    var oldMonth = data[0].x.getMonth() 
    for (var i = 0; i < data.length - 1; i++) {
        if (count == 1) {
            newArr.push(monthNames[data[i].x.getMonth()] + " " + data[i].x.getDate() + ", " + data[i].x.getFullYear())
            count = 0
            if (diffToggle.checked == true) {
                
                if (oldMonth != data[i].x.getMonth()) {
                    months += 1
                    
                    oldMonth = data[i].x.getMonth() 
                }
                diffArr.push(0 + .02 * months)
            } else {
                months = 0
                diffArr.push(0)
            }
        }
        count += 1
    }
    return newArr
}

function arrCoinsCreator(data) {
    var fee = poolFee.value / 100
    if (poolFee.value == ".") {
        fee = 0
    }
    var newArr = []
    for (var i = 0; i < data.length - 1; i++) {
        //if (months == 0) {
            //newArr.push(Math.round(((data[i].y) - ((data[i].y) * fee)) * 100) / 100)
        //} else {
            newArr.push(Math.round((((data[i].y) - ((data[i].y) * fee)) - ((data[i].y) - ((data[i].y) * fee)) * diffArr[i]) * 100) / 100)
        //}
    }
    return newArr
}

function arrProfitCreator(data) {
    var fee = poolFee.value / 100
    if (poolFee.value == ".") {
        fee = 0
    }
    
    var newArr = []
    for (var i = 0; i < data.length - 1; i++) {
        if (months == 0) {
            newArr.push(Math.round((((data[i].y) - ((data[i].y) * fee)) - ((((powerConsumtion.value * 24) * i) * elecCost.value) / 1000)) * 100) / 100)
            
        } else {
            if (i > 0) {
                
                newArr.push(Math.round((((((data[i].y) - ((data[i].y - data[i - 1].y) * diffArr[i])) - ((data[i].y) * diffArr[i])) - ((data[i].y) * fee)) - ((((powerConsumtion.value * 24) * i) * elecCost.value) / 1000)) * 100) / 100)
                //5484.64 - ((5484.64 - 5055.53) * 0.92) = 5089.86 *correct answer*
                //instead the answer is 4979.09 
                //The math is done incorrecly somewhere
            } else {
                newArr.push(Math.round(((((data[i].y) - ((data[i].y) * diffArr[i])) - ((data[i].y) * fee)) - ((((powerConsumtion.value * 24) * i) * elecCost.value) / 1000)) * 100) / 100)
            }
            
            
            //Fix
        }
    }

    if ((Math.round((((data[i].y) - ((data[i].y) * fee)) - ((((powerConsumtion.value * 24) * i) * elecCost.value) / 1000)) * 100) / 100) < 0) {
        
        USDChartColor = "rgb(153, 29, 29, 0.8)"
        USDChartBorderColor = "#842727"
    } else {
        USDChartColor = "rgb(29, 153, 48, 0.8)"
        USDChartBorderColor = "#27842e"
    }
    return newArr
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

var totalPresetHashrate
var totalPresetPower
var obelTotal
var obelPower
var innoTotal
var innoPower

function presetUpdate() {
    GRN1Mini.value = GRN1Mini.value.replace(/[^1234567890]/g, "")
    GRN1.value = GRN1.value.replace(/[^1234567890]/g, "")
    GRN1Immersion.value = GRN1Immersion.value.replace(/[^1234567890]/g, "")
    G32Mini.value = G32Mini.value.replace(/[^1234567890]/g, "")
    G32.value = G32.value.replace(/[^1234567890]/g, "")
    G321800.value = G321800.value.replace(/[^1234567890]/g, "")
    
    GRN1MiniPreset = GRN1Mini.value
    GRN1Preset = GRN1.value
    GRN1ImmersionPreset = GRN1Immersion.value
    G32MiniPreset = G32Mini.value
    G32Preset = G32.value
    G321800Preset = G321800.value
    
    //Obelisk GRN1-Mini
    if (GRN1MiniPreset >= 1 && GRN1MiniPreset < 999) {
        GRN1MiniPresetFinal = 70 * GRN1MiniPreset
        GRN1MiniPresetPower = 400 * GRN1MiniPreset
    }
    else if (GRN1MiniPreset >= 999) {
        GRN1Mini.value = 999
        GRN1MiniPresetFinal = 70 * 999
        GRN1MiniPresetPower = 400 * 999
    }
    else if (GRN1MiniPreset <= 0){
        GRN1MiniPresetFinal = 0
        GRN1MiniPresetPower = 0
    }
    
    //Obelisk GRN1
    if (GRN1Preset >= 1 && GRN1Preset < 999) {
        GRN1PresetFinal = 420 * GRN1Preset
        GRN1PresetPower = 2200 * GRN1Preset
    }
    else if (GRN1Preset >= 999) {
        GRN1.value = 999
        GRN1PresetFinal = 420 * 999
        GRN1PresetPower = 2200 * 999
    }
    else if (GRN1Preset <= 0){
        GRN1PresetFinal = 0
        GRN1PresetPower = 0
    }
    
    //Obelisk GRN1-Immersion
    if (GRN1ImmersionPreset >= 1 && GRN1ImmersionPreset < 999) {
        GRN1ImmersionPresetFinal = 840 * GRN1ImmersionPreset
        GRN1ImmersionPresetPower = 4400 * GRN1ImmersionPreset
    }
    else if (GRN1ImmersionPreset >= 999) {
        GRN1Immersion.value = 999
        GRN1ImmersionPresetFinal = 840 * 999
        GRN1ImmersionPresetPower = 4400 * 999
    }
    else if (GRN1ImmersionPreset <= 0){
        GRN1ImmersionPresetFinal = 0
        GRN1ImmersionPresetPower = 0
    }
    
    //Innosilicon G32-Mini
    if (G32MiniPreset >= 1 && G32MiniPreset < 999) {
        G32MiniPresetFinal = 21.5 * G32MiniPreset
        G32MiniPresetPower = 140 * G32MiniPreset
    }
    else if (G32MiniPreset >= 999) {
        G32Mini.value = 999
        G32MiniPresetFinal = 21.5 * 999
        G32MiniPresetPower = 140 * 999
    }
    else if (G32MiniPreset <= 0){
        G32MiniPresetFinal = 0
        G32MiniPresetPower= 0
    }
    
    //Innosilicon G32
    if (G32Preset >= 1 && G32Preset < 999) {
        G32PresetFinal = 100 * G32Preset
        G32PresetPower = 520 * G32Preset
    }
    else if (G32Preset >= 999) {
        G32.value = 999
        G32PresetFinal = 100 * 999
        G32PresetPower = 520 * 999
    }
    else if (G32Preset <= 0){
        G32PresetFinal = 0
        G32PresetPower = 0
    }
        
    //Innosilicon G32-1800
    if (G321800Preset >= 1 && G321800Preset < 999) {
        G321800PresetFinal = 328 * G321800Preset
        G321800PresetPower = 1800 * G321800Preset
    }
    else if (G321800Preset >= 999) {
        G321800.value = 999
        G321800PresetFinal = 328 * 999
        G321800PresetPower = 1800 * 999
    }
    else if (G321800Preset <= 0){
        G321800PresetFinal = 0
        G321800PresetPower = 0
    }
    
    
    obelTotal = GRN1MiniPresetFinal + GRN1PresetFinal + GRN1ImmersionPresetFinal
    obelPower = GRN1MiniPresetPower + GRN1PresetPower + GRN1ImmersionPresetPower
    
    innoTotal = G32MiniPresetFinal + G32PresetFinal + G321800PresetFinal
    innoPower = G32MiniPresetPower + G32PresetPower + G321800PresetPower
    
    totalPresetHashrate = innoTotal + obelTotal
    totalPresetPower = obelPower + innoPower
    userHshrt.value = totalPresetHashrate.toFixed(2)
    powerConsumtion.value = totalPresetPower.toFixed(2)
    
    liveHashrate()
}







































function changePage() {
    const logoDropdown = document.getElementById("logoDropdown")
    if (logoDropdown.selectedIndex == 0) {
        window.open("index.html", "_top");
    } else if(logoDropdown.selectedIndex == 1) {
        window.open("Grin.html", "_top");
    } else if(logoDropdown.selectedIndex == 2) {
        window.open("PoC.html", "_top");
    }
    
}

function BTCSet() {
    var coinAddress = "1DNEmupDWC873fDv4Lpy1xY2us6eYKwXTH"
    var coin = "BTC"
    var popup = document.getElementById("myPopup");
    const el = document.createElement('textarea');
    el.value = coinAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    popup.classList.toggle("show");
    setTimeout( () => {popup.classList.toggle("show")}, 3000);
}

function SIASet() {
    var coinAddress = "f7e6b31b7fbfd78894964d81e418ad0d1b9f0a8ae59be37e932e5853670feb89e0f4021df521"
    var coin = "SIA"
    var popup = document.getElementById("myPopup2");
    const el = document.createElement('textarea');
    el.value = coinAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    popup.classList.toggle("show");
    setTimeout( () => {popup.classList.toggle("show")}, 3000);
}

function XSCSet() {
    var coinAddress = "ebe11b2258f11caba02e7d2c1a5766b94175a5155d9e620a7f77a95d4bd1f5856fdb2d513cb3"
    var coin = "XSC"
    var popup = document.getElementById("myPopup3");
    const el = document.createElement('textarea');
    el.value = coinAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    popup.classList.toggle("show");
    setTimeout( () => {popup.classList.toggle("show")}, 3000);
}

function SCPSet() {
    var coinAddress = "bd187fa1c247a297e364d67ee59b66a4cbecec2d4a3cf2c01d4d5540c9d6a03f6279d40657a3"
    var coin = "SCP"
    var popup = document.getElementById("myPopup4");
    const el = document.createElement('textarea');
    el.value = coinAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    popup.classList.toggle("show");
    setTimeout( () => {popup.classList.toggle("show")}, 3000);
}

function Cash2Set() {
    var coinAddress = "27xnv8XecrsRBnVau4xinb5kuyMAbthiihVVPmZMJvsJ7Q2bKxwmRC2SaY6tGz57iBXieRarHcoGLFFWzQuVJbYdB2nCD1J"
    var coin = "Cash2"
    var popup = document.getElementById("myPopup5");
    const el = document.createElement('textarea');
    el.value = coinAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    popup.classList.toggle("show");
    setTimeout( () => {popup.classList.toggle("show")}, 3000);
}

function changeMode() {
    var simple = document.getElementById("simple");
    var advanced = document.getElementById("advanced")
    var networkDifficulty = document.getElementById("networkDifficulty")
    var Grin32Span = document.getElementById("Grin32Span")
    
    if (modeToggle.checked == true) {
        var data = {Toggle: modeToggle.checked}
        var strData = JSON.stringify(data)
        localStorage.setItem('mode', strData);
        simple.style.transform = "scale(.9)"
        advanced.style.transform = "scale(1.2)"
        networkDifficulty.style.removeProperty("display")
        Grin32Span.style.removeProperty("display")
    } else {
        var data = {Toggle: themeToggle.checked}
        var strData = JSON.stringify(data)
        localStorage.setItem('mode', strData);
        simple.style.transform = "scale(1.2)"
        advanced.style.transform = "scale(.9)"
        networkDifficulty.style.display = "none"
        Grin32Span.style.display = "none"
    }
}

function ChangeTheme() {
    var inputsTheme = document.getElementsByClassName("inputThemeJS");
    var poolLinkTheme = document.getElementsByClassName("coinPoolList");
    var presetDataTheme = document.getElementsByClassName("presetData");
    var tooltipIMG = document.getElementsByClassName("tooltipJS");
    
    if (themeToggle.checked == true) {
        tickColor = "white"
        if (chart) {
            chart.destroy()
        }
        createChart()
        updateChart()
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
        for (var i = 0; i < inputsTheme.length; i++) {
            inputsTheme[i].style.backgroundColor = "#90969b"
            inputsTheme[i].style.color = "white"
        }
        for (var i = 0; i < poolLinkTheme.length; i++) {
            poolLinkTheme[i].style.color = "#669fff"
        }
        for (var i = 0; i < presetDataTheme.length; i++) {
            presetDataTheme[i].style.color = "white"
        }
        
        for (var i = 0; i < tooltipIMG.length; i++) {
            tooltipIMG[i].style.filter = "invert(1)"
            
        }
        
    } else {
        tickColor = "black"
        if (chart) {
            chart.destroy()
        }
        createChart()
        updateChart()
        var data = {Toggle: themeToggle.checked}
        var strData = JSON.stringify(data)
        localStorage.setItem('theme', strData);
        var currentTheme = document.body.children
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
        for (var i = 0; i < poolLinkTheme.length; i++) {
            poolLinkTheme[i].style.removeProperty("color")
        }
        for (var i = 0; i < presetDataTheme.length; i++) {
            presetDataTheme[i].style.removeProperty("color")
        }
        for (var i = 0; i < tooltipIMG.length; i++) {
            tooltipIMG[i].style.removeProperty("filter")
        }
    }
}