import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import uniq from 'lodash.uniq';
import difference from 'lodash.difference';
import './style.less';
const Search = Input.Search;

class VariationTransfer extends Component {
  constructor(props) {
    super(props);
    const { sourceData, listData } = props;
    this.state = {
      listData,
      sourceData,
      variationCheckedKeys: [],
      listCheckedKeys: []
    };
  }

  componentWillReceiveProps(nextProps) {
    
  }

  // 展示列表被删除时
  variationOnCheck = (e, checkedKeys) => {
    if (e.target.checked) {
      this.setState({
        variationCheckedKeys: uniq([...this.state.variationCheckedKeys, ...checkedKeys])
      });
    } else {
      this.setState({
        variationCheckedKeys: this.state.variationCheckedKeys.filter(key => checkedKeys.indexOf(key) < 0)
      });
    }
  }

  // 选择列表被删除时
  listOnCheck = (e, checkedKeys) => {
    if (e.target.checked) {
      this.setState({
        listCheckedKeys: uniq([...this.state.listCheckedKeys, ...checkedKeys])
      });
    } else {
      this.setState({
        listCheckedKeys: this.state.listCheckedKeys.filter(key => checkedKeys.indexOf(key) < 0)
      });
    }
  }

  // left variation search 
  onVariationSearch = (value) => {
    this.props.onSearchValue(value)
  }
  render() {
    const { className, showSearch } = this.props;
    const {listData, sourceData, listCheckedKeys, variationCheckedKeys} = this.state;

    const variationTransferClass = classNames({
      'variation-variation-transfer': true,
      [className]: !!className
    });

    const variationTransferPanelBodyClass = classNames({
      'variation-transfer-panel-body': true,
      'variation-transfer-panel-body-has-search': showSearch,
    });

    const operaRightButtonProps = {
      type: 'primary',
      icon: 'right',
      size: 'small',
      disabled: difference(variationCheckedKeys, listData.map(({key}) => key)).length === 0 && difference(listData.map(({key}) => key), variationCheckedKeys).length === 0,
      onClick: () => {
        this.props.onChange && this.props.onChange(this.state.variationCheckedKeys);
      }
    };

    const operaLeftButtonProps = {
      type: 'primary',
      icon: 'left',
      size: 'small',
      disabled: listCheckedKeys.length === 0,
      onClick: () => {
        this.setState({
          listCheckedKeys: [],
        });
        this.props.onChangeDelete && this.props.onChangeDelete(this.state.listCheckedKeys);
      }
    };

    return (
      <div className={variationTransferClass}>
        <div className="variation-transfer-panel variation-transfer-panel-left">
          <div className="variation-transfer-panel-header">
            <span className="variation-transfer-panel-header-select">{sourceData.length} 条数据</span>
          </div>
          <div className={variationTransferPanelBodyClass}>
            {showSearch ? <div className="variation-transfer-panel-body-search"><Search placeholder="请输入搜索关键字" onSearch={this.onVariationSearch} /></div> : null}
            <div className="variation-transfer-panel-body-content">  
              <ul className="variation-transfer-panel-body-content">
                {
                  sourceData.map(item => (
                    <li key={item.key}>
                      <Checkbox checked={variationCheckedKeys.indexOf(item.key) > -1} onChange={(e) => this.variationOnCheck(e, [item.key])} />
                      {
                        <span>{item.title}</span>
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="variation-transfer-operation">
          <Button {...operaRightButtonProps} />
          <Button {...operaLeftButtonProps} />
        </div>
        <div className="variation-transfer-panel variation-transfer-panel-right">
          <div className="variation-transfer-panel-header">
            <span className="variation-transfer-panel-header-select">{listData.length} 条数据</span>
          </div>
          <div className={variationTransferPanelBodyClass}>
            <ul className="variation-transfer-panel-body-content">
              {
                listData.map(item => (
                  <li key={item.key}>
                    <Checkbox checked={listCheckedKeys.indexOf(item.key) > -1} onChange={(e) => this.listOnCheck(e, [item.key])} />
                    {
                      <span>{item.title}</span>
                    }
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

VariationTransfer.propTypes = {
  onChangeDelete: PropTypes.func,
  className: PropTypes.string,
  sourceData: PropTypes.array,
  listData: PropTypes.array,
  onChange: PropTypes.func,
  showSearch: PropTypes.bool,
  rowKey: PropTypes.string,
  rowTitle: PropTypes.string,
  onSearchValue: PropTypes.func,
};

VariationTransfer.defaultProps = {
  rowKey: 'key',
  rowTitle: 'title',
  listData: [],
  sourceData: [],
  variationLoading: false,
  showSearch: false
};

export default VariationTransfer;