// @flow
import React from 'react';
import { extendObservable, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';


class RateInput extends React.Component {
  _rank: number;
  _point: number;
  _onRankChange: (SyntheticInputEvent) => void;
  _onPointChange: (SyntheticInputEvent) => void;
  _disposer: () => mixed;

  props: {|
    rank?: number,
    point?: number,
    onChangeRate?: (number, number) => void,
    setting: Setting,
  |};

  constructor(props) {
    super(props);

    extendObservable(this, {
      _rank: 0,
      _point: 0,
    });

    this._onRankChange = (ev: SyntheticInputEvent) => {
      this._rank = parseInt(ev.target.value);
    };
    this._onPointChange = (ev: SyntheticInputEvent) => {
      this._point = parseInt(ev.target.value);
    };
  }

  render() {
    const {
      rank, point,
      setting,
    } = this.props;

    return (
      <div className="rate-input">
        <select
          name="rank"
          className="rate-input__rank"
          onChange={this._onRankChange}
          value={rank}
        >
          { setting.RANK.map((v, idx) => (
          <option key={idx} value={idx}>{v}</option>
          )) }
        </select>
        <input
          className="rate-input__point"
          type="number"
          name="point"
          maxLength={2}
          min={0} max={99}
          value={point}
          onChange={this._onPointChange}
        />
      </div>
    );
  }

  componentDidMount() {
    this._disposer = reaction(
      () => this._rank + this._point,
      () => {
        if (typeof this.props.onChangeRate === 'function') {
          this.props.onChangeRate(this._rank, this._point);
        }
      }
    );
  }

  componentWillUnmount() {
    this._disposer();
  }
}

export default inject(
  'setting',
)(observer(RateInput));
