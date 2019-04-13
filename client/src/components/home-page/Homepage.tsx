import Axios from 'axios';
import React, { ChangeEvent, Component } from 'react';
import './Homepage.css';

export default class Homepage extends Component {
  private file: File;

  private read(): Promise<string> {
    return new Promise((resolve, reject): void => {
      const reader = new FileReader();

      reader.onload = (): void => {
        if (reader.error) {
          reject(reader.error);
        }

        const stringResult =  reader.result as string;

        resolve(stringResult.split(';')[1]);
      };

      reader.readAsDataURL(this.file);
    });
  }

  private send(dataString: string): Promise<void> {
    return Axios.post('/api/csv/base64', {data: dataString})
    .then((response) => console.log(response));
  }

  public onButtonClick = () => {
    if ((this.file instanceof File) === false) {
      return;
    }

    this.read()
      .then(this.send.bind(this))
      .catch((e) => console.log('Boo boo', e));
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
