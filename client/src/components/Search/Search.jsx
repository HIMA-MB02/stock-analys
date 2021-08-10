import React from 'react';
import './Search.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchCryptoListValue } from '../../redux/actions/actions';

const Search = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(state => state.cryptoDataReducer.currentlySelectedSearchCryptoListValue);
    const handleChange = e => {
        dispatch(setSearchCryptoListValue(e.target.value));
    }
    return (
        <div className="form-group has-success">
            <input type="text" placeholder='Search by name' value={searchValue} className="form-control is-valid search-input" onChange={handleChange} />
            <div className="valid-feedback">Type in the name of the coin you want to search</div>
        </div>
    )
};

export default Search;