import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtRadio, AtNoticebar } from 'taro-ui'

import './personform.scss'

export default class personform extends Component {
    config = {
        navigationBarTitleText: '个人信息'
    }

    constructor() {
        super()
        this.state = {
            personInfomation: {
                name: '',
                telNum: '',
                sex: '男',
                wechatNum: '',
                student_id: ''
            }
        }
    }

    componentDidShow() {
        this.getPersonInfomation()
    }

    getPersonInfomation() {
        const openId = Taro.getStorageSync('openid')
        Taro.request({
            url: 'https://weapp.hhp.im/getUserinfo',
            data: {
                openId: openId
            }
        }).then(res => {
            let userInfo = res.data;
            let personInfomation = this.state.personInfomation
            personInfomation.name = userInfo.name
            personInfomation.telNum = userInfo.telNum
            personInfomation.sex = userInfo.sex
            personInfomation.wechatNum = userInfo.wechatNum
            this.setState({
                personInfomation: personInfomation
            })
        })
    }

    onSexChange = e => {
        console.log(e)
        let personInfomation = this.state.personInfomation
        personInfomation.sex = e
        this.setState({
            personInfomation: personInfomation
        })
    }

    onNameChange(e) {
        let personInfomation = this.state.personInfomation
        personInfomation.name = e
        this.setState({
            personInfomation: personInfomation
        })
    }

    onstudent_idChange(e) {
        let personInfomation = this.state.personInfomation
        personInfomation.student_id = e
        this.setState({
            personInfomation: personInfomation
        })
    }

    onTelChange(e) {
        console.log(e)
        let personInfomation = this.state.personInfomation
        personInfomation.telNum = e
        this.setState({
            personInfomation: personInfomation
        })
    }

    onwechatNumChange(e) {
        console.log(e)
        let personInfomation = this.state.personInfomation
        personInfomation.wechatNum = e
        this.setState({
            personInfomation: personInfomation
        })
    }

    submitHandle(e) {
        let personInfomation = this.state.personInfomation
        const openId = Taro.getStorageSync('openid')
        Taro.showModal({
            title: '提示',
            content: '此内容提交以后无法修改，是否确认提交？',
            success(res) {
                if (res.confirm) {
                    for (let item in personInfomation) {
                        let length = personInfomation[item]
                        if (!length) {
                            Taro.showModal({
                                title: '提示',
                                content: '请填写完整再提交',
                                showCancel: false,
                                success(res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                    }
                                }
                            })
                            return
                        }
                    }
                    Taro.request({
                        url: 'https://weapp.hhp.im/addUserInfo',
                        method: 'POST',
                        data: {
                            personInfomation: personInfomation,
                            openId: openId
                        }
                    }).then(res => {
                        if (res.data === 'no') {
                            Taro.showModal({
                                title: '提示',
                                content: '请填写完整再提交',
                                showCancel: false,
                                success(res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                    }
                                }
                            })
                        } else {
                            Taro.showToast({
                                title: '绑定成功！',
                                icon: 'success',
                                duration: 2000
                            }).then(res => {
                                setTimeout(() => {
                                    Taro.navigateBack({
                                        delta: 1
                                    })
                                }, 1000)
                            })
                            Taro.setStorage({ key: 'personalInfo', data: true }).then(res => {
                                console.log('存储成功')
                            })
                        }
                    })
                }
            }
        })
    }

    render() {
        return (
            <View className='form-container'>
                <AtNoticebar icon='volume-plus'>
                    此内容填写之后无法修改，请认真填写。
                </AtNoticebar>
                <Form onSubmit={this.submitHandle} reportSubmit>
                    <AtInput
                        name='value1'
                        title='真实姓名'
                        type='text'
                        placeholder='必填项'
                        value={this.state.personInfomation.name}
                        onChange={this.onNameChange.bind(this)}
                    />
                    <AtInput
                        name='value1'
                        title='学号'
                        type='text'
                        placeholder='必填项'
                        value={this.state.personInfomation.student_id}
                        onChange={this.onstudent_idChange.bind(this)}
                    />
                    <AtInput
                        name='value1'
                        title='电话号码'
                        type='number'
                        placeholder='必填项'
                        value={this.state.personInfomation.telNum}
                        onChange={this.onTelChange.bind(this)}
                    />
                    <AtInput
                        name='value1'
                        title='微信号'
                        type='text'
                        placeholder='必填项'
                        value={this.state.personInfomation.wechatNum}
                        onChange={this.onwechatNumChange.bind(this)}
                    />
                    <AtRadio
                        options={[
                            { label: '男', value: '男', },
                            { label: '女', value: '女' },
                        ]}
                        value={this.state.personInfomation.sex}
                        onClick={this.onSexChange}
                    />
                    <Button form-type='submit' className='button-self'>提交</Button>
                </Form>
            </View>
        )
    }
}