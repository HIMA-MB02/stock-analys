/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './Details.css';
import { useDispatch, useSelector } from 'react-redux';
import { Charts, Loader } from '../../components';
import { fetchCryptoHistoricalData } from '../../redux/actions/actions';
import { useHistory } from 'react-router-dom';
import { routes } from '../../routes/Routes';

const Details = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const chartJSHistoricalDatas = useSelector(state => state.cryptoDataReducer.historicalDatas);
    const currentlySelectedCoin = useSelector(state => state.cryptoDataReducer.currentlySelectedCoin);
    const [chartData, setChartData] = React.useState(null);

    const getCurrecyFormat = (value) => {
        const nfObject = new Intl.NumberFormat('en-US');
        return `$${nfObject.format(value)}`;
    }
    const getClassName = (value) => {
        if (value > 0) return 'bg-success';
        else return 'bg-danger'
    }

    React.useEffect(() => {
        if (currentlySelectedCoin) {
            const cryptoFound = chartJSHistoricalDatas.filter((crypto) => crypto.symbol === currentlySelectedCoin.symbol)
            if (cryptoFound.length) {
                setChartData(cryptoFound[0].data);
            } else {
                const today = new Date();
                const previous = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
                dispatch(fetchCryptoHistoricalData(currentlySelectedCoin.symbol, previous, today));
            }
        } else if (history) {
            history.push(routes.home);
        }
    }, [currentlySelectedCoin, chartJSHistoricalDatas]);

    const renderChartData = () => {
        if (!chartData) {
            return <div className='chart-loader'><Loader /></div>
        } else {
            if (chartData.labels.length) {
                return <div className="charts-wrapper">
                    <Charts data={chartData} />
                </div>;
            } else {
                return <div className="container" >
                    <div className="row">
                        <div className="col-12 text-center text-danger">
                            <h4>No Chart Data Available</h4>
                        </div>
                    </div>
                </div>;
            }
        }
    }

    return (
        <div className='container section crypto-details'>
            <div className="row align-items-center">
                <div className="col-md-9 col-sm-12">
                    {currentlySelectedCoin && <div className="d-flex crypto-ids mb-3 mt-3">
                        <img className='coin-main-logo mr-1' src={currentlySelectedCoin.logo_url} alt={'img'} />
                        <h1 className='details-name mr-1'>{currentlySelectedCoin.name}</h1>
                        <div className="badge bg-light">{currentlySelectedCoin.symbol}</div>
                    </div>}
                    <hr className='hide-mobile'/>
                    {currentlySelectedCoin && <div className="d-flex justify-content-start align-items-center badges pt-2 pb-2 hide-mobile">
                        <div className="badge bg-dark mr-1 mt-1">HIGH: {getCurrecyFormat(parseFloat(currentlySelectedCoin.high).toFixed(2))}</div>
                        <div className="badge bg-dark mr-1 mt-1">RANK: #{currentlySelectedCoin.rank}</div>
                        <div className="badge bg-dark mr-1 mt-1">NO. EXCHANGES: #{currentlySelectedCoin.num_exchanges}</div>
                        <div className="badge bg-dark mt-1">MARKET CAP: {getCurrecyFormat(parseFloat(currentlySelectedCoin.market_cap).toFixed(2))}</div>
                    </div>}
                </div>
                <hr className='d-only-sm'/>
                <div className="col-md-3 col-sm-12 mobile-price-view">
                    <div className="d-flex align-items-center price-heading">
                        <div className="badge bg-light">
                            LTP
                        </div>
                    </div>
                    {currentlySelectedCoin && <div className="d-flex align-items-center price-margins">
                        <h1 className='details-name mr-1'>{getCurrecyFormat(parseFloat(currentlySelectedCoin.price).toFixed(2))}</h1>
                        <span className={`badge ${getClassName(Number(currentlySelectedCoin['1d'].price_change_pct))}`}>{Number(currentlySelectedCoin['1d'].price_change_pct).toFixed(2)}%</span>
                    </div>}
                </div>
                <hr className='hide-laptop'/>
                {currentlySelectedCoin && <div className="d-flex justify-content-start align-items-center badges pt-2 pb-2 hide-laptop">
                    <div className="badge bg-dark mr-1 mt-1">HIGH: {getCurrecyFormat(parseFloat(currentlySelectedCoin.high).toFixed(2))}</div>
                    <div className="badge bg-dark mr-1 mt-1">RANK: #{currentlySelectedCoin.rank}</div>
                    <div className="badge bg-dark mr-1 mt-1">NO. EXCHANGES: #{currentlySelectedCoin.num_exchanges}</div>
                    <div className="badge bg-dark mt-1">MARKET CAP: {getCurrecyFormat(parseFloat(currentlySelectedCoin.market_cap).toFixed(2))}</div>
                </div>}
            </div>
            <hr className='mb-3 mt-1' />
            <div className="row mt-5 align-items-center">
                <div className="col-md-12">
                    {renderChartData()}
                </div>
            </div>
        </div>
    )
};

export default Details;