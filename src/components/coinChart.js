import React, { useRef, useEffect, useState, useCallback } from 'react';
import axios from "axios";
import "../styles/coinChart.scss";

import {
  Chart,
  ChartCanvas,
  XAxis,
  YAxis,
  CandlestickSeries,
  BarSeries,
  MouseCoordinateX,
  MouseCoordinateY,
  CrossHairCursor,
  ZoomButtons,
  discontinuousTimeScaleProviderBuilder,
} from "react-financial-charts";
import * as d3 from "d3";

const CoinChart = () => {
  const chartRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 900, height: 500 }); // Default size
  const [isReady, setIsReady] = useState(false);

  const updateDimensions = useCallback(() => {
    if (chartRef.current) {
      const { offsetWidth, offsetHeight } = chartRef.current;
      setDimensions({
        width: offsetWidth,
        height: offsetHeight,
      });
      setIsReady(true);
    }
    // console.log(isReady)
  }, []);

  useEffect(() => {
    updateDimensions(); // Initial update

    const resizeObserver = new ResizeObserver(updateDimensions);

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    window.addEventListener('resize', updateDimensions);

    // Attempt to update dimensions after a short delay
    const timeoutId = setTimeout(updateDimensions, 100);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timeoutId);
    };
  }, [updateDimensions]);


  // useEffect(() => {
  //   if(isReady) {
  //     updateDimensions();
  //   }
  // }, [isReady]);

  const chartWidth = Math.max(dimensions.width * 0.95, 10); // Ensure minimum width
  const chartHeight = Math.max(dimensions.height * 0.9, 10); // Ensure minimum height

  const [candleData, setCandleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
        );
        const prices = response.data.prices;
        const volumes = response.data.total_volumes;

        if (prices && volumes) {
          const ohlcData = [];
          let currentDay = null;
          let open = 0, high = 0, low = Number.MAX_VALUE, close = 0, volume = 0;

          prices.forEach((price, index) => {
            const date = new Date(price[0]);
            const day = date.toISOString().split("T")[0];

            if (currentDay && currentDay !== day) {
              ohlcData.push({
                date: new Date(currentDay),
                open,
                high,
                low,
                close,
                volume,
              });

              open = price[1];
              high = price[1];
              low = price[1];
              close = price[1];
              volume = volumes[index][1];
              currentDay = day;
            } else {
              high = Math.max(high, price[1]);
              low = Math.min(low, price[1]);
              close = price[1];
              volume += volumes[index][1];
            }

            if (!currentDay) {
              currentDay = day;
              open = price[1];
              high = price[1];
              low = price[1];
              close = price[1];
              volume = volumes[index][1];
            }
          });

          if (currentDay) {
            ohlcData.push({
              date: new Date(currentDay),
              open,
              high,
              low,
              close,
              volume,
            });
          }

          setCandleData(ohlcData);
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

  const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => d.date);
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(candleData);

  const start = xAccessor(data[Math.max(0, data.length - 30)]);
  const end = xAccessor(data[data.length - 1]);
  const xExtents = [start, end];

  return (
    <div className="btc-stats-chart-container">
      <h2>Bitcoin Price (Last 30 Days) {isReady}</h2>
      <div ref={chartRef} className="line-chart">
        <ChartCanvas
          ratio={window.devicePixelRatio}
          width={chartWidth}
          height={chartHeight}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          data={data}
          seriesName="BTC"
          xScale={xScale}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
          xExtents={xExtents}
        >
          <Chart id={1} height={chartHeight * 0.7} yExtents={(d) => [d.high, d.low]}>
            <XAxis axisAt="bottom" orient="bottom" />
            <YAxis axisAt="left" orient="left" ticks={5} />
            <CandlestickSeries widthRatio={0.8} />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={d3.timeFormat("%Y-%m-%d")}
            />
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={d3.format(".2f")}
            />
          </Chart>
          <Chart id={2} origin={(w, h) => [0, h * 0.7]} height={chartHeight * 0.3} yExtents={(d) => d.volume}>
            <YAxis axisAt="left" orient="left" ticks={5} tickFormat={d3.format(".2s")} />
            <BarSeries yAccessor={(d) => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "#FF0000"} />
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={d3.format(".4s")}
            />
          </Chart>
          <CrossHairCursor />
          <ZoomButtons />
        </ChartCanvas>
      </div>
      <div className="bottom-bar">
       </div>
    </div>
  );
};

export default CoinChart;