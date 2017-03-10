import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

export default class MyScene extends Component {
    static defaultProps = {
        title: PropTypes.string.isRequired,
        onForward: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    render() {
        return (
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <Text> {this.props.title}</Text>
                {/*<TouchableHighlight onPress={this.props.onForward}>*/}
                    {/*<Text>点我进入下一场景</Text>*/}
                {/*</TouchableHighlight>*/}
                {/*<TouchableHighlight onPress={this.props.onBack}>*/}
                    {/*<Text>点我返回上一场景</Text>*/}
                {/*</TouchableHighlight>*/}
            </View>
        );
    }
}
