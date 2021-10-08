/**
 * ************************************
 *
 * @module  inventoryReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */

import * as types from "../constants/actionTypes";

const initialState = {
 
};

const inventoryReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.ADD_INVENTORY:
      // increment lastMarketId and totalMarkets counters
      let lastMarketId = state.lastMarketId;
      const newLocation = action.payload;
      let totalMarkets = state.totalMarkets;
      let isLocationUnique = true;
      // create the new market object from provided data
      const newMarket = {
        // what goes in here?
        //marketID is going to be equal to state.lastMarketId
        marketId: lastMarketId,
        //location is going to be state.newLocation
        //cards is going to be zero
        newLocation: newLocation,
        cards: 0,
      };

      // push the new market onto a copy of the market list
      marketList = state.marketList.slice();
      marketList.forEach((market) => {
        if (newLocation === market.newLocation) {
          isLocationUnique = false;
        }
      });
      if (newMarket.newLocation !== "" && isLocationUnique === true) {
        lastMarketId = lastMarketId + 1;
        newMarket.marketId = lastMarketId;
        marketList.push(newMarket);
        totalMarkets += 1;
      }
      // return updated state
      return {
        ...state,
        marketList,
        lastMarketId,
        totalMarkets,
        newLocation,
      };

    case types.DELETE_INVENTORY:
      index = action.payload;
      marketList = state.marketList.slice();
      //get marketlist's index and increment its card property
      marketList[index].cards += 1;
      totalCards = state.totalCards + 1;
      return {
        ...state,
        marketList,
        totalCards,
      };

  }
};

export default marketsReducer;
