// Copyright 2017-2019 Mind Juice Media Inc.
import * as moment from 'moment'
import { createSelector } from 'reselect' 

import { PhaseOutInfo, ProfitInfo, State } from './types'

export const getState = (state: State) => state
export const getCurrAlgo = (state: State) => state.currAlgo

export const getAlgoName = createSelector(getCurrAlgo, currAlgo => {
  switch (currAlgo) {
    case 'cuckaroo29':
      return 'Cuckaroo29'

    case 'cuckatoo31':
      return 'Cuckatoo31'

    case 'cuckatoo32':
      return 'Cuckatoo32'

    default:
      return '<UNKNOWN!>'
  }
})

export const getStartDate = (state: State) => state.startDate

export const getEndDate = (state: State) => state.endDate

export const getPriceAtEndDate = (state: State) => state.priceAtEndDate

export const getMyGPS = (state: State) => state.myGPS

export const getNetworkGPS = (state: State) => state.networkGPS

const BLOCK_TIME_SEC = 60

// The block subsidy amount, one grin per second on average
// const REWARD = BLOCK_TIME_SEC * 1 // 1 full grin per second

// Nominal height for standard time intervals, hour is 60 blocks
const HOUR_HEIGHT = 3600 / BLOCK_TIME_SEC

/// A day is 1440 blocks
const DAY_HEIGHT = 24 * HOUR_HEIGHT

/// A week is 10_080 blocks
const WEEK_HEIGHT = 7 * DAY_HEIGHT

/// A year is 524_160 blocks
const YEAR_HEIGHT = 52 * WEEK_HEIGHT

// const DEFAULT_EDGE_BITS = 31

// const BASE_EDGE_BITS = 24

const dayZero = moment('01/15/2019').unix()
const cc31PhaseOutStartDate = moment('01/15/2020').unix()
const cc31PhaseOutEndDate = moment('08/19/2020').unix()
const cc29PhaseOutEndDate = moment('12/31/2021').unix()

// function graphWeight(height: number, edgeBits: number): number {
//   let xprEdgeBits = edgeBits

//   const bitsOverMin = Math.max(0, edgeBits - DEFAULT_EDGE_BITS)

//   const expiryHeight = (1 << bitsOverMin) * YEAR_HEIGHT
//   if (height >= expiryHeight) {
//     xprEdgeBits = Math.max(0, xprEdgeBits - (1 + (height - expiryHeight) / WEEK_HEIGHT))
//   }

//   return 2 << ((edgeBits - BASE_EDGE_BITS) * xprEdgeBits)
// }

/// Ratio the secondary proof of work should take over the primary, as a
/// function of block height (time). Starts at 90% losing a percent
/// approximately every week. Represented as an integer between 0 and 100.
function secondaryPowRatio(height: number): number {
  const result = 90 - height / (2 * YEAR_HEIGHT / 90)
  return Math.max(0, result)
}

function getSharePercent(currAlgo: string, blockHeight: number, currDate: number) {
  switch (currAlgo) {
    case 'cuckaroo29':
      return secondaryPowRatio(Math.floor(blockHeight)) / 100

    case 'cuckatoo31':
    case 'cuckatoo32':
      const afShare = (100 - secondaryPowRatio(Math.floor(blockHeight))) / 100

      let cc31Share = 1  // Starts at 100%
      if (currDate > cc31PhaseOutStartDate) {
        if (currDate < cc31PhaseOutEndDate) {
          cc31Share = (cc31PhaseOutEndDate - currDate) / (cc31PhaseOutEndDate - cc31PhaseOutStartDate)
        } else {
          cc31Share = 0
        }
      }

      if (currAlgo === 'cuckatoo31') {
        return cc31Share * afShare
      } else {
        return (1 - cc31Share) * afShare
      }

    default:
      return 0
  }
}

export const getProfits = (state: State) => {
  const { currAlgo } = state

  const profitInfo: ProfitInfo = {
    data: [[], []],
    totalProfit: 0,
    totalCoinsEarned: 0,
  }

  // let currDate = moment(new Date()).unix()
  let currDate = moment(state.startDate).unix()
  const endDate = moment(state.endDate).unix()

  let pointNum = 0
  // const genesisBlockDate = moment(new Date('2019-01-15T17:38:05')).unix()
  const startBlockDate = moment(new Date('2019-01-28T18:39:58')).unix()
  const startBlockHeight = 18768

  let currBlockHeight = (currDate - startBlockDate) / BLOCK_TIME_SEC + startBlockHeight
  // let currBlockHeight = (currDate - genesisBlockDate) / BLOCK_TIME_SEC

  while (currDate <= endDate) {
    // Update ASIC share of the POW (secondary algo is the GPU friendly one)
    const algoSharePercent = getSharePercent(currAlgo, currBlockHeight, currDate)

    // Step one block
    const totalCoinsThisBlock = 60 * algoSharePercent

    // My percent
    const mySharePercent = state.myGPS / state.networkGPS
    profitInfo.totalCoinsEarned += totalCoinsThisBlock * mySharePercent

    // Add a data point once a day only to avoid too many data points for the graph
    if (pointNum % 1440 === 0) {
      profitInfo.data[0].push({
        x: new Date(currDate * 1000),
        y: profitInfo.totalCoinsEarned * state.priceAtEndDate,
      })
      profitInfo.data[1].push({ x: new Date(currDate * 1000), y: profitInfo.totalCoinsEarned })

    }

    pointNum++
    currBlockHeight++

    // Add one minute per block
    currDate += 60
  }

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

export const getPhaseOut = (state: State) => {
  let currDate = moment(state.startDate).unix()
  const endDate = moment(state.endDate).unix()

  const phaseOutInfo: PhaseOutInfo = {
    cc29: [],
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

    if (pointNum % 1440 === 0) {
      phaseOutInfo.cc29.push({x: new Date(currDate * 1000), y: arShare})
      phaseOutInfo.cc31.push({x: new Date(currDate * 1000), y: cc31Share})
      phaseOutInfo.cc32.push({x: new Date(currDate * 1000), y: cc32Share})
    }
    pointNum++

    currDate += 60
  }

return phaseOutInfo

}
