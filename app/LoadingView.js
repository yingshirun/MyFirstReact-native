import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
} from 'react-native';

export default class LoadingView extends Component {

    render() {
        return (
            <View style={loadingStyle.loadingContent}>
                <ActivityIndicator size="large" />
                <Text> 加载中... </Text>
            </View>
        );
    }
}
const loadingStyle = StyleSheet.create({

    loadingContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})