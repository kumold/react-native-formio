import React from 'react';
import {View, Switch, Text, StyleSheet} from 'react-native';
import ValueComponent from '../sharedComponents/Value';

export default class SwitchComponent extends ValueComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.getElements = this.getElements.bind(this);
    this.getValueDisplay = this.getValueDisplay.bind(this);
  }

  onChange(checked) {
    this.setValue(checked);
  }

  getElements() {
    const switchStyle = StyleSheet.create({
      label: {
        color: this.props.colors.textColor,
        fontSize: 15,
        marginLeft: 10,
        marginTop: 8,
      },
      wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 10,
      },
    });

    const {component} = this.props;
    const {value} = this.state;

    return (
      <View style={switchStyle.wrapper}>
        <Switch
          tintColor={this.props.colors.primary1Color}
          value={value.item}
          disabled={this.props.readOnly}
          onValueChange={this.onChange}
        />
        <Text style={switchStyle.label}>
          {!(component.hideLabel && component.datagridLabel === false) ? component.label : ''}
        </Text>
      </View>
    );
  }

  getValueDisplay(component, data) {
    return data ? 'Yes' : 'No';
  }
}
