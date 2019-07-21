/*
 * Copyright (c) 2018 by KizmoTek <KizmoTek@gmail.com>
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

var proxyUrl = 'https://cors-anywhere.herokuapp.com/'

const grinPriceAPI = "https://api.coingecko.com/api/v3/coins/grin/market_chart?vs_currency=usd&days=1"
var grinPriceAPILoad

const obeliskSaleAPI = "https://portal.obelisk.tech/api/orderCounts?showAll=yes"
var obeliskSaleAPILoad
var GRN1MiniSale = document.getElementById("GRN1-MiniSale")
var GRN1Sale = document.getElementById("GRN1Sale")
var GRN1IMMSale = document.getElementById("GRN1-IMMSale")
var totalHashrate = document.getElementById("totalHashrate")
var totalMiners = document.getElementById("totalMiners")
var diffPercentageInput = document.getElementById("diffPercentage")
var difficultyAddPercentage

var APILoaded = 0

let grinPriceAPIData = 0
fetch(proxyUrl + grinPriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
    fetch(proxyUrl + grinPriceAPI)
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
var totalProfitNumber = document.getElementById("totalProfitNumber")
var totalCoinsNumber = document.getElementById("totalCoinsNumber")
let hshrt

var startDateInput = document.getElementById("startDate")
var endDateInput = document.getElementById("endDate")

var USDChartColor = "rgb(29, 153, 48, 0.8)"
var USDChartBorderColor = "#27842e"

var G32Mini = document.getElementById("G32-Mini")
var G32MiniPreset = 0
var G32MiniPresetPower = 0
var G32MiniPresetFinal = 0

var G32 = document.getElementById("G32")
G32.value = 1
var G32Preset = 1
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
var newToday = yyyy + '-' + mm + '-' + dd

if (mm < 8 && yyyy == 2019) {
    startDateInput.value = "2019" + '-' + "08" + '-' + "01"
    
    endDateInput.value = "2019" + '-' + "09" + '-' + "01";
} else {
    startDateInput.value = newToday;
    
    if (mm == 1) {
        var tempYear = Number(yyyy)
        endDateInput.value = tempYear + 1 + '-' + 01 + '-' + dd;
    } else {
        var tempMonth = String(today.getMonth() + 2).padStart(2, '0');
        endDateInput.value = yyyy + '-' + tempMonth + '-' + dd;
    }
}

var prevDateEnd = endDateInput.value
var prevDateStart = startDateInput.value

function dateCheck() {
  if (startDateInput.value < newToday) {
    if (startDateInput.value == "") {
      startDateInput.value = prevDateStart
    } else {
      startDateInput.value = newToday
    }
  }
  if (endDateInput.value <= startDateInput.value) {
    if (endDateInput.value == "") {
      endDateInput.value = prevDateEnd
    } else {
      var newStartingDate = startDateInput.value.split("-")
      var newDay = parseInt(newStartingDate[2]) + 1
      
      if(newDay > 9 && newDay < 32) {
        newStartingDate[2] = newDay
      } else if(newDay <= 31){
        newStartingDate[2] = "0" + (parseInt(newStartingDate[2]) + 1)
      } else {
        newStartingDate[2] = 31
      }
      newStartingDate = newStartingDate.join("-")
      endDateInput.value = newStartingDate
    }
  }

  prevDateEnd = endDateInput.value
  prevDateStart = startDateInput.value
  liveHashrate()
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
const cc29PhaseOutEndDate = moment('12/31/2021').unix()

var state

function secondaryPowRatio(height) {
    const result = 90 - height / ((2 * YEAR_HEIGHT) / 90)
    return Math.max(0, result)
}

function getSharePercent(blockHeight, currDate, currAlgo) {
  if (Grin32Toggle.checked == true) {
      const afShare = (100 - secondaryPowRatio(Math.floor(blockHeight))) / 100

      let cc31Share = 1  // Starts at 100%
      if (currDate > cc31PhaseOutStartDate) {
        if (currDate < cc31PhaseOutEndDate) {
          cc31Share = (cc31PhaseOutEndDate - currDate) / (cc31PhaseOutEndDate - cc31PhaseOutStartDate)
        } else {
          cc31Share = 0
        }
      }

      if (currAlgo === 'cc31') {
        return cc31Share * afShare
      } else {
        return (1 - cc31Share) * afShare
      }
  } else {
      return (100 - secondaryPowRatio(Math.floor(blockHeight))) / 100
  }
}

var dayIndex = 0
var dayProfit = 0
var newState
var newPhaseOut
var hoursPerDataPoint

function dataPoint(totalData) {
  var result
  if (totalData / 30 > 0.8) {
    if(totalData >= 744 && totalData < 1464) {
      hoursPerDataPoint = totalData / 30
      result = hoursPerDataPoint * 60
    } else if(totalData >= 1464 && totalData < 2208) {
      hoursPerDataPoint = totalData / 40
      result = hoursPerDataPoint * 60
    } else if(totalData >= 2208 && totalData < 2928) {
      hoursPerDataPoint = totalData / 50
      result = hoursPerDataPoint * 60
    } else if(totalData >= 2928 && totalData < 3672) {
      hoursPerDataPoint = totalData / 60
      result = hoursPerDataPoint * 60
    } else if(totalData >= 3672 && totalData < 4416) {
      hoursPerDataPoint = totalData / 70
      result = hoursPerDataPoint * 60
    } else if(totalData >= 4416 && totalData < 5112) {
      hoursPerDataPoint = totalData / 80
      result = hoursPerDataPoint * 60
    } else if(totalData >= 5112 && totalData < 5856) {
      hoursPerDataPoint = totalData / 90
      result = hoursPerDataPoint * 60
    } else if(totalData >= 5856 && totalData < 6576) {
      hoursPerDataPoint = totalData / 100
      result = hoursPerDataPoint * 60
    } else if(totalData >= 6576 && totalData < 7320) {
      hoursPerDataPoint = totalData / 110
      result = hoursPerDataPoint * 60
    } else if(totalData >= 7320 && totalData < 8040) {
      hoursPerDataPoint = totalData / 120
      result = hoursPerDataPoint * 60
    } else if(totalData >= 8040 && totalData < 8784) {
      hoursPerDataPoint = totalData / 130
      result = hoursPerDataPoint * 60
    } else if(totalData >= 8784 && totalData < 9528) {
      hoursPerDataPoint = totalData / 140
      result = hoursPerDataPoint * 60
    } else if(totalData >= 9528 && totalData < 10248) {
      hoursPerDataPoint = totalData / 150
      result = hoursPerDataPoint * 60
    } else if(totalData >= 10248 && totalData < 10992) {
      hoursPerDataPoint = totalData / 160
      result = hoursPerDataPoint * 60
    } else if(totalData >= 10992 && totalData < 11712) {
      hoursPerDataPoint = totalData / 170
      result = hoursPerDataPoint * 60
    } else if(totalData >= 11712 && totalData < 12456) {
      hoursPerDataPoint = totalData / 180
      result = hoursPerDataPoint * 60
    } else if(totalData >= 12456 && totalData < 13200) {
      hoursPerDataPoint = totalData / 190
      result = hoursPerDataPoint * 60
    } else if(totalData >= 13200 && totalData < 13872) {
      hoursPerDataPoint = totalData / 200
      result = hoursPerDataPoint * 60
    } else if(totalData >= 13872 && totalData < 14616) {
      hoursPerDataPoint = totalData / 210
      result = hoursPerDataPoint * 60
    } else if(totalData >= 14616 && totalData < 15336) {
      hoursPerDataPoint = totalData / 220
      result = hoursPerDataPoint * 60
    } else if(totalData >= 15336 && totalData < 16080) {
      hoursPerDataPoint = totalData / 230
      result = hoursPerDataPoint * 60
    } else if(totalData >= 16080) {
      hoursPerDataPoint = totalData / 240
      result = hoursPerDataPoint * 60
    } else { //Incase if the statements above dont work
      hoursPerDataPoint = totalData / 30
      result = hoursPerDataPoint * 60
    }
  } else {
    hoursPerDataPoint = 1
    result = 60
  }
  return Math.round(result)
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

  var newStartDate = new Date(state.startDate)
  var newEndDate = new Date(state.endDate)

  var updateTime = 0

  var totalDatapoints = Math.round(Math.abs((newStartDate.getTime() - newEndDate.getTime())/(1*60*60*1000 /*hours*minutes*seconds*milliseconds*/)))
  var currMonth = 0
  var previouseDate

  updateTime = dataPoint(totalDatapoints)

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
  let cc31 = getSharePercent(currBlockHeight, currDate, "cc31")
  let cc32 = getSharePercent(currBlockHeight, currDate, "cc32")

  // NOTE: We iterate from the start date to the end date one minute at a time and figure out how much of
  //       the block reward goes to us.

  var normalProfit
  var difficultyProfit
  var poolFeeProfit

  while (currDate <= endDate) {
    //if (newStartDate)
    // Step one block
    const totalCoinsCC31 = 60 * cc31
    const totalCoinsCC32 = 60 * cc32

    // My percent
    // NOTE: Again, the state contains the inputs from the user like myGPS and networkGPS
    var mySharePercent
    if(cc31 < 0.2 && cc31 > 0) {
      mySharePercent = obelTotal / state.networkGPS
      normalProfit = (totalCoinsCC31 * mySharePercent) + (totalCoinsCC32 * (innoTotal * 0.2 / state.networkGPS))
    } else if(cc31 == 0) {
      mySharePercent = (innoTotal * 0.2) / state.networkGPS
      normalProfit = totalCoinsCC32 * mySharePercent
    } else {
      mySharePercent = state.myGPS / state.networkGPS
      normalProfit = totalCoinsCC31 * mySharePercent
    }
     
    
    
    difficultyProfit = normalProfit - (normalProfit * (difficultyAddPercentage * currMonth / 100))
    poolFeeProfit = difficultyProfit - (difficultyProfit * (poolFee.value / 100))
    
    dayProfit += poolFeeProfit
    
    // NOTE: If we added a data point every minute, the graph gets way too much data and the graph
    //       becomes unbearably slow to renderr, so we only show one point per day (every 1440 seconds).

    // Add a data point once a day only to avoid too many data points for the graph 
    if (pointNum % updateTime === 0) {
      dayIndex += 1
      profitInfo.totalCoinsEarned += dayProfit 
      dayProfit = 0
      
      profitInfo.data[0].push({
        x: new Date(currDate * 1000), // NOTE: We multiply by 1000, because dates are in milliseconds, not seconds
        y: profitInfo.totalCoinsEarned * state.priceAtEndDate,
      })
      profitInfo.data[1].push({ x: new Date(currDate * 1000), y: profitInfo.totalCoinsEarned })

      // NOTE: This should probably be moved so it is done every block, but it probably doesn't make
      //       much difference.  Could just move it out of the loop.
      // Update ASIC share of the POW (secondary algo is the GPU friendly one)
      cc31 = getSharePercent(currBlockHeight, currDate, "cc31")
      cc32 = getSharePercent(currBlockHeight, currDate, "cc32")
    }
    pointNum++
    currBlockHeight++

    // Add one minute per block
    previouseDate = new Date(currDate * 1000)
    
    currDate += 60
    var tempDate = new Date(currDate * 1000)
    if (previouseDate.getMonth() != tempDate.getMonth()) {
      currMonth += 1
    }
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
  dayProfit = 0
  dayIndex = 0
  return profitInfo
}

