import React, {Component} from "react";
import {StyleSheet, Image, Text, Dimensions, TouchableOpacity} from "react-native";
export default class VideoListItem extends Component {

    constructor(props){
        super(props);
        this.state={
            videoMode:{
                title:'标题',
                playUrl:'',
                imgUrl:'http://source.51yrz.com/1466071007.jpg?imageView2/1/w/600/h/300',
            },
        }
    }
    render(){
        return(
            <TouchableOpacity activeOpacity={0.9} onPress={this.props.onItemClick}>
                <Image source={{uri:this.props.imgUrl}} style={videoListItemStyle.imageBg}>
                    <Text style={videoListItemStyle.title}>{this.props.title}</Text>
                </Image>
            </TouchableOpacity>
        );
    }
}
//获取屏幕宽度
const screenWidth = Dimensions.get('window').width;
const videoListItemStyle = StyleSheet.create({
    imageBg:{
        height:220,
        resizeMode:'cover',
        justifyContent:'center',

    },
    title:{
        width:screenWidth,
        color:'#ffffff',
        textAlign:'center',
        fontSize:18,
        backgroundColor:'#00000022',
        fontWeight: 'bold',
    }
})