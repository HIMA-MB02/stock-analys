import getAPI from '../../api/getAPI'
import ACTION_TYPES from './actions.types'

let api = 'http://localhost:5000';
export const fetchCryptoListData = (start) => {
    const entriesLength = 20;
    return (dispatch) => {
        getAPI(`${api}/get_cryto_list/${start}/${entriesLength}`).then(res => {
            if (res.status === 500) {
                dispatch({
                    type: ACTION_TYPES.FETCH_CRYPTO_LIST_DATA,
                    payload: {
                        cryptoList: [],
                        isCryptoListLoading: false,
                        nextCryptoListPage: start
                    }
                })
                return;
            }
            console.log(res);
            dispatch({
                type: ACTION_TYPES.FETCH_CRYPTO_LIST_DATA,
                payload: {
                    cryptoList: res.data,
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
        getAPI(`${api}/get_historical_data/${symbol}/${encodeURIComponent(start.toISOString())}/${encodeURIComponent(end.toISOString())}`).then(res => {
            dispatch({
                type: ACTION_TYPES.FETCH_CRYPTO_HISTORICAL_DATA,
                payload: {
                    historicalData: { symbol, data: {
                        labels: res.data.labels,
                        datasets: [
                            {
                                label: "Price",
                                data: res.data.data,
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