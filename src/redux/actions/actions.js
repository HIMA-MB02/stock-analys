import { formatData } from '../../utils/utils';
import getAPI from '../../api/getAPI'
import ACTION_TYPES from './actions.types'

let api = 'https://api.nomics.com/v1';
export const fetchCryptoListData = (start) => {
    const entriesLength = 20;
    return (dispatch) => {
        getAPI(`${api}/currencies/ticker?key=75e23f1b7a3f2f43339b7de9bfe8acf68bb934ae&interval=1d,30d&convert=USD&sort=rank&per-page=${entriesLength}&page=${start}`).then(res => {
            if (res.status === 500) {
                dispatch({
                    type: ACTION_TYPES.FETCH_CRYPTO_LIST_DATA,
                    payload: {
                        cryptoList: null,
                        isCryptoListLoading: false,
                        nextCryptoListPage: start
                    }
                })
                return;
            }
            dispatch({
                type: ACTION_TYPES.FETCH_CRYPTO_LIST_DATA,
                payload: {
                    cryptoList: res,
                    isCryptoListLoading: false,
                    nextCryptoListPage: start + 1
                }
            })
        }).catch(err => {
            console.log(err);
        })
    };
}

export const fetchCryptoHistoricalData = (symbol, start, end) => {
    return (dispatch) => {
        
        getAPI(`${api}/exchange-rates/history?key=75e23f1b7a3f2f43339b7de9bfe8acf68bb934ae&currency=${symbol}&start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`).then(res => {
            const formattedData = formatData(res);
            dispatch({
                type: ACTION_TYPES.FETCH_CRYPTO_HISTORICAL_DATA,
                payload: {
                    historicalData: { symbol, data: {
                        labels: formattedData.labels,
                        datasets: [
                            {
                                label: "Price",
                                data: formattedData.data,
                                backgroundColor: "#277fe338",
                                borderColor: "#2780e3",
                                fill: true
                            }
                        ]
                    }}
                }
            })
        }).catch(err => {
            console.log(err);
        })
    };
};

export const setSearchCryptoListValue = (currentlySelectedSearchCryptoListValue) => {
    return {
        type: ACTION_TYPES.SET_SEARCH_CRYPTO_LIST_VALUE,
        payload: {
            currentlySelectedSearchCryptoListValue
        }
    }
}

export const setCurrentlySelectedCoin = (currentlySelectedCoin) => {
    return {
        type: ACTION_TYPES.SET_CURRENTLY_SELECTED_COIN,
        payload: {
            currentlySelectedCoin
        }
    }
};