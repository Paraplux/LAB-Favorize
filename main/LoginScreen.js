import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ToastAndroid } from 'react-native'

import * as firebase from 'firebase'

import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

export default class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        }

        this.navigation = this.props.navigation
        this.route = this.props.route
    }

    handleSubmit = () => {
        firebase.auth()
        .signInWithEmailAndPassword(this.state.email.trim(), this.state.password)
        .then(() => {
            ToastAndroid.show('Connexion réalisée avec succès', ToastAndroid.SHORT);
            this.navigation.navigate("Home")
        }).catch(() => {
            this.setState({errorMessage : "Les identifiants sont incorrects. Connexion refusée."})
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Image style={styles.logo} source={require('./resources/theme/logo-V1.png')} />
                
                <Text style={styles.title}>Favorize</Text>
                <Text style={styles.subtitle}>Je me connecte</Text>
                <View style={styles.form}>
                    <Input
                    placeholder='Adresse Email'
                    autoCapitalize="none"
                    onChangeText={email => this.setState({email})}
                    rightIcon={
                        <Icon name='user' size={24} color='black' />
                    }
                    value={this.state.email}
                    />
                    <Input
                    placeholder='Mot de passe'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={password => this.setState({password})}
                    rightIcon={
                        <Icon name='lock' size={24} color='black' />
                    }
                    value={this.state.password}
                    />
                    <Button 
                    onPress={this.handleSubmit}
                    title="Valider" 
                    buttonStyle={{marginTop:30, width: '80%', marginLeft:'10%', backgroundColor: '#01b4e4'}}/>
                </View>
                <TouchableOpacity onPress={() => {this.navigation.navigate("RegisterScreen")}}>
                    <Text style={{textAlign: "center", marginTop: 15}}>Je n'ai pas de compte</Text>
                </TouchableOpacity>
                <Image style={styles.api} source={require('./resources/theme/tmbd2.png')} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: '5%',
    },
    logo: {
        marginLeft: '43%',
        width: '20%',
        resizeMode: 'contain',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }, 
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: '10%',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    form: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '10%',
    },
    input: {
        width: '60%',
        marginLeft: '20%',
        fontSize: 20,
        height: 40,
        borderBottomWidth: 1
    },
    api: {
        width: '40%',
        marginLeft: '30%',
        resizeMode: 'contain',
    },
})
