import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { IWeekDayOutputData } from '../../../../shared/api.schemas';
import { ActionType } from '../../enumerations/action-type';
import { ViewType, ViewTypeLabel } from '../../enumerations/view-type';
import { IAppState } from '../../reducers/reducer';
import { ErrorMessage } from '../error/ErrorMessage';
import FileUpload from '../file-upload/FileUpload';
import { WeekDayAverage } from '../WeekDayAverage/WeekDayAverage';

interface IHeartRateProps {
  data: IWeekDayOutputData;
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
      data={props.data}
      title={ViewTypeLabel[ViewType.HeartRate]}
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
