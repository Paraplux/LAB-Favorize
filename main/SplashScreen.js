import 'react-native-gesture-handler'
import React, { Component } from 'react'

//* External component
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'


export default class SplashScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('./resources/theme/logo-V1.png')} />
                <Image style={styles.splashIcons} source={require('./resources/theme/splashIcons.png')} />
                <Text style={styles.title}>Favorize</Text>
                <ActivityIndicator color="#303030" size="large" style={{marginTop: 50}} />
                <Image style={styles.api} source={require('./resources/theme/tmbd.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    logo: {
        marginLeft: '10%',
        width: '50%',
        resizeMode: 'contain',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }, 
    title: {
        marginTop: 25,
        fontSize: 48,
        fontWeight: 'bold',
    },
    splashIcons: {
        marginTop: 25,
        width: '50%',
        resizeMode: 'contain',

    },
    api: {
        position: 'absolute',
        bottom: 0,
        width: '40%',
        resizeMode: 'contain',
    },
})
