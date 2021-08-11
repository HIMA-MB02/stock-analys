import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentlySelectedCoin } from '../../redux/actions/actions';
import { routes } from '../../routes/Routes';

const CryptoListRow = ({ crypto }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const getCurrecyFormat = (value) => {
        const nfObject = new Intl.NumberFormat('en-US');
        return `$${nfObject.format(value)}`;
    }
    const getClassName = (value) => {
        if (value > 0) return 'text-success';
        else return 'text-danger'
    }
    const showCryptoDetails = () => {
        dispatch(setCurrentlySelectedCoin(crypto));
        history.push(routes.details);
    };

    return (
        <tr onClick={showCryptoDetails}>
            <td className='align-cell-center'>
                {crypto.rank}
            </td>
            <td className='align-cell-left mobile-crypto-name'><img className='coin-logo mr-2' src={crypto.logo_url} alt={'img'}/>{crypto.name}</td>
            <th>{crypto.symbol}</th>
            <th className={`align-cell-center ${getClassName(Number(crypto['1d'].price_change_pct))}`}>
                {Number(crypto['1d'].price_change_pct).toFixed(2)}%
            </th>
            <th className={`align-cell-center ${getClassName(Number(crypto['1d'].price_change_pct))}`}>
                {Number(crypto['30d'].price_change_pct).toFixed(1)}%
            </th>
            <td className='align-cell-right'>{getCurrecyFormat(Number(crypto.market_cap).toFixed(0))}</td>
            <td className='align-cell-right'>{getCurrecyFormat(Number(crypto['1d']['volume']).toFixed(0))}</td>
            <td className='align-cell-right'>{getCurrecyFormat(Number(crypto.price).toFixed(2))}</td>
        </tr>
    )
};

export default CryptoListRow;