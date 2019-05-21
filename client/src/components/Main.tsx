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
  userKeyFetch?: ActionCreator<IAction>;
  userKeyRemove?: ActionCreator<IAction>;
}

class Main extends Component<IMainProps> {
  private unloadHandler: EventListener;

  constructor(props: IMainProps) {
    super(props);

    this.unloadHandler = this.handleBeforeUnload.bind(this);
  }

  private handleBeforeUnload(): void {
    this.props.userKeyRemove();
  }

  public componentDidMount(): void {
    this.props.userKeyFetch();

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
          {this.props.isLoading ? <LandingPage /> : <Homepage />}
        </div>

        <div className="footer">
          <span>shealth-trends by Kovaja</span>
          <span>
            2019
            <span className="version">(0.0.4)</span>
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
      userKeyFetch: UserActionCreators.userKeyFetch,
      userKeyRemove: UserActionCreators.userKeyRemove
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
