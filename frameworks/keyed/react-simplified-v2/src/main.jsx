import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';

function random(max) {
  return Math.round(Math.random() * 1000) % max;
}

const A = [
  'pretty',
  'large',
  'big',
  'small',
  'tall',
  'short',
  'long',
  'handsome',
  'plain',
  'quaint',
  'clean',
  'elegant',
  'easy',
  'angry',
  'crazy',
  'helpful',
  'mushy',
  'odd',
  'unsightly',
  'adorable',
  'important',
  'inexpensive',
  'cheap',
  'expensive',
  'fancy'
];
const C = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
const N = [
  'table',
  'chair',
  'house',
  'bbq',
  'desk',
  'car',
  'pony',
  'cookie',
  'sandwich',
  'burger',
  'pizza',
  'mouse',
  'keyboard'
];

let nextId = 1;

function buildData(count) {
  const data = new Array(count);
  for (let i = 0; i < count; i++) {
    data[i] = {
      id: nextId++,
      label: `${A[random(A.length)]} ${C[random(C.length)]} ${N[random(N.length)]}`
    };
  }
  return data;
}

const GlyphIcon = <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>;

class Row extends Component {
  onSelect = () => {
    this.props.select(this.props.item);
  };

  onRemove = () => {
    this.props.remove(this.props.item);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item || nextProps.selected !== this.props.selected;
  }

  render() {
    let { selected, item } = this.props;
    return (
      <tr className={selected ? 'danger' : ''}>
        <td className="col-md-1">{item.id}</td>
        <td className="col-md-4">
          <a onClick={this.onSelect}>{item.label}</a>
        </td>
        <td className="col-md-1">
          <a onClick={this.onRemove}>{GlyphIcon}</a>
        </td>
        <td className="col-md-6"></td>
      </tr>
    );
  }
}

function Button({ id, cb, title }) {
  return (
    <div className="col-sm-6 smallpad">
      <button type="button" className="btn btn-primary btn-block" id={id} onClick={cb}>
        {title}
      </button>
    </div>
  );
}

class Jumbotron extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { run, runLots, add, update, clear, swapRows } = this.props;
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-md-6">
            <h1>react-simplified keyed</h1>
          </div>
          <div className="col-md-6">
            <div className="row">
              <Button id="run" title="Create 1,000 rows" cb={run} />
              <Button id="runlots" title="Create 10,000 rows" cb={runLots} />
              <Button id="add" title="Append 1,000 rows" cb={add} />
              <Button id="update" title="Update every 10th row" cb={update} />
              <Button id="clear" title="Clear" cb={clear} />
              <Button id="swaprows" title="Swap Rows" cb={swapRows} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Main extends Component {
  data = [];
  selected = 0;

  run = () => {
    this.data = buildData(1000);
    this.selected = 0;
  };

  runLots = () => {
    this.data = buildData(10000);
    this.selected = 0;
  };

  add = () => {
    this.data = this.data.concat(buildData(1000));
  };

  update = () => {
    const data = this.data;
    for (let i = 0; i < data.length; i += 10) {
      const item = data[i];
      data[i] = { id: item.id, label: item.label + ' !!!' };
    }
  };

  select = item => {
    this.selected = item.id;
  };

  remove = item => {
    const data = this.data;
    data.splice(data.indexOf(item), 1);
  };

  clear = () => {
    this.data = [];
    this.selected = 0;
  };

  swapRows = () => {
    const data = this.data;
    if (data.length > 998) {
      let temp = data[1];
      data[1] = data[998];
      data[998] = temp;
    }
  };

  render() {
    return (
      <div className="container">
        <Jumbotron
          run={this.run}
          runLots={this.runLots}
          add={this.add}
          update={this.update}
          clear={this.clear}
          swapRows={this.swapRows}
        />
        <table className="table table-hover table-striped test-data">
          <tbody>
            {this.data.map(item => (
              <Row
                key={item.id}
                item={item}
                selected={this.selected === item.id}
                select={this.select}
                remove={this.remove}
              ></Row>
            ))}
          </tbody>
        </table>
        <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
