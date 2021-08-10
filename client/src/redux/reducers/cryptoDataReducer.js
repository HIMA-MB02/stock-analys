import ACTION_TYPES from "../actions/actions.types";

const initialState = {
    historicalDatas: [],
    nextCryptoListPage: 1,
    currentlySelectedCoin: null,
    currentlySelectedSearchCryptoListValue: '',
    cryptoList: []
};

export default function cryptoDataReducer(_state = initialState, { type, payload }) {
    switch (type) {
        case ACTION_TYPES.FETCH_CRYPTO_LIST_DATA:
            return {
                ..._state,
                cryptoList: [..._state.cryptoList, ...payload.cryptoList],
                isCryptoListLoading: payload.isCryptoListLoading,
                nextCryptoListPage: payload.nextCryptoListPage
            };
        case ACTION_TYPES.SET_SEARCH_CRYPTO_LIST_VALUE:
            return {
                ..._state,
                currentlySelectedSearchCryptoListValue: payload.currentlySelectedSearchCryptoListValue
            };
        case ACTION_TYPES.FETCH_CRYPTO_HISTORICAL_DATA:
            return {
                ..._state,
                historicalDatas: [..._state.historicalDatas, payload.historicalData]
            };
        case ACTION_TYPES.SET_CURRENTLY_SELECTED_COIN:
            return {
                ..._state,
                currentlySelectedCoin: payload.currentlySelectedCoin
            }
        default:
            return _state;
    }
}