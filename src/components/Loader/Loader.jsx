import React from 'react';

const Loader = () => {
    const [currentValue, setCurrentValue] = React.useState(30);
    React.useEffect(() => {
        if (currentValue && currentValue < 85) {
            setTimeout(() => {
                setCurrentValue(currentValue + 1)
            }, [10]);
        }
    }, [currentValue]);
    return (
        <div className="progress" style={{ height: `40px` }}>
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={currentValue} aria-valuemin="0" aria-valuemax="100" style={{ width: `${currentValue}%` }}></div>
        </div>
    )
};

export default Loader;