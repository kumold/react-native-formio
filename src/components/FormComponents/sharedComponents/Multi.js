import React from 'react';
import clone from 'lodash/clone';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import Tooltip from './Tooltip';
import ValueComponent from './Value';
import DeviceInfo from 'react-native-device-info';
import {
  Icon,
  Button,
  Text,
} from 'react-native-elements';

export default class MultiComponent extends ValueComponent {
  constructor(props) {
    super(props);
    this.addFieldValue = this.addFieldValue.bind(this);
    this.removeFieldValue = this.removeFieldValue.bind(this);
    this.getTableRows = this.getTableRows.bind(this);
    this.getElements = this.getElements.bind(this);
  }

  addFieldValue() {
    let value = clone(this.state.value);
    value.push(this.props.component.defaultValue);
    this.setState({
      isPristine: false,
      value: value,
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this);
      }
    });
  }

  removeFieldValue(id) {
    let value = clone(this.state.value);
    value.splice(id, 1);
    this.setState({
     isPristine: false,
      value: value,
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this);
      }
    });
  }

  getTableRows(value, id, style) {
    const error = this.state.isPristine || value.isValid ? false : true;
    const Element = this.getSingleElement(value, id, error);
    const errorText = error ? (<Text style={style.errorMessage}>{value.errorMessage}</Text>) : null;
    return (
      <View style={style.fieldWrapper}>
        {Element}
        <Icon name='minus-circle' type='font-awesome' onPress={this.removeFieldValue.bind(null, id)} />
        {errorText}
      </View>
    );
  }

  elementLayout(position) {
    switch (position) {
      case 'top':
       return {
          flexDirection: 'column',
        };
      case 'left-left':
      case 'left-right':
        return {
          flexDirection: 'row',
          alignItems: 'flex-start',
        };
      case 'right-left':
      case 'right-right':
        return {
          flexDirection: 'row-reverse',
          marginHorizontal: 20,
        };
      case 'bottom':
        return {
          flexDirection: 'column-reverse',
        };
      default:
        return {
          flexDirection: 'column',
        };
    }
  }

  getElements() {
    const multiStyles = StyleSheet.create({
      descriptionText: {
        fontSize: DeviceInfo.isTablet() ? 12 : 10,
        marginLeft: 20,
        marginTop: 10,
      },
      errorText: {
        alignSelf: 'flex-end',
        color: this.props.colors.errorColor,
        fontSize: 10,
      },
      fieldWrapper: {
        flex: 1,
      },
      labelStyle: {
        color: this.props.theme.Label.color,
        flexWrap: 'wrap',
        fontSize: DeviceInfo.isTablet() ? this.props.theme.Label.fontSize : 12,
        maxWidth: DeviceInfo.isTablet() ? 580 : 210,
      },
      labelWrapper: {
        flexDirection: 'row',
        marginRight: this.props.component.labelPosition === 'left-left' || this.props.component.labelPosition === 'left-right' ? 10 : 0,
        marginTop: this.props.component.labelPosition === 'top' || this.props.component.labelPosition === 'bottom' ? 0 : 15,
      },
      mainElement: this.elementLayout(this.props.component.labelPosition),
    });

    const {component} = this.props;
    let Component;
    const requiredInline = ((component.hideLabel === true || component.label === '' ||
      !component.label) && component.validate && component.validate.required ? <Icon name='asterisk' type='font-awesome'/> : <Text>{''}</Text>);

    const prefix = (<Text>{component.prefix}</Text>);
    const suffix = (<Text>{component.suffix}</Text>);
    const inputLabel = (component.label && !component.hideLabel ?
      <Text style={multiStyles.labelStyle}>{requiredInline} {prefix} {component.label} {suffix}</Text> : null);

      const data = this.state.value || {};
    if (component.multiple) {
      const rows = data.map((value, id) => {
        this.getTableRows(value, id, multiStyles);
      });
      Component = (
          <View>
            <Text h3>{component.label}</Text>
            {rows}
            <Button icon={{name: 'plus', type: 'font-awesome'}} onPress={this.addFieldValue}><Text>Add another</Text></Button>
          </View>
      );
    }
    else {
      const error = this.state.isPristine || data.isValid ? false : true;
      const Element = this.getSingleElement(data, 0, error);
      const errorText = error ? (<Text style={multiStyles.errorMessage}>{data.errorMessage}</Text>) : null;

      Component = (
        <View style={multiStyles.fieldWrapper}>
          <View style={multiStyles.mainElement}>
            <View style={multiStyles.labelWrapper}>
            {inputLabel}
            {component.tooltip && <Tooltip
              text={component.tooltip}
              color={this.props.colors.alternateTextColor}
              backgroundColor={this.props.colors.primary1Color}
            />}
            </View>
            {Element}
          </View>
          {errorText}
          {component.description && <Text style={multiStyles.descriptionText}>{component.description}</Text>}
        </View>
      );
    }
    return Component;
  }
}

MultiComponent.propTypes = {
  component: PropTypes.any,
  onChange: PropTypes.func,
  theme: PropTypes.object,
  colors: PropTypes.object
};
