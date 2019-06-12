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
      <div className="chart-info">
        <h4>Heart Rate</h4>
        <p className="m-0">Average and Median per week day</p>
        <p className="m-0">Total {props.numberOfRecords} records with {props.averageRate} average heart rate</p>
      </div>
      <div className="chart-data">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={10}
          domain={{ y: [50, 80] }}
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
    </div>
  );
}
