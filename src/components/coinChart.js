// // 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=30'

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';

// import {
//     Chart,
//     ChartCanvas,
//     XAxis,
//     YAxis,
//     CandlestickSeries,
//     MouseCoordinateX,
//     MouseCoordinateY,
//     CrossHairCursor,
//     ZoomButtons,
//     withDeviceRatio,
//     withSize,
//     discontinuousTimeScaleProviderBuilder,
// } from 'react-financial-charts';

// import * as d3 from 'd3';

// // Register the components with Chart.js
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const CoinChart = () => {
//     const [candleData, setCandleData] = useState([]);
//     const [volumeChartData, setVolumeChartData] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(
//                     'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30'
//                 );
//                 const prices = response.data.prices;
//                 const volumes = response.data.total_volumes;

//                 if (prices && volumes) {
//                     const candleData = prices.map((price, index) => ({
//                         date: new Date(price[0]),
//                         open: price[1], // Ideally, you should have open, high, low, close values.
//                         high: price[1] * 1.01, // Mocking high price (1% higher)
//                         low: price[1] * 0.99, // Mocking low price (1% lower)
//                         close: price[1],
//                         volume: volumes[index][1]
//                     }));

//                     const labels = prices.map(price => new Date(price[0]).toLocaleDateString());

//                     const volumeData = {
//                         labels: labels,
//                         datasets: [
//                             {
//                                 label: 'Volume (USD)',
//                                 data: volumes.map(volume => volume[1]),
//                                 backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                                 borderColor: 'rgba(54, 162, 235, 1)',
//                                 borderWidth: 1
//                             }
//                         ],
//                     };

//                     setCandleData(candleData);
//                     setVolumeChartData(volumeData);
//                 }
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(d => d.date);

//     const {
//         data,
//         xScale,
//         xAccessor,
//         displayXAccessor,
//     } = xScaleProvider(candleData);

//     const start = xAccessor(data[data.length - 30]);
//     const end = xAccessor(data[data.length - 1]);
//     const xExtents = [start, end];

//     return (
//         <div>
//             {/* <h2>Bitcoin Candlestick Chart (Last 30 Days)</h2>
//             <ChartCanvas
//                 height={500}
//                 ratio={1}
//                 width={900}
//                 margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
//                 data={data}
//                 seriesName="BTC"
//                 xScale={xScale}
//                 xAccessor={xAccessor}
//                 displayXAccessor={displayXAccessor}
//                 xExtents={xExtents}
//             >
//                 <Chart id={1} yExtents={d => [d.high, d.low]}>
//                     <XAxis axisAt="bottom" orient="bottom" />
//                     <YAxis axisAt="left" orient="left" ticks={5} />
//                     <CandlestickSeries widthRatio={0.8} />
//                     <MouseCoordinateX
//                         at="bottom"
//                         orient="bottom"
//                         displayFormat={d3.timeFormat("%Y-%m-%d")}
//                     />
//                     <MouseCoordinateY
//                         at="left"
//                         orient="left"
//                         displayFormat={d3.format(".2f")}
//                     />
//                 </Chart>
//                 <CrossHairCursor />
//                 <ZoomButtons />
//             </ChartCanvas> */}
//             <h2>Bitcoin Volume (Last 30 Days)</h2>
//             <Bar data={volumeChartData} />
//         </div>
//     );
// };

// export default withSize({ style: { minHeight: 600 } })(withDeviceRatio()(CoinChart));


// src/BtcStatsChart.js

import React, { useEffect, useState } from 'react';

import '../styles/coinChart.scss';

import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CoinChart = () => {
    const [priceChartData, setPriceChartData] = useState({});
    const [volumeChartData, setVolumeChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30'
                );
                const prices = response.data.prices;
                const volumes = response.data.total_volumes;

                if (prices && volumes) {
                    const labels = prices.map(price => new Date(price[0]).toLocaleDateString());

                    const priceData = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Bitcoin Price (USD)',
                                data: prices.map(price => price[1]),
                                borderColor: 'rgba(75,192,192,1)',
                                backgroundColor: 'rgba(75,192,192,0.2)',
                                fill: false,
                            }
                        ],
                    };

                    const volumeData = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Volume (USD)',
                                data: volumes.map(volume => volume[1]),
                                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }
                        ],
                    };

                    setPriceChartData(priceData);
                    setVolumeChartData(volumeData);
                }
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

    return (
        <div className="btc-stats-chart-container">
            <h2>Bitcoin Price (Last 30 Days)</h2>
            <div className="line-chart">
                <Line data={priceChartData} />
            </div>
            <h2>Bitcoin Volume (Last 30 Days)</h2>
            <div className="bar-chart">
                <Bar data={volumeChartData} />
            </div>
        </div>
    )
};

export default CoinChart;
