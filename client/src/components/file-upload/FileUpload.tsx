import React, { ChangeEvent, Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { ActionType } from '../../enumerations/action-type';
import { ViewTypeLabel } from '../../enumerations/view-type';
import { IFileUploadActionPayload } from '../../interfaces/action-upload-payload.interface';
import { IAction } from '../../interfaces/action.interface';
import { IAppState } from '../../reducers/reducer';
import { DataActionCreators } from '../../utilities/data-action.creators';
import './FileUpload.css';

interface IFileUploadProps {
  title: string;
  uploadType?: ActionType;
  dispatchFileUploadStart?: ActionCreator<IAction>;
}

interface IFileUploadState {
  progress: number;
}

class FileUpload extends Component<IFileUploadProps, IFileUploadState> {
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

    this.props.dispatchFileUploadStart(this.props.uploadType, actionPayload);
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
      <div className="input-container">
        < hr />
        {this.state.progress > 0 ? <p>{this.state.progress}</p> : null}
        < input type="file" onChange={this.onFileChange} />
        <button type="button" className="pure-button" onClick={this.onButtonClick}>SEND</button>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IFileUploadProps, any, IAppState> = (state: IAppState): IFileUploadProps => {
  return {
    title: ViewTypeLabel[state.activeView]
  };
};

const mapDispatchToProps = (dispatch: any): ActionCreatorsMapObject<IAction> => {
  return bindActionCreators<IAction, ActionCreatorsMapObject<IAction>>(
    {
      dispatchFileUploadStart: DataActionCreators.dataUploadStart
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
