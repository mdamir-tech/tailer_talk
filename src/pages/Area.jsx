import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  SplineAreaSeries,
  Legend,
  Tooltip,
} from '@syncfusion/ej2-react-charts';

import ChartsHeader from '../components/ChartsHeader';
import { useStateContext } from '../contexts/ContextProvider';

const Area = () => {
  const { currentMode } = useStateContext();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mocki.io/v1/96af22b7-fc50-4a04-b466-e10e7944575a');

        // Format the data to match the chart's data source structure
        const formattedData = response.data.map((item) => ({
          x: new Date(item.date), // Convert date string to Date object
          y: item.value, // Use the appropriate value from the API response
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Area" title="Inflation Rate in percentage" />
      <div className="w-full">
        <ChartComponent
          id="area-chart"
          height="420px"
          primaryXAxis={{
            valueType: 'DateTime',
            labelFormat: 'MMM y',
            intervalType: 'Months',
            edgeLabelPlacement: 'Shift',
          }}
          primaryYAxis={{ title: 'Inflation Rate', labelFormat: '{value}%' }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[SplineAreaSeries, DateTime, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={chartData}
              xName="x"
              yName="y"
              type="SplineArea"
              name="Inflation Rate"
              fill="rgba(135, 206, 250, 0.4)"
              border={{ width: 2 }}
              marker={{ visible: true, width: 10, height: 10 }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Area;
