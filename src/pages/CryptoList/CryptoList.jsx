/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './CryptoList.css';
import { useDispatch, useSelector } from 'react-redux';
import { CryptoListRow, Search } from '../../components';
import { fetchCryptoListData } from '../../redux/actions/actions';
import { SkeletonCryptoListRow } from '../../skeletons';

const CryptoList = () => {
    const dispatch = useDispatch();
    const nextCryptoPage = useSelector((state) => state.cryptoDataReducer.nextCryptoListPage);
    const searchValue = useSelector(state => state.cryptoDataReducer.currentlySelectedSearchCryptoListValue);
    const cryptoData = useSelector((state) => state.cryptoDataReducer.cryptoList);
    const [localCryptoDataState, setLocalCryptoDataState] = React.useState(null);
    const [priceSortToggle, setPriceSortToggle] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const tableRef = React.useRef(null);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 5) return;
        if (!loading) {
            dispatch(fetchCryptoListData(nextCryptoPage, 20));
            setLoading(true);
        }
    };

    React.useEffect(() => {
        if (cryptoData) {
            if (searchValue !== '') setLocalCryptoDataState(cryptoData.filter(options => options.name.toLowerCase().includes(searchValue.toLowerCase())));
            if (searchValue === '') setLocalCryptoDataState(cryptoData);
            setLoading(false);
        }
    }, [cryptoData, searchValue]);

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [nextCryptoPage, localCryptoDataState, loading]);

    React.useEffect(() => {
        if (!localCryptoDataState) {
            setLoading(true);
            dispatch(fetchCryptoListData(1, 20));
        }
    }, [localCryptoDataState]);

    const fetchMore = () => {
        setLoading(true);
        dispatch(fetchCryptoListData(nextCryptoPage, 20));
    };

    const sort = (e, dataKey) => {
        let sortedData = localCryptoDataState;
        sortedData.sort((a, b) => {
            return priceSortToggle * (a[dataKey] - b[dataKey]);
        });
        setPriceSortToggle(-1 * priceSortToggle);
        setLoading(true);
        setLocalCryptoDataState(sortedData)
    };

    const renderCryptoData = () => {
        if (localCryptoDataState.length) {
            return localCryptoDataState.map((crypto, index) => {
                return <CryptoListRow crypto={crypto} key={`crypto-currency-${index}`} />
            });
        } else {
            return null;
        }
    };

    const NotFound = () => {
        return (
            <tr className='error-row'>
                <td colSpan='8' className='align-cell-center'>Could not find what you're searching for</td>
            </tr>
        )
    };

    return (
        <div className="section container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-12">
                    <div className="container">
                        <Search />
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="container">
                        {/* <div className="row justify-content-end align-items-center">
                            <span className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label ml-1">
                                    Only include currenceries with graph
                                </label>
                            </span>
                        </div> */}
                        <div className='table-responsive'> 
                            <table className="table table-hover" ref={tableRef}>
                                <thead>
                                    <tr>
                                        <th className='align-cell-center table-heading' scope="col"><div className='btn rank-sort' onClick={(e) => sort(e, 'rank')}>#</div></th>
                                        <th className='table-heading' scope="col">COIN</th>
                                        <th className='table-heading' scope="col"></th>
                                        <th className='align-cell-center table-heading' scope="col">1D</th>
                                        <th className='align-cell-center table-heading' scope="col">30D</th>
                                        <th className='align-cell-right table-heading' scope="col" onClick={(e) => sort(e, 'market_cap')}><i className='fa fa-sort mr-1'></i>MARKET CAP</th>
                                        <th className='align-cell-right table-heading' scope="col">24H VOLUME</th>
                                        <th className='align-cell-right table-heading' scope="col" onClick={(e) => sort(e, 'price')}><i className='fa fa-sort mr-1'></i>PRICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {localCryptoDataState && renderCryptoData()}
                                    {(loading) && <SkeletonCryptoListRow times={5} />}
                                    {!loading && localCryptoDataState && !localCryptoDataState.length && <NotFound />}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {localCryptoDataState && localCryptoDataState.length < 10 && <div className="row justify-content-center align-items-center">
                <div className="col-md-12 text-center">
                    <button className="btn btn-primary" onClick={fetchMore}>Fetch More</button>
                </div>
            </div>}
        </div>
    )
};

export default CryptoList;