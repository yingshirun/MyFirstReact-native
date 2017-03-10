import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ListView,
} from 'react-native';
import LoadingView from '../LoadingView';
import VideoListItem from './VideoListItem';
import ToastUtil from "../ToastUtil";
import MyScene from '../navigator/MyScene'


//视频地址，下一页链接会在json中一起返回
const videoUrl = 'http://baobab.wandoujia.com/api/v1/feed?num=1';

export default class MainSelectedList extends Component {

    constructor(props) {
        super(props);
        /**
         * 使用DataSource作为ListView的数据源
         * 该构造函数接收四个参数
         * getRowData(dataBlob, sectionID, rowID)
         * getSectionHeaderData(dataBlob, sectionID)
         * rowHasChanged(prevRowData, nextRowData)
         * sectionHeaderHasChanged(prevSectionData, nextSectionData)
         */
        let dataDds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource: dataDds,
            data: [],
            nextPageUrl: '',
            isRefresh: false
        };
    }

    fetchData() {
        fetch(videoUrl)
            .then((responce) => responce.json())
            .then((responseJson) => {
                let videoList = responseJson.dailyList[0].videoList;
                let nextPage = responseJson.nextPageUrl;
                console.log(videoList);
                console.log('下一页：' + nextPage);
                this.setState({
                    data: videoList,
                    nextPageUrl: nextPage,
                    isRefresh: false,

                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isRefresh: false,
                });
            })
    }

    render() {
        if (this.state.data) {
            // //通过解构赋值
            // const {
            //     onScroll = ()=> {
            //     }
            // } = this.props;
            return (
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                    renderRow={(row)=>this.getRenderRow(row)}
                />
            );
        } else {
            console.log('LoadingView');

            return (
                <LoadingView/>
            );
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    getRenderRow(row) {
        return(
            <VideoListItem
                onItemClick={()=>this.onListItemClick(row)}
                title={row.title}
                imgUrl={row.coverForFeed}
                />)

    }

    onListItemClick(row) {
        // ToastUtil.show(row.title);
        const {navigator} = this.props;
        if(navigator){
            navigator.push({
                name:'MySence',
                //这里跳转到MyScene后，后自动向该页面属性中注入navigator对象
                //在MyScene就可以直接通过props获取，其他地方也一样
                component: MyScene,
                params:{
                    title:row.title,
                }
            });
        }
    }
}