import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import { IHeartRateOutputData, IWeekDayRecord } from '../../../../shared/api.schemas';
import './WeekDayAverage.css';

export function WeekDayAverage(props: IHeartRateOutputData): JSX.Element {
  const getAverageLabel = (d: IWeekDayRecord): string => {
    return String(d.average);
  };

  const getMedianabel = (d: IWeekDayRecord): string => {
    return String(d.median);
  };

  return (
    <div className="chart-container">
      <h4>Heart Rate</h4>
      <p>Average and Median per week day</p>
      <p>Total {props.numberOfRecords} records with {props.averageRate} average heart rate</p>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={10}
        domain={{ y: [60, 80] }}
        height={300}
      >
        <VictoryScatter
          style={{ data: { fill: '#423e63' }, labels: { fontSize: 5 } }}
          size={4}
          data={props.weekDay}
          x="day"
          y="average"
          labels={getAverageLabel}
        />
        <VictoryScatter
          style={{ data: { fill: '#de1738' }, labels: { fontSize: 5 } }}
          size={4}
          data={props.weekDay}
          x="day"
          y="median"
          labels={getMedianabel}
        />
      </VictoryChart>
    </div>
  );
}
