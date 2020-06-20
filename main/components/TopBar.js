import 'react-native-gesture-handler'
import React, { Component } from 'react'

import * as firebase from 'firebase'

//* External component
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native'
import { Icon } from 'react-native-elements'


export default class TopBar extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            user: {
                ...firebase.auth().currentUser,
            }
        }
        this.navigation = this.props.options.navigation
        this.route = this.props.options.route

        firebase.firestore().collection('users').doc(this.state.user.uid).get().then((response) => {
            this.setState({
                user: {
                    ...this.state.user,
                    favs : response.data()
                }
            })
        })
    }

    handleDisconnect = () => {
        console.log("DISCONNECT FIRED")
        firebase.auth().signOut().then(() => {
            ToastAndroid.show('Déconnexion réalisée avec succès', ToastAndroid.SHORT);
            this.navigation.navigate('LoginScreen')
        })
    }

    render() {

        //TODO Utilise les messages toats!!!!

        if (this.route.name === "Home") {
            return (
                <View style={styles.topBarHome}>
                    <TouchableOpacity onPress={() => this.navigation.navigate('Home')}>
                        <Icon name="settings" type="material"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.disconnect} onPress={() => this.handleDisconnect()}>
                        <Icon name="power-settings-new" type="material"/>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => this.navigation.goBack()}>
                        <Icon name="arrow-back" type="material"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.route.params.title}</Text>
                    <TouchableOpacity onPress={() => this.navigation.navigate('Home')}>
                        <Icon name="home" type="material"/>
                    </TouchableOpacity>
                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    topBar: {
        width: '100%',
        height: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2
    },
    topBarHome: {
        width: '100%',
        height: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        elevation: 2
    },
    disconnect : {
        marginLeft: 10
    }
});
