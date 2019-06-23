import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import { IWeekDayOutputData, IWeekDayRecord } from '../../../../shared/api.schemas';
import './WeekDayAverage.css';

export interface IWeekDayAverageProps {
  data: IWeekDayOutputData;
  title: string;
}

export function WeekDayAverage(props: IWeekDayAverageProps): JSX.Element {
  const data = props.data;

  const getAverageLabel = (d: IWeekDayRecord): string => {
    return String(d.average);
  };

  const getMedianabel = (d: IWeekDayRecord): string => {
    return String(d.median);
  };

  return (
    <div className="chart-container">
      <div className="chart-info">
        <h4>{props.title}</h4>
        <p className="m-0">Average and Median per week day</p>
        <p className="m-0">Total {data.numberOfRecords} records with {data.averageRate} average</p>
      </div>
      <div className="chart-data">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={10}
          domain={{ y: data.yDomain as any }}
          height={300}
        >
          <VictoryScatter
            style={{ data: { fill: '#423e63' }, labels: { fontSize: 5 } }}
            size={4}
            data={data.weekDay}
            x="day"
            y="average"
            labels={getAverageLabel}
          />
          <VictoryScatter
            style={{ data: { fill: '#de1738' }, labels: { fontSize: 5 } }}
            size={4}
            data={data.weekDay}
            x="day"
            y="median"
            labels={getMedianabel}
          />
        </VictoryChart>
      </div>
    </div>
  );
}
