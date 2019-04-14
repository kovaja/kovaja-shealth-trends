import Axios from 'axios';
import React, { ChangeEvent, Component } from 'react';
import './Homepage.css';

export default class Homepage extends Component {
  private file: File;

  private send(file: File): Promise<void> {
    return Axios({
      data: file,
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      method: 'POST',
      url: '/api/csv/upload'
    }).then((r) => console.log(r));
  }

  public onButtonClick = () => {
    if ((this.file instanceof File) === false) {
      return;
    }

    this.send(this.file).catch((e) => console.log('Boo boo', e));
  }

  public onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.file = event.target.files[0];
  }

  public render(): JSX.Element {
    return (
      <div className="full-background">
        <input type="file" onChange={this.onFileChange} />
        <button type="button" onClick={this.onButtonClick}>SEND</button>

      </div>
    );
  }
}
