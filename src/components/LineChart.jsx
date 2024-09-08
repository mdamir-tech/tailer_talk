import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
} from '@syncfusion/ej2-react-charts';

import { useStateContext } from '../contexts/ContextProvider';

const LineChart = () => {
  const { currentMode } = useStateContext();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://mocki.io/v1/96af22b7-fc50-4a04-b466-e10e7944575a'
        );
        const formattedData = response.data.map((item) => ({
          x: new Date(item.date), 
          y: item.sales,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={{
        valueType: 'DateTime',
        labelFormat: 'MMM y',
        intervalType: 'Months',
        edgeLabelPlacement: 'Shift',
      }}
      primaryYAxis={{ title: 'Sales', labelFormat: '${value}' }}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={chartData}
          xName="x"
          yName="y"
          type="Line"
          name="Sales"
          width={2}
          marker={{ visible: true, width: 10, height: 10 }}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
