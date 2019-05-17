import Axios from 'axios';
import React, { ChangeEvent, Component } from 'react';
import ReactJson from 'react-json-view';
import { connect, MapStateToProps } from 'react-redux';
import { IHeartRateOutputData, IWeekDayAverageData } from '../../../../shared/api.schemas';
import { IAppState } from '../../reducers/reducer';
import FileUploadService from '../../services/file-upload.service';
import { WeekDayAverage } from '../WeekDayAverage/WeekDayAverage';
import './Homepage.css';

interface IHompageState {
  json: object;
  progress: number;
  data: IWeekDayAverageData;
}

interface IHompageProps {
  userKey: number;
}

class Homepage extends Component<IHompageProps, IHompageState> {
  private file: File;

  constructor(props: any) {
    super(props);

    this.state = {
      json: null,
      progress: 0,
      data: null
    };
  }

  private setProgress(progressEvent: ProgressEvent): void {
    const progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
    this.setState({ progress });
  }

  private send(file: File): void {
    FileUploadService
      .uploadHeartRate(file, this.props.userKey, this.setProgress.bind(this))
      .then((data: IHeartRateOutputData) => {
        this.setState({
          ...this.state,
          data: data.weekDayAverage
        });
      });
  }

  public onButtonClick = () => {
    if ((this.file instanceof File) === false) {
      return;
    }

    this.send(this.file);
  }

  public onPingClick = () => {
    Axios.get('/api/ping')
      .then((r) => alert(r.data))
      .catch((e) => alert(e.message));
  }

  public onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.file = event.target.files[0];
  }

  public render(): JSX.Element {
    return (
      <div className="full-background">
        {this.state.data ? <WeekDayAverage dataset={this.state.data.dataset} title={this.state.data.title} /> : null}
        < hr />
        {this.state.progress > 0 ? <p>{this.state.progress}</p> : null}
        < input type="file" onChange={this.onFileChange} />
        <button type="button" onClick={this.onButtonClick}>SEND</button>
        <hr />
        <button type="button" onClick={this.onPingClick}>PING</button>
        <hr />
        {this.state.json ? <ReactJson src={this.state.json} /> : null}
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IHompageProps, any, IAppState> = (state: IAppState): IHompageProps => {
  return {
    userKey: state.userKey
  };
};

export default connect(mapStateToProps)(Homepage);
