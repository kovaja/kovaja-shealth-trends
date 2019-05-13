import Axios from 'axios';
import React, { ChangeEvent, Component } from 'react';
import ReactJson from 'react-json-view';
import { connect, MapStateToProps } from 'react-redux';
import { IAppState } from '../../reducers/reducer';
import FileUploadService from '../../services/file-upload.service';
import './Homepage.css';

interface IHompageState {
  json: object;
  progress: number;
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
      progress: 0
    };
  }

  private setProgress(progressEvent: ProgressEvent): void {
    const progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
    this.setState({ progress });
  }

  private send(file: File): void {
    FileUploadService.uploadFile(file, 'heart-rate', this.props.userKey,  this.setProgress.bind(this));
  }

  public onButtonClick = () => {
    if ((this.file instanceof File) === false) {
      return;
    }

    this.send(this.file);
  }

  public onPingClick = () => {
    Axios.get('/api/ping')
      .then((r) => console.log(r.data))
      .catch((e) => console.log('Boo boo', e));
  }

  public onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.file = event.target.files[0];
  }

  public render(): JSX.Element {
    return (
      <div className="full-background">
        {this.state.progress > 0 ? <p>{this.state.progress}</p> : null}
        <input type="file" onChange={this.onFileChange} />
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
