import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
} from '@syncfusion/ej2-react-charts';

import { useStateContext } from '../contexts/ContextProvider';

const Doughnut = ({ id, legendVisiblity, height }) => {
  const { currentMode } = useStateContext();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://mocki.io/v1/96af22b7-fc50-4a04-b466-e10e7944575a' // Replace with your API endpoint
        );

        // Assume the API returns data in the following format:
        // [{"category": "Electronics", "sales": 40}, {"category": "Furniture", "sales": 30}, ...]

        // Format the data to match the chart's data source structure
        const formattedData = response.data.map((item) => ({
          x: item.category, // Map to x-axis (label)
          y: item.sales,    // Map to y-axis (value)
          text: `${item.sales}%`, // Label text
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AccumulationChartComponent
      id={id}
      legendSettings={{ visible: legendVisiblity, background: 'white' }}
      height={height}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      tooltip={{ enable: true }}
    >
      <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Sale"
          dataSource={chartData}
          xName="x"
          yName="y"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
          dataLabel={{
            visible: true,
            name: 'text',
            position: 'Inside',
            font: {
              fontWeight: '600',
              color: '#fff',
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default Doughnut;
