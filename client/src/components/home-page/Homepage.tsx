import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { ViewType } from '../../enumerations/view-type';
import { IAction } from '../../interfaces/action.interface';
import { IAppState } from '../../reducers/reducer';
import { DataActionCreators } from '../../utilities/data-action.creators';
import HeartRate from '../heart-rate/HeartRate';
import Sleep from '../sleep/Sleep';
import './Homepage.css';

interface IHompageProps {
  activeView: ViewType;
  displayTryAgain: boolean;
  dispatchDataReset?: ActionCreator<IAction>;
}

class Homepage extends Component<IHompageProps> {
  private onTryAgainClick = (): void => {
    this.props.dispatchDataReset(this.props.activeView);
  }

  private renderView(): JSX.Element {
    switch (this.props.activeView) {
      case ViewType.HeartRate:
        return <HeartRate />;
      case ViewType.Sleep:
        return <Sleep />;
      default:
        return (<p>We are sorry, but this view is not implemented yet.</p>);
    }
  }

  private renderTryAgainButton(): JSX.Element {
    return (
      <button className="pure-button pure-button-primary" onClick={this.onTryAgainClick}>
        Try again
      </button>
    );
  }

  public render(): JSX.Element {
    return (
      <div className="full-background">
        {this.renderView()}
        {this.props.displayTryAgain ? this.renderTryAgainButton() : null}
      </div>
    );
  }
}

const displayTryAgain = (state: IAppState): boolean => {
  return state.heartRate.data !== null || state.heartRate.error !== null ||
  state.sleep.data !== null || state.sleep.error !== null;
};

const mapStateToProps: MapStateToProps<IHompageProps, any, IAppState> = (state: IAppState): IHompageProps => {
  return {
    activeView: state.activeView,
    displayTryAgain: displayTryAgain(state)
  };
};

const mapDispatchToProps = (dispatch: any): ActionCreatorsMapObject<IAction> => {
  return bindActionCreators<IAction, ActionCreatorsMapObject<IAction>>(
    {
      dispatchDataReset: DataActionCreators.dataReset
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
