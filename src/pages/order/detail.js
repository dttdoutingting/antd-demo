import React, { Component } from 'react';
import { Card } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import './detail.less';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Card></Card>
      </div>
    );
  }
}

export default Detail;
