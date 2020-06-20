import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

import BigButton from './components/BigButton'

export default class LogScreen extends Component {

    constructor(props) {
        super(props)
        
        this.navigation = this.props.navigation
        this.route = this.props.route
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('./resources/theme/logo-V1.png')} />
                <TouchableOpacity onPress={() => this.navigation.navigate('RegisterScreen')}>
                    <BigButton name="Je crée un compte" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.navigation.navigate('LoginScreen')}>
                    <BigButton name="J'ai déjà un compte" />
                </TouchableOpacity>
                <Image style={styles.api} source={require('./resources/theme/tmbd2.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    logo: {
        marginLeft: '30%',
        marginBottom: 50,
        marginTop: 50,
        width: '50%',
        resizeMode: 'contain',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }, 
    api: {
        marginTop: 50,
        width: '40%',
        marginLeft: '30%',
        resizeMode: 'contain',
    },
})
