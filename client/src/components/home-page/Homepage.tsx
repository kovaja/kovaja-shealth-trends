import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ViewType } from '../../enumerations/view-type';
import { IAppState } from '../../reducers/reducer';
import HeartRate from '../heart-rate/HeartRate';
import './Homepage.css';

interface IHompageProps {
  activeView: ViewType;
}

class Homepage extends Component<IHompageProps> {
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
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IHompageProps, any, IAppState> = (state: IAppState): IHompageProps => {
  return {
    activeView: state.activeView
  };
};

export default connect(mapStateToProps)(Homepage);
