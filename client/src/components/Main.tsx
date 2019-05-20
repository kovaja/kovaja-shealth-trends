import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { IAction, userKeyReceived } from '../actions/actions';
import { IAppState } from '../reducers/reducer';
import UserService from '../services/user.service';
import Homepage from './home-page/Homepage';
import { LandingPage } from './landing-page/Landingpage';
import './Main.css';

interface IMainProps {
  displayHomePage: boolean;
  userKey: number;
  userKeyReceived?: ActionCreator<IAction>;
}

class Main extends Component<IMainProps> {
  private unloadHandler: EventListener;

  constructor(props: IMainProps) {
    super(props);

    this.unloadHandler = this.handleBeforeUnload.bind(this);
  }

  private handleBeforeUnload(): void {
    UserService.removeUserDataBeforeUnload(this.props.userKey);
  }

  private onReceivedKey(key: number): void {
    this.props.userKeyReceived(key);
  }

  public componentDidMount(): void {
    UserService.initUser().then(this.onReceivedKey.bind(this));

    window.addEventListener('beforeunload', this.unloadHandler);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('beforeunload', this.unloadHandler);
  }

  public render(): JSX.Element {
    return (
      <div className="app-container">
        <div className="header">
          <h1>shealth trends</h1>
          <p>by Kovaja</p>
        </div>

        <div className="content">
          {this.props.displayHomePage ? <Homepage /> : <LandingPage />}
        </div>

        <div className="footer">
          <span>shealth-trends by Kovaja</span>
          <span>
            2019
            <span className="version">(0.0.2)</span>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IMainProps, any, IAppState> = (state: IAppState): IMainProps => {
  return {
    displayHomePage: typeof state.userKey === 'number',
    userKey: state.userKey
  };
};

const mapDispatchToProps = (dispatch: any): ActionCreatorsMapObject<IAction> => {
  return bindActionCreators<IAction, ActionCreatorsMapObject<IAction>>(
    { userKeyReceived },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
