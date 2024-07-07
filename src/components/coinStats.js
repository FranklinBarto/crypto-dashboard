// src/BtcStatistics.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/coinstats.scss';

const CoinStats = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/bitcoin'
                );
                setStats(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const { market_data } = stats;

    return (
        <div className='statsContainer'>
            <div>
                <span>Current Price</span>
                <p> ${market_data?.current_price?.usd}</p>
            </div>
            <div>
                <span>Market Cap</span>
                <p>${market_data?.market_cap?.usd}</p>
            </div>
            <div>
                <span>Trading Volume</span>
                <p>${market_data?.total_volume?.usd}</p>
            </div>
            <div>
                <span>24h High</span>
                <p>${market_data?.high_24h?.usd}</p>
            </div>
            <div>
                <span>24h Low</span>
                <p>${market_data?.low_24h?.usd}</p>
            </div>
            <div>
                <span>Price Change (24h)</span>
                <p>${market_data?.price_change_percentage_24h}%</p>
            </div>

            <div className='timeFrames'>
                <button>1m</button>
                <button>5m</button>
                <button>15m</button>
                <button>30m</button>
                <button>1 hour</button>
                <button>1 day</button>
                <button>1 week</button>
                <button className='active'>1 month</button>
            </div>
        </div>
    );
};

export default CoinStats;