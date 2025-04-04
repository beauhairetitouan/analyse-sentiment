import React from 'react';
import './Total.css';

const Percent = ({ tweets }) => {
    const total = tweets.length;
    if (total === 0) {
        return (
            <div className="total-count">
                <p>Aucun tweet trouvé</p>
            </div>
        );
    }
    else if (total === 1) {
        return (
            <div className="total-count">
                <p>1 tweet analysé</p>
            </div>
        );
    }
    else if (total > 1) {
        return (
            <div className="total-count">
                <p>{total} tweets analysés</p>
            </div>
        );
    }
};

export default Percent;