const getPhaseOut = (state) => {
  let currDate = moment(state.startDate).unix()
  const endDate = moment(state.endDate).unix()

  var newStartDate = new Date(state.startDate)
  var newEndDate = new Date(state.endDate)

  var updateTime = 0

  var totalDatapoints = Math.round(Math.abs((newStartDate.getTime() - newEndDate.getTime())/(1*60*60*1000 /*hours*minutes*seconds*milliseconds*/)))
  updateTime = dataPoint(totalDatapoints)

  const phaseOutInfo = {
    cc31: [],
    cc32: []
  }

  let pointNum = 0

  while (currDate <= endDate) {
    // First calculate the ar/af share
    let arShare = 0.9
    if (currDate < cc29PhaseOutEndDate) {
      const totalcc29Time = cc29PhaseOutEndDate - dayZero
      const elapsedcc29Time = Math.max(currDate, dayZero) - dayZero
      arShare = Math.max(arShare - (elapsedcc29Time / totalcc29Time), 0)
    } else {
      arShare = 0
    }

    // CC31
    let cc31Share = 1  // Starts at 100%
    if (currDate > cc31PhaseOutStartDate) {
      if (currDate < cc31PhaseOutEndDate) {
        cc31Share = (cc31PhaseOutEndDate - currDate) / (cc31PhaseOutEndDate - cc31PhaseOutStartDate)
      } else {
        cc31Share = 0
      }
    }

    // CC32
    let cc32Share = 1 - cc31Share
    const afShare = 1 - arShare
    cc32Share *= afShare
    cc31Share *= afShare

    if (pointNum % updateTime === 0) {
      phaseOutInfo.cc31.push({x: new Date(currDate * 1000), y: cc31Share})
      phaseOutInfo.cc32.push({x: new Date(currDate * 1000), y: cc32Share})
    }
    pointNum++

    currDate += 60
  }

return phaseOutInfo

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
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
             intersect: false,
             mode: 'label',
             callbacks: {
                label: function(tooltipItem, data) {
                  return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
                }
              }
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
    difficultyAddPercentage = 2
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
    diffPercentageInput.value = splitInput(diffPercentageInput.value)
    
    if (userHshrt.value == ".") {
        hshrt = 0
    }
    else {
        hshrt = userHshrt.value
    }
    
    if (poolFee.value > 100) {
        poolFee.value = 100
    }

    if (diffPercentageInput.value > 100) {
        diffPercentageInput.value = 100
    }

    if (diffToggle.checked == false) {
      difficultyAddPercentage = 0
    } else {
      difficultyAddPercentage = diffPercentageInput.value
    }

    newState = {startDate: startDateInput.value, endDate: endDateInput.value}
    newPhaseOut = getPhaseOut(newState)
    
    state = {startDate: startDateInput.value, endDate: endDateInput.value, priceAtEndDate: grinPriceAPIData.prices[grinPriceAPIData.prices.length - 1][1],    myGPS: userHshrt.value, networkGPS: networkHshrt.value}
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
    var oldMonth = data[0].x.getMonth() 
    for (var i = 0; i < data.length - 1; i++) {
      if (hoursPerDataPoint == 1) {
        newArr.push(data[i].x.getHours() + ":" + "00, " + monthNames[data[i].x.getMonth()] + " " + data[i].x.getDate())
      } else {
        newArr.push(monthNames[data[i].x.getMonth()] + " " + data[i].x.getDate() + ", " + data[i].x.getFullYear())
      }
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
        newArr.push(Math.round(data[i].y * 100) / 100)
    }
    totalCoinsNumber.innerHTML = (Math.round(newArr[newArr.length - 1] * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return newArr
}

function arrProfitCreator(data) {
    var fee = poolFee.value / 100
    if (poolFee.value == ".") {
        fee = 0
    }
    
    var newArr = []
    var tempProfit
    var tempPower
    var tempI
    for (var i = 0; i < data.length - 1; i++) {

      if(newPhaseOut.cc31[i].y > 0 || Grin32Toggle.checked == false) {
          newArr.push(Math.round(((data[i].y) - ((((powerConsumtion.value * hoursPerDataPoint/*24 = 1 day*/) * i) * elecCost.value) / 1000)) * 100) / 100)
          tempPower = (((powerConsumtion.value * hoursPerDataPoint/*24 = 1 day*/) * i) * elecCost.value) / 1000
          tempI = i
          tempProfit = Math.round(((data[i].y) - tempPower) * 100) / 100 //Optimize code
      } else if(innoTotal > 0) {
        var tempPower2 = (((innoPower * hoursPerDataPoint/*24 = 1 day*/) * (i - tempI)) * elecCost.value) / 1000
        newArr.push(Math.round(((data[i].y) - (tempPower2 + tempPower)) * 100) / 100)
      } else {
        newArr.push(tempProfit)
      }
    }
    if (tempProfit <= 0) {
        USDChartColor = "rgb(153, 29, 29, 0.8)"
        USDChartBorderColor = "#842727"
    } else {
        USDChartColor = "rgb(29, 153, 48, 0.8)"
        USDChartBorderColor = "#27842e"
    }
    totalProfitNumber.innerHTML = (Math.round(newArr[newArr.length - 1] * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
    G32Mini.value = G32Mini.value.replace(/[^1234567890]/g, "")
    G32.value = G32.value.replace(/[^1234567890]/g, "")
    G321800.value = G321800.value.replace(/[^1234567890]/g, "")
    
    G32MiniPreset = G32Mini.value
    G32Preset = G32.value
    G321800Preset = G321800.value
    
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
    
    
    obelTotal = 0
    obelPower = 0
    
    innoTotal = G32MiniPresetFinal + G32PresetFinal + G321800PresetFinal
    innoPower = G32MiniPresetPower + G32PresetPower + G321800PresetPower
    
    totalPresetHashrate = innoTotal + obelTotal
    totalPresetPower = obelPower + innoPower
    userHshrt.value = totalPresetHashrate.toFixed(2)
    powerConsumtion.value = totalPresetPower.toFixed(2)
    
    liveHashrate()
}



function changeMode() {
    var simple = document.getElementById("simple");
    var advanced = document.getElementById("advanced")
    var networkDifficulty = document.getElementById("networkDifficulty")
    var Grin32Span = document.getElementById("Grin32Span")
    var diffPercentage = document.getElementById("diffPercentageDiv")
    var diffLabel = document.getElementById("diffLabel")
    var diffSpan = document.getElementById("diffPercentageSpan")
    
    if (modeToggle.checked == true) {
        var data = {Toggle: modeToggle.checked}
        var strData = JSON.stringify(data)
        
        localStorage.setItem('mode', strData);
        simple.style.transform = "scale(.9)"
        advanced.style.transform = "scale(1.2)"
        networkDifficulty.style.removeProperty("display")
        Grin32Span.style.removeProperty("display")
        diffPercentage.style.removeProperty("display")
        diffLabel.style.display = "none"
        diffSpan.style.width = "146px"
        diffPercentageInput.value = 2
        difficultyAddPercentage = diffPercentageInput.value
        //liveHashrate()
    } else {
        var data = {Toggle: modeToggle.checked}
        var strData = JSON.stringify(data)
        localStorage.setItem('mode', strData);
        simple.style.transform = "scale(1.2)"
        advanced.style.transform = "scale(.9)"
        networkDifficulty.style.display = "none"
        Grin32Span.style.display = "none"
        diffPercentage.style.display = "none"
        diffLabel.style.removeProperty("display")
        diffSpan.style.removeProperty("width")
        diffPercentageInput.value = 2
        difficultyAddPercentage = 2
        //liveHashrate()
    }
}

function ChangeTheme() {
    var inputsTheme = document.getElementsByClassName("inputThemeJS");
    var poolLinkTheme = document.getElementsByClassName("coinPoolList");
    var presetDataTheme = document.getElementsByClassName("presetData");
    var tooltipIMG = document.getElementsByClassName("tooltipJS");
    var HomeIMG = document.getElementsByClassName("HomeIMG")
    var PresetTable = document.getElementsByClassName("preset")[0]
    var minersSoldTable = document.getElementsByClassName("minersSold")[0]
    
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
        HomeIMG[0].style.filter = "invert(1)"
        PresetTable.style.backgroundColor = "rgb(64, 66, 68)"
        minersSoldTable.style.backgroundColor = "rgb(64, 66, 68)"
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
        HomeIMG[0].style.removeProperty("filter")
        PresetTable.style.removeProperty("background-Color")
        minersSoldTable.style.removeProperty("background-Color")
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