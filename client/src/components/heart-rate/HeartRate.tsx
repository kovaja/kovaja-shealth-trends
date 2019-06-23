import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { IHeartRateOutputData } from '../../../../shared/api.schemas';
import { ActionType } from '../../enumerations/action-type';
import { IAppState } from '../../reducers/reducer';
import { ErrorMessage } from '../error/ErrorMessage';
import FileUpload from '../file-upload/FileUpload';
import { WeekDayAverage } from '../WeekDayAverage/WeekDayAverage';

interface IHeartRateProps {
  data: IHeartRateOutputData;
  error: string;
}

function HeartRate(props: IHeartRateProps) {
  if (props.error) {
    return <ErrorMessage message={props.error} />;
  }

  if (!props.data) {
    return <FileUpload uploadType={ActionType.HeartRateDataUploadStart} />;
  }

  return (
    <WeekDayAverage
      averageRate={props.data.averageRate}
      numberOfRecords={props.data.numberOfRecords}
      weekDay={props.data.weekDay}
    />

  );
}

const mapStateToProps: MapStateToProps<IHeartRateProps, any, IAppState> = (state: IAppState): IHeartRateProps => {
  return {
    data: state.heartRate.data,
    error: state.heartRate.error
  };
};

export default connect(mapStateToProps)(HeartRate);
