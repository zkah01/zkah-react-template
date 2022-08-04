/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-06-13 09:23:43
 * @Description:
 */
import React, { Component } from 'react';
import { Table } from 'antd';

export default class CustomTable extends Component {
  render() {
    // scroll为false不滚动
    let {
      columns,
      dataSource,
      total,
      currentPage,
      pageSize,
      onChange,
      scroll = 1100,
      bordered = false,
      tableLoading = false,
      rowSelection,
    } = this.props;
    columns = [
      /* {
        title: ' 序号 ',
        width: 60,
        render: (text, record, index) => `${(currentPage - 1) * pageSize + (index + 1)}`,
      }, */
      ...columns,
    ];
    const pagination = {
      showSizeChanger: true,
      pageSizeOptions: [20, 50, 100],
      position: ['bottomCenter'],
      defaultCurrent: 1,
      total,
      onChange,
      pageSize: pageSize,
      current: currentPage,
    };

    return (
      <Table
        tableLayout='fixed'
        scroll={{
          x: scroll,
        }}
        loading={tableLoading}
        bordered={bordered}
        columns={columns}
        dataSource={dataSource}
        pagination={total > pageSize ? pagination : false}
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
      />
    );
  }
}
