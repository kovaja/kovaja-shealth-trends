import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { IWeekDayOutputData } from '../../../../shared/api.schemas';
import { ActionType } from '../../enumerations/action-type';
import { ViewType, ViewTypeLabel } from '../../enumerations/view-type';
import { IAppState } from '../../reducers/reducer';
import { ErrorMessage } from '../error/ErrorMessage';
import FileUpload from '../file-upload/FileUpload';
import { WeekDayAverage } from '../WeekDayAverage/WeekDayAverage';

interface ISleepProps {
  data: IWeekDayOutputData;
  error: string;
}

function Sleep(props: ISleepProps) {
  if (props.error) {
    return <ErrorMessage message={props.error} />;
  }

  if (!props.data) {
    return <FileUpload uploadType={ActionType.SleepDataUploadStart} />;
  }

  return (
    <WeekDayAverage
      data={props.data}
      title={ViewTypeLabel[ViewType.Sleep]}
    />
  );
}

const mapStateToProps: MapStateToProps<ISleepProps, any, IAppState> = (state: IAppState): ISleepProps => {
  return {
    data: state.sleep.data,
    error: state.sleep.error
  };
};

export default connect(mapStateToProps)(Sleep);
