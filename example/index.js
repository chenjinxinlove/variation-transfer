import React, { Component } from 'react';
import { render } from 'react-dom';
import VariationTransfer from '../src';
import './style.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [
        {key: 1, tilte: '1'},
        {key: 2, tilte: '2'}
      ],
      sourceData: [
        {key: 3, tilte: '3'},
        {key: 4, tilte: '4'},
        {key: 6, tilte: '6'},
        {key: 5, tilte: '5'}
      ]
    };
  }

  onChange = (value) => {
    console.log(value)
  }

  onSearchValue = (value) => {
    console.log(value)
  }

  onChangeDelete = (value) => {
    console.log(value)
  }
  
  render() {
    const TransferProps = {
      listData: this.state.listData,
      sourceData: this.state.sourceData,
      onChange: this.onChange,
      onSearchValue: this.onSearchValue,
      onChangeDelete: this.onChangeDelete
    };

    return (
      <div className="variation-tree-transfer-example">
        <VariationTransfer {...TransferProps} />
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));