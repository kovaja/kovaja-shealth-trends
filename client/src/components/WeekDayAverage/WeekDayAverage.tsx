import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import { IWeekDayAverageData, IWeekDayAvgRecord } from '../../../../shared/api.schemas';
import './WeekDayAverage.css';

export function WeekDayAverage(): JSX.Element {
  const props: IWeekDayAverageData = {
    title: 'Test',
    dataset: [
      { day: 'Mo', value: 45 },
      { day: 'Tu', value: 50 },
      { day: 'We', value: 65 },
      { day: 'Th', value: 110 },
      { day: 'Fr', value: 95 },
      { day: 'Sa', value: 40 },
      { day: 'Su', value: 70 }
    ]
  };

  const getLabel = (d: IWeekDayAvgRecord): string => {
    return String(d.value);
  };

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={10}
      height={300}
    >
      <VictoryBar
        style={{ data: { fill: '#c43a31' } }}
        data={props.dataset}
        x="day"
        y="value"
        labels={getLabel}
      />
    </VictoryChart>

  );
}
