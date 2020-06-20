import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ToastAndroid, TouchableOpacity } from 'react-native'

import * as firebase from 'firebase'
import 'firebase/firestore'

import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'

export default class RegisterScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            displayName: "",
            email: "",
            password: null,
            confirmPassword: null,
            errorMessage: ""
        }

        this.navigation = this.props.navigation
        this.route = this.props.route
        this.firestore = firebase.firestore()
    }
    

    handleSubmit = () => {

        try {
            if(this.state.password !== this.state.confirmPassword) {
                alert("Erreur de mot de passe")
            } else {
                firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password).then(userCredentials => {
                    ToastAndroid.show('Inscription réalisée avec succès', ToastAndroid.SHORT)
                    this.firestore.collection('users').doc(userCredentials.user.uid).set({
                        favs : []
                    }).then(() => {
                        userCredentials.user.updateProfile({
                            displayName: this.state.displayName
                        })
                        this.navigation.navigate("Home")
                    }).catch(error => {
                        console.log(error)
                    })
                }).catch((error) => {
                    if (error.toString() === "Error: Password should be at least 6 characters") {
                        this.setState({errorMessage: "Le mot de passe doit contenir minimum 6 charactères."})
                    } else if (error.toString() === "Error: The email address is already in use by another account.") {
                        this.setState({errorMessage: "L'adresse email est déjà utilisée par un autre comtpe."})
                    }
                    console.log(error.toString())
                })
            }
        } catch(error) {
            console.log("Erreur inscription")
            alert(this.state.errorMessage)
        }   

    }
    
    //* Change Events
    handleDisplayNameChange = (displayName) => {

        if(displayName.length < 3) {
            this.setState({displayName, errorPseudo: "Le pseudo doit compter 3 charactères minimum"})
        } else if (displayName === "") {
            this.setState({displayName, errorPseudo: ""})
        } else {
            this.setState({displayName, errorPseudo: ""})
        }
    }

    handleEmailChange = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (reg.test(email) === false) {
            this.setState({ 
                email,
                emailValide: false,
                errorMail: "L'adresse mail n'est pas une adresse mail valide"
            })
        } else {
            this.setState({ 
                email,
                emailValide: true,
                errorMail: ""
            })
        }
    }

    handlePasswordChange = (password) => {
        this.setState({password})
    }

    handleConfirmPasswordChange = (confirmPassword) => {
        this.setState({confirmPassword})
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <Image style={styles.logo} source={require('./resources/theme/logo-V1.png')} />
                
                <Text style={styles.title}>Favorize</Text>
                <Text style={styles.subtitle}>Je crée mon compte</Text>
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                <View style={styles.form}>
                    <Input
                    inputStyle={styles.input}
                    placeholder='Pseudo'
                    errorStyle={{ color: 'red' }}
                    minLength={3}
                    errorMessage={this.state.errorPseudo}
                    onChangeText={this.handleDisplayNameChange}
                    rightIcon={
                        <Icon name='user' size={24} color='black' />
                    }
                    value={this.state.displayName}
                    />
                    <Input
                    inputStyle={styles.input}
                    placeholder='Adresse mail'
                    errorStyle={{ color: 'red' }}
                    autoCapitalize="none"
                    errorMessage={this.state.errorMail}
                    onChangeText={this.handleEmailChange}
                    rightIcon={
                        <Icon name='user' size={24} color='black' />
                    }
                    value={this.state.email}
                    />
                    <Input
                    inputStyle={styles.input}
                    placeholder='Mot de passe'
                    secureTextEntry={true}
                    errorStyle={{ color: 'red' }}
                    autoCapitalize="none"
                    onChangeText={this.handlePasswordChange}
                    rightIcon={
                        <Icon name='lock' size={24} color='black' />
                    }
                    value={this.state.password}
                    />
                    <Input
                    inputStyle={styles.input}
                    placeholder='Confirmer le mot de passe'
                    secureTextEntry={true} errorStyle={{ color: 'red' }}
                    errorMessage={this.state.password === this.state.confirmPassword ? "" : "Les deux mots de passe ne sont pas identiques"}
                    autoCapitalize="none" 
                    onChangeText={this.handleConfirmPasswordChange}
                    value={this.state.confirmPassword}
                    />
                    <Button
                    block
                    disabled={!(this.state.displayName.length >= 3 
                             && this.state.emailValide 
                             && this.state.password === this.state.confirmPassword 
                             && this.state.password !== null  && this.state.confirmPassword !== null)}
                    disabled={false}
                    title="Valider"
                    buttonStyle={{marginTop:30, width: '80%', marginLeft:'10%', backgroundColor: '#01b4e4'}}
                    onPress={this.handleSubmit}/>
                </View>
                <TouchableOpacity onPress={() => {this.navigation.navigate("LoginScreen")}}>
                    <Text style={{textAlign: "center", marginTop: 15}}>J'ai déjà un compte</Text>
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
        marginTop: '2%',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    errorMessage : {
        marginTop: '2%',
        color: 'red',
        textAlign: 'center'
    },
    form: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '10%',
    },
    input: {
        marginTop: 10,
        fontSize: 20,
    },
    api: {
        width: '40%',
        marginLeft: '30%',
        resizeMode: 'contain',
    },
})
