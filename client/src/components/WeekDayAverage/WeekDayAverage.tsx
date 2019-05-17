import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import { IWeekDayAverageData, IWeekDayAvgRecord } from '../../../../shared/api.schemas';
import './WeekDayAverage.css';

export function WeekDayAverage(props: IWeekDayAverageData): JSX.Element {
  const getLabel = (d: IWeekDayAvgRecord): string => {
    return String(d.value);
  };

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={10}
      height={300}
    >
      <VictoryScatter
        style={{ data: { fill: '#423e63' }, labels: { fontSize: 5 } }}
        size={4}
        data={props.dataset}
        x="day"
        y="value"
        labels={getLabel}
      />
    </VictoryChart>

  );
}
