import React from 'react';
import './SkeletonBase.css';

const SkeletonBase = ({ type }) => {
    return <div className={`skeleton ${type}`}></div>
};

export default SkeletonBase;