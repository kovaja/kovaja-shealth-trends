import React, { ChangeEvent, Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { IHeartRateOutputData } from '../../../../shared/api.schemas';
import { IFileUploadActionPayload } from '../../interfaces/action-upload-payload.interface';
import { IAction } from '../../interfaces/action.interface';
import { IAppState } from '../../reducers/reducer';
import { DataActionCreators } from '../../utilities/data-action.creators';
import { WeekDayAverage } from '../WeekDayAverage/WeekDayAverage';
import './Homepage.css';

interface IHompageState {
  progress: number;
}

interface IHompageProps {
  heartRateData: IHeartRateOutputData;
  dispatchHeartRateDataUploadStart?: ActionCreator<IAction>;
}

class Homepage extends Component<IHompageProps, IHompageState> {
  private file: File;

  constructor(props: any) {
    super(props);

    this.state = {
      progress: 0
    };
  }

  private setProgress(progressEvent: ProgressEvent): void {
    const progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
    this.setState({ progress });
  }

  private send(fileToSend: File): void {
    const actionPayload: IFileUploadActionPayload = {
      file: fileToSend,
      progressCallback: this.setProgress.bind(this)
    };

    this.props.dispatchHeartRateDataUploadStart(actionPayload);
  }

  private renderChart(): JSX.Element {
    return (
      <WeekDayAverage
        averageRate={this.props.heartRateData.averageRate}
        numberOfRecords={this.props.heartRateData.numberOfRecords}
        weekDay={this.props.heartRateData.weekDay}
      />
    );
  }

  private renderInput(): JSX.Element {
    // TODO: extract as component
    return (
      <div className="input-container">
        < hr />
        {this.state.progress > 0 ? <p>{this.state.progress}</p> : null}
        < input type="file" onChange={this.onFileChange} />
        <button type="button" className="pure-button" onClick={this.onButtonClick}>SEND</button>
      </div>
    );
  }

  public onButtonClick = () => {
    if ((this.file instanceof File) === false) {
      return;
    }

    this.send(this.file);
  }

  public onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.file = event.target.files[0];
  }

  public render(): JSX.Element {
    return (
      <div className="full-background">
        {this.props.heartRateData ? this.renderChart() : this.renderInput()}
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IHompageProps, any, IAppState> = (state: IAppState): IHompageProps => {
  return {
    heartRateData: state.heartRate.data
  };
};

const mapDispatchToProps = (dispatch: any): ActionCreatorsMapObject<IAction> => {
  return bindActionCreators<IAction, ActionCreatorsMapObject<IAction>>(
    {
      dispatchHeartRateDataUploadStart: DataActionCreators.hearRateDataUploadStart
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
