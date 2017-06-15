// @flow
import React from 'react';
import { computed, extendObservable } from 'mobx';
import { inject, observer } from 'mobx-react';

import ModeInput from '../shared/mode-input';
import RateInput from '../shared/rate-input';
import ResultInput from '../shared/result-input';
import SingleBtn from '../shared/single-btn';
import MultiStageInput from './multi-stage-input';

import type UiStore from '../../store/ui';
import type Event from '../../event';


class AddLogModal extends React.Component {
  _mode: number;
  _stage: number;
  _stages: Array<number>;
  _stageLane: number;
  _rate: number;
  _rank: number;
  _point: number;
  _result: number;
  _canAdd: boolean;
  _onChangeMode: (number) => void;
  _onChangeStage: (number) => void;
  _onChangeRate: (Rate) => void;
  _onChangeResult: (number) => void;
  _onClickAdd: () => void;

  props: {|
    ui: UiStore,
    event: Event,
  |};

  constructor(props) {
    super(props);

    extendObservable(this, {
      _mode: 1,
      _stage: 1,
      _rate: computed(() => {
        return this._rank + this._point;
      }),
      _rank: 0,
      _point: 10,
      _result: 1,
      _canAdd: computed(() => {
        if (isNaN(this._point)) { return false; }
        return true;
      }),
    });

    this._onChangeMode = mode => {
      this._mode = mode;
    };
    this._onChangeStage = stage => {
      this._stage = stage;
    };
    this._onChangeRate = ({ rank, point }) => {
      this._rank = rank;
      this._point = point;
    };
    this._onChangeResult = result => {
      this._result = result;
    };
    this._onClickAdd = () => {
      this.props.event.onClickAddLog({
        mode: this._mode,
        stage: this._stage,
        rate: this._rate,
        result: this._result,
      });
    };
  }

  render() {
    const { ui, event } = this.props;

    return (
      <div className={`add-log-modal ${ui.isAddLogModalOpen ? 'add-log-modal--opened' : ''}`}>
        <header className="app-header">
          <button
            className="app-header__action"
            type="button"
            onClick={event.onClickCloseAddLogModal}
          >
            <span className="ft-ika">キャンセル</span>
          </button>
        </header>
        <div>
          <ModeInput
            mode={this._mode}
            onChangeMode={this._onChangeMode}
          />
          <MultiStageInput
            onChangeStage={this._onChangeStage}
          />
          <RateInput
            rank={this._rank}
            point={this._point}
            onChangeRate={this._onChangeRate}
          />
          <ResultInput
            result={this._result}
            onChangeResult={this._onChangeResult}
          />
          <SingleBtn
            onClick={this._onClickAdd}
            disabled={this._canAdd === false}
            text="キロク"
          />
        </div>
      </div>
    );
  }
}

export default inject(
  'ui',
  'event',
)(observer(AddLogModal));