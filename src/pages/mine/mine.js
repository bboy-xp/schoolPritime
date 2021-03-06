import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './mine.scss'

export default class mine extends Component {
    config = {
        navigationBarBackgroundColor: '#6190E8',
        navigationBarTitleText: '我的'
    }

    constructor() {
        super()
        this.state = {
            userInfo: {}
        }
    }

    componentDidShow() {
        this.getUserinfo()
    }

    getUserinfo() {
        const openId = Taro.getStorageSync('openid')
        console.log(openId)
        Taro.request({
            // https://weapp.hhp.im
            url: 'https://weapp.hhp.im/getUserinfo',
            data: {
                openId: openId
            }
        }).then(res => {
            this.setState({
                userInfo: res.data
            })
            console.log(res)
        })
    }

    onChangePersonalInfomation() {
        Taro.navigateTo({
            url: '/pages/personform/personform'
        })
    }

    onStarting() {
        Taro.navigateTo({
            url: '/pages/order/order?type=onStarting'
        })
    }

    onGoing() {
        Taro.navigateTo({
            url: '/pages/order/order?type=onGoing'
        })
    }

    onCompleting() {
        Taro.navigateTo({
            url: '/pages/order/order?type=onCompleting'
        })
    }

    onMyorder() {
        Taro.navigateTo({
            url: '/pages/myorder/myorder'
        })
    }

    onInstructions(){
        Taro.navigateTo({
            url: '/pages/instructions/instructions'
        })
    }

    render() {
        return (
            <View className='container'>
                <View className='message-container'>
                    <View className='image-container'>
                        <View style='height:10px;'></View>
                        <View className='avatar-con'>
                            <View className='avatar' onClick={this.onChangePersonalInfomation}>
                                <Image src={this.state.userInfo.avatarUrl} style='width:70px;height:70px;'></Image>
                            </View>
                        </View>
                        <View className='name-con'>{this.state.userInfo.nickName}</View>
                    </View>
                    <View className='mine-order'>
                        <View className='order-top' onClick={this.onMyorder}>
                            <Text>我的求助</Text>
                            <View className='ordertop-right'>
                                <AtIcon value='chevron-right' size='15' color='#868281'></AtIcon>
                            </View>
                        </View>
                        <View className='order-bottom'>
                            <View className='order-icon' onClick={this.onStarting}>
                                <AtIcon prefixClass='icon' value='daifukuan' color='#6190E8' size='24'></AtIcon>
                                <Text>待开始</Text>
                            </View>
                            <View className='order-icon' onClick={this.onGoing}>
                                <AtIcon prefixClass='icon' value='daifahuo' color='#6190E8' size='24'></AtIcon>
                                <Text>进行中</Text>
                            </View>
                            <View className='order-icon' onClick={this.onCompleting}>
                                <AtIcon prefixClass='icon' value='yishouhuo' color='#6190E8' size='24'></AtIcon>
                                <Text>已完成</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='cell-container'>
                    <View className='cell-self' onClick={this.onInstructions}>
                        <Text>使用方法</Text>
                        <View>
                            <AtIcon value='chevron-right' size='15' color='#868281'></AtIcon>
                        </View>
                    </View>
                </View>
                <View></View>
            </View>
        )
    }
}