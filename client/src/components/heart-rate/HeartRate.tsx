import React, { Component } from 'react';
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

class HeartRate extends Component<IHeartRateProps> {

  public render(): JSX.Element {
    if (this.props.error) {
      return <ErrorMessage message={this.props.error}/>;
    }

    if (!this.props.data) {
      return <FileUpload uploadType={ActionType.HeartRateDataUploadStart} />;
    }

    return (
      <WeekDayAverage
        averageRate={this.props.data.averageRate}
        numberOfRecords={this.props.data.numberOfRecords}
        weekDay={this.props.data.weekDay}
      />

    );
  }
}

const mapStateToProps: MapStateToProps<IHeartRateProps, any, IAppState> = (state: IAppState): IHeartRateProps => {
  return {
    data: state.heartRate.data,
    error: state.heartRate.error
  };
};

export default connect(mapStateToProps)(HeartRate);
