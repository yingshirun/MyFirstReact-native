import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import TabNavigator from "react-native-tab-navigator";
import MainSelectedList from "./selected/MainSelectedList";

const SELECTED_TAG = 'selected';
const SELECTED_TITLE = '精选';
const SELECTED_NORMAL = require('./imags/ic_tab_strip_icon_feed.png');
const SELECTED_FOCUS = require('./imags/ic_tab_strip_icon_feed_selected.png');

const EXPLORE_TAG = 'explore';
const EXPLORE_TITLE = '发现';
const EXPLORE_NORMAL = require('./imags/ic_tab_strip_icon_category.png');
const EXPLORE_FOCUS = require('./imags/ic_tab_strip_icon_category_selected.png');

const FOLLOW_TAG = 'follow';
const FOLLOW_TITLE = '关注';
const FOLLOW_NORMAL = require('./imags/ic_tab_strip_icon_follow.png');
const FOLLOW_FOCUS = require('./imags/ic_tab_strip_icon_follow_selected.png');

const PROFILE_TAG = 'profile';
const PROFILE_TITLE = '我的';
const PROFILE_NORMAL = require('./imags/ic_tab_strip_icon_profile.png');
const PROFILE_FOCUS = require('./imags/ic_tab_strip_icon_profile_selected.png');


export default class MainPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectTab: SELECTED_TAG
        }
    }

    render() {
        return (
            <TabNavigator
                tabBarStyle={mainPageStyle.tab_container}
                tabBarShadowStyle={{height:0}}>
                {this._renderTabItem(SELECTED_TAG,SELECTED_TITLE,SELECTED_NORMAL,SELECTED_FOCUS)}
                {this._renderTabItem(EXPLORE_TAG, EXPLORE_TITLE, EXPLORE_NORMAL, EXPLORE_FOCUS)}
                {this._renderTabItem(FOLLOW_TAG, FOLLOW_TITLE, FOLLOW_NORMAL, FOLLOW_FOCUS)}
                {this._renderTabItem(PROFILE_TAG, PROFILE_TITLE, PROFILE_NORMAL, PROFILE_FOCUS)}
            </TabNavigator>
        );
    }

    /**
     * 底部item
     * @param tag       标识
     * @param title     文字
     * @param iconNormal icon 普通状态
     * @param iconFocus  选中时状态
     * @private
     */
    _renderTabItem(tag, title, iconNormal, iconFocus) {
        return (
            <TabNavigator.Item
                selected={this.state.selectTab == tag}
                title={title}
                titleStyle={mainPageStyle.tab_title}
                selectedTitleStyle={mainPageStyle.tab_title_selected}
                renderIcon={()=><Image source={iconNormal} style={mainPageStyle.tab_icon}/>}
                renderSelectedIcon={()=><Image source={iconFocus} style={mainPageStyle.tab_icon}/>}
                onPress={()=>this.setState({selectTab:tag})}>
                {this._selectedPage(tag)}
            </TabNavigator.Item>
        )
    }
    _selectedPage(tag){

        switch (tag){
            case SELECTED_TAG:
                return <MainSelectedList {...this.props}/>;

        }
        return <View><Text>这里是：{tag}</Text></View>;

    }
}

const mainPageStyle = StyleSheet.create({
    tab_container: {
        height: 42
    },
    tab_icon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
    tab_title: {
        color: '#929292',
        fontSize: 8,
    },
    tab_title_selected: {
        color: '#333333',
        fontSize: 8,
    }

})
