import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { ViewType } from '../../enumerations/view-type';
import { IAction } from '../../interfaces/action.interface';
import { IAppState } from '../../reducers/reducer';
import { DataActionCreators } from '../../utilities/data-action.creators';
import HeartRate from '../heart-rate/HeartRate';
import './Homepage.css';

interface IHompageProps {
  activeView: ViewType;
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
      default:
        return (<p>We are sorry, but this view is not implemented yet.</p>);
    }
  }

  public render(): JSX.Element {
    return (
      <div className="full-background">
        {this.renderView()}
        <button className="pure-button pure-button-primary" onClick={this.onTryAgainClick}>
          Try again
        </button>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IHompageProps, any, IAppState> = (state: IAppState): IHompageProps => {
  return {
    activeView: state.activeView
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
