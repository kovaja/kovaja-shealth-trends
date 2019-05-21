import Axios from 'axios';
import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { IAction } from '../interfaces/action.interface';
import { IAppState } from '../reducers/reducer';
import { UserActionCreators } from '../utilities/user-action.creators';
import Homepage from './home-page/Homepage';
import { LandingPage } from './landing-page/Landingpage';
import './Main.css';

interface IMainProps {
  isLoading: boolean;
  dispatchUserKeyFetch?: ActionCreator<IAction>;
  dispatchUserKeyRemove?: ActionCreator<IAction>;
}

class Main extends Component<IMainProps> {
  private unloadHandler: EventListener;

  constructor(props: IMainProps) {
    super(props);

    this.unloadHandler = this.handleBeforeUnload.bind(this);
  }

  private handleBeforeUnload(): void {
    this.props.dispatchUserKeyRemove();
  }

  public componentDidMount(): void {
    this.props.dispatchUserKeyFetch();

    window.addEventListener('beforeunload', this.unloadHandler);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('beforeunload', this.unloadHandler);
  }

  public onPingClick = () => {
    Axios.get('/api/ping')
      .then((r) => alert(r.data))
      .catch((e) => alert(e.message));
  }

  public render(): JSX.Element {
    return (
      <div className="app-container">
        <div className="header">
          <div>
            <h1>shealth trends</h1>
            <p>by Kovaja</p>
          </div>
          <div>
            <button className="pure-button" type="button" onClick={this.onPingClick}>PING</button>
          </div>
        </div>

        <div className="content">
          {this.props.isLoading ? <LandingPage /> : <Homepage />}
        </div>

        <div className="footer">
          <span>shealth-trends by Kovaja</span>
          <span>
            2019
            <span className="version">(0.0.5)</span>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IMainProps, any, IAppState> = (state: IAppState): IMainProps => {
  return {
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch: any): ActionCreatorsMapObject<IAction> => {
  return bindActionCreators<IAction, ActionCreatorsMapObject<IAction>>(
    {
      dispatchUserKeyFetch: UserActionCreators.userKeyFetch,
      dispatchUserKeyRemove: UserActionCreators.userKeyRemove
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
