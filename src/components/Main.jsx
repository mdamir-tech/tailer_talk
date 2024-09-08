import React, { useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import ChartsHeader from './ChartsHeader';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
  SplineAreaSeries,
  DateTime
} from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../contexts/ContextProvider';

const dropdownData = [
  { Id: '1', Time: 'Last 30 Days' },
  { Id: '2', Time: 'Last 6 Months' },
  { Id: '3', Time: 'Last 1 Year' },
];

const barCustomSeries = [
  {
    dataSource: [
      { x: 'USA', y: 120 },
      { x: 'China', y: 110 },
      { x: 'Germany', y: 80 },
      { x: 'Russia', y: 70 },
      { x: 'Japan', y: 60 },
    ],
    xName: 'x',
    yName: 'y',
    name: 'Olympic Medal Counts - RIO',
    type: 'Column',
    fill: 'rgba(135, 206, 250, 0.4)',
    border: { width: 2 },
  },
];

const areaCustomSeries = [
  {
    dataSource: [
      { x: new Date('2024-01-01'), y: 2.5 },
      { x: new Date('2024-02-01'), y: 2.8 },
      { x: new Date('2024-03-01'), y: 3.0 },
      { x: new Date('2024-04-01'), y: 2.9 },
      { x: new Date('2024-05-01'), y: 3.1 },
      { x: new Date('2024-06-01'), y: 3.4 },
      { x: new Date('2024-07-01'), y: 3.5 },
    ],
    xName: 'x',
    yName: 'y',
    name: 'Inflation Rate',
    type: 'SplineArea',
    fill: 'rgba(135, 206, 250, 0.4)',
    border: { width: 2 },
  },
];

const pieChartData = [
  { x: 'Technology', y: 40 },
  { x: 'Finance', y: 25 },
  { x: 'Healthcare', y: 20 },
  { x: 'Energy', y: 10 },
  { x: 'Utilities', y: 5 },
];

const Main = () => {
  const { currentColor, currentMode } = useStateContext();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="mt-24">
      {/* Date Picker at the top */}
      <div className="mb-8 p-4 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <h2 className="text-xl mb-4">Select a Date:</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="p-2 border border-gray-300 rounded-md"
          style={{ width: '300px' }} // Inline style for custom width
          dateFormat="MM/dd/yyyy"
        />
      </div>

      {/* Grid container for responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie chart section */}
        <div className="m-4 md:m-10 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <ChartsHeader category="Pie" title="Project Cost Breakdown" />
          <div className="w-full">
            <PieChart id="chart-pie" data={pieChartData} legendVisiblity height="full" />
          </div>
        </div>

        {/* Line chart section */}
        <div className="m-4 md:m-10 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <ChartsHeader category="Line" title="Inflation Rate" />
          <div className="w-full">
            <LineChart />
          </div>
        </div>

        {/* Bar chart section */}
        <div className="m-4 md:m-10 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <ChartsHeader category="Bar" title="Olympic Medal Counts - RIO" />
          <div className="w-full">
            <ChartComponent
              id="charts-bar"
              primaryXAxis={{ valueType: 'Category', title: 'Categories' }}
              primaryYAxis={{ labelFormat: '{value}', title: 'Medals' }}
              chartArea={{ border: { width: 0 } }}
              tooltip={{ enable: true }}
              background={currentMode === 'Dark' ? '#33373E' : '#fff'}
              legendSettings={{ background: 'white' }}
            >
              <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
              <SeriesCollectionDirective>
                {barCustomSeries.map((item, index) => (
                  <SeriesDirective key={index} {...item} />
                ))}
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>

        {/* Area chart section */}
        <div className="m-4 md:m-10 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <ChartsHeader category="Area" title="Inflation Rate in Percentage" />
          <div className="w-full">
            <ChartComponent
              id="charts-area"
              primaryXAxis={{ valueType: 'DateTime', labelFormat: 'yMMM', edgeLabelPlacement: 'Shift' }}
              primaryYAxis={{ labelFormat: '{value}%', title: 'Inflation Rate' }}
              chartArea={{ border: { width: 0 } }}
              background={currentMode === 'Dark' ? '#33373E' : '#fff'}
              legendSettings={{ background: 'white' }}
            >
              <Inject services={[SplineAreaSeries, DateTime, Legend, Tooltip]} />
              <SeriesCollectionDirective>
                {areaCustomSeries.map((item, index) => (
                  <SeriesDirective key={index} {...item} />
                ))}
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
