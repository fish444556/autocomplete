import React, { Component } from 'react';

import './AutoComplete.css';

const dataSet = [
  'apple',
  'banana',
  'lemon'
]

export default class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      dataRange: dataSet,
      showAutoCompleDiv: true,
      hoverIndex: ''
    }
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.value.trim() === '') {
      this.setState({
        searchText: '',
        dataRange: dataSet,
        showAutoCompleDiv: true
      }, () => console.log(this.state.dataRange));

      return dataSet;
    }
    const newDataSet = dataSet.map(ele => {
      return ele.toLowerCase().includes(e.target.value.toLowerCase()) ? ele : '';
    })
    this.setState({
      searchText: e.target.value,
      dataRange: newDataSet.filter(ele => ele !== ''),
      showAutoCompleDiv: true
    }, () => console.log(this.state.dataRange));

  }

  handleClick(e) {
    e.preventDefault();
    // debugger
    this.setState({
      searchText: e.target.textContent,
      showAutoCompleDiv: false
    });
  }

  renderList() {
    // const {}
    return this.state.dataRange.map((ele, idx) => {
      return (
        <li
        key={idx}
        onClick={(e) => this.handleClick(e)}
        >
        <p>{ele}</p>
        </li>
      )
    }
    );
  }

  renderOption() {
    return this.state.dataRange.map((ele, idx) => {
      return (
        <option
        key={idx}
        value={ele}
        />
      );
    })
  }

  render() {
    return (
      <div className='container'>
        <input list="browsers" name="browser" />
        <datalist id = "browsers">
          {this.renderOption()}
        </datalist>
          <div className='input-box'>
        <input
      type='text'
      value={this.state.searchText}
      onChange={(e) => this.handleChange(e)}
      />
        </div>
        <div className={'auto-complete-div ' + (this.state.showAutoCompleDiv ? 'show' : 'hide')}>
          <ul>
            {this.renderList()}
          </ul>
        </div>
      </div>
    );
  }
}


