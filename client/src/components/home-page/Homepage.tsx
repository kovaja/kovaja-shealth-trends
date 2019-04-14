import Axios from 'axios';
import React, { ChangeEvent, Component } from 'react';
import ReactJson from 'react-json-view';
import './Homepage.css';

export interface IHompageState {
  json: object;
}

export default class Homepage extends Component<{}, IHompageState> {
  private file: File;

  constructor(props: any) {
    super(props);

    this.state = {
      json: null
    };
  }

  private send(file: File): void {
    Axios({
      data: file,
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      method: 'POST',
      url: '/api/csv/upload'
    })
      .then((r) => this.setState({ json: r.data[0] }))
      .catch((e) => console.log('Boo boo', e));
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
        <input type="file" onChange={this.onFileChange} />
        <button type="button" onClick={this.onButtonClick}>SEND</button>
        <hr />
        {this.state.json ? <ReactJson src={this.state.json} /> : null}
      </div>
      );
    }
  }
