/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform,
    BackAndroid,
} from 'react-native';
import MyScene from './navigator/MyScene';
import MainPage from './MainPage';
import ToastUtil from "./ToastUtil";

var isFirstBack = 0;
export default class MyRN extends Component {

    // static defaultProps = {
    //     title: 'MyScene'
    // };
    constructor(props){
        super(props);
        setInterval(() => {
            isFirstBack =0;
        }, 1000);
        this.onBackAndroid = this.onBackAndroid.bind(this);

    }

    render() {
        return(
            <Navigator
                ref="navigator"
                initialRoute={{name:'MainPage',component:MainPage}}
                configureScene={(route)=>{
                    var config;
                    //判断页面是否自己定义了专场动画
                    if(route.sceneConfig){
                        config = route.sceneConfig;
                    }else{
                        //默认动画
                        config = Navigator.SceneConfigs.HorizontalSwipeJump;
                    }
                    //关闭手势操作
                    config.gestures = null;
                    return config;
                }}
                renderScene={(route,navigator)=>{
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator}/>
                }}
            />
        );


        // return (
        //     <Navigator
        //         initialRoute={{title: 'My Initial Scene', index:0}}
        //         renderScene={(route,navigator)=>
        //             <MyScene
        //                 title={route.title}
        //                 onForward={()=>{
        //                     const nextIndex = route.index+1;
        //                     navigator.push({
        //                         title: 'Scene '+ nextIndex,
        //                         index: nextIndex,
        //                     });
        //                     }}
        //                 onBack={()=>{
        //                     if(route.index>0){
        //                         navigator.pop();
        //                     }
        //                 }}
        //             />
        //         }
        //     />
        // );
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentDidUnMount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid(){
        const nav = this.refs.navigator;
        if(nav && nav.getCurrentRoutes().length>1){
            nav.pop();
            //返回true表示消费该事件
            return true;
        }else{
            if(isFirstBack == 0){
                ToastUtil.show('在按一次退出');
                isFirstBack = 1;
                return true;
            }else{
                return false;
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('MyRN', () => MyRN);
