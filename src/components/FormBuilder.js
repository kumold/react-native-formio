import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const formBuilderStyles = StyleSheet.create({
    wrapper: {
        height: '500px'
    }
});

export default class FormBuilder extends React.Component {
    render() {
        return <View style={formBuilderStyles.wrapper}><Text>Form Builder</Text></View>;
    }
}

