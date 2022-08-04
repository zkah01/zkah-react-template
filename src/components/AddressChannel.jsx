import React, { Component } from 'react';
import { Cascader } from 'antd';
import { getAddressByUser } from '@/api/companyM';
export default class AddressChannel extends Component {
  state = {
    adressList: [],
    valueDetail: '',
  };
  componentDidMount() {
    this.getChinaAdress();
  }
  onChange = (value) => {
    this.setState({
      valueDetail: String(value[1]),
    });
  };
  displayRender = (label) => {
    return label[label.length - 1];
  };
  componentWillUnmount() {
    this.setState = () => false;
  }
  render() {
    return (
      <Cascader
        options={this.state.adressList}
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder='请选择地址'
        expandTrigger='hover'
        displayRender={this.displayRender}
        disabled={this.props.disabled}
      />
    );
  }

  getChinaAdress = () => {
    getAddressByUser({ name: '浙江省' }).then((res) => {
      const list = res[0].seconds;

      const newList = [];
      list.forEach((item) => {
        const children = [];
        item.thirdlys.forEach((childItem) => {
          children.push({
            value: childItem.code,
            label: childItem.name,
            id: childItem.code,
          });
        });
        const newData = {
          value: item.code,
          label: item.name,
          id: item.code,
          children,
        };
        return newList.push(newData);
      });
      this.setState({
        adressList: newList,
      });
    });
  };
}
