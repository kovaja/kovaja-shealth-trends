import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { ViewType, ViewTypeLabel } from '../../enumerations/view-type';
import { IAction } from '../../interfaces/action.interface';
import { IAppState } from '../../reducers/reducer';
import { ViewActionCreators } from '../../utilities/view-action.creators';
import './Menu.css';

interface IMenuProps {
  activeView: ViewType;
  dispatchChangeView?: ActionCreator<IAction>;
}

class Menu extends Component<IMenuProps> {
  constructor(props: any) {
    super(props);
  }

  private onMenuItemClicked(view: ViewType): void {
    this.props.dispatchChangeView(view);
  }

  private renderMenuItem(name: ViewType): JSX.Element {
    let cssClass = 'pure-menu-item pure-menu-item-dark';

    if (this.props.activeView === name) {
      cssClass += ' ' + 'pure-menu-selected';
    }

    return (
      <li className={cssClass} key={name}>
        <a
          href="#"
          className="pure-menu-link"
          onClick={this.onMenuItemClicked.bind(this, name)}
        >
          {ViewTypeLabel[name]}
        </a>
      </li>
    );
  }

  public render(): JSX.Element {
    return (
      <div className="pure-menu pure-menu-horizontal">
        <ul className="pure-menu-list">
          {Object.keys(ViewType).map((view: string) => this.renderMenuItem(view as ViewType))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IMenuProps, any, IAppState> = (state: IAppState): IMenuProps => {
  return {
    activeView: state.activeView
  };
};

const mapDispatchToProps = (dispatch: any): ActionCreatorsMapObject<IAction> => {
  return bindActionCreators<IAction, ActionCreatorsMapObject<IAction>>(
    {
      dispatchChangeView: ViewActionCreators.changeActiveView
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
