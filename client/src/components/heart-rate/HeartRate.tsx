import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { IHeartRateOutputData } from '../../../../shared/api.schemas';
import { ActionType } from '../../enumerations/action-type';
import { IAppState } from '../../reducers/reducer';
import FileUpload from '../file-upload/FileUpload';
import { WeekDayAverage } from '../WeekDayAverage/WeekDayAverage';

interface IHeartRateProps {
  data: IHeartRateOutputData;
}

class HeartRate extends Component<IHeartRateProps> {
  public render(): JSX.Element {
    if (!this.props.data) {
      return (<FileUpload uploadType={ActionType.HeartRateDataUploadStart}/>);
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
    data: state.heartRate.data
  };
};

export default connect(mapStateToProps)(HeartRate);
