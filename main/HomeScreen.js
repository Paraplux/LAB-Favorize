import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'

import * as firebase from 'firebase'

//* Personal component
import TopBar from './components/TopBar'


export default class HomeScreen extends Component {

    constructor (props) {
        super(props)
        
        this.state = {
            user: firebase.auth().currentUser
        }

        this.navigation = this.props.navigation
        this.route = this.props.route
    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <TopBar options={{navigation: this.navigation, route: this.route}}/>
                <Text style={styles.title}>Bonjour {this.state.user.displayName}.</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={styles.avatar} source={{uri: 'https://i.pravatar.cc/150?img=56'}}/>
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.navigation.navigate('AddFav')}>
                        <View style={[styles.button]}>
                            <Text style={[styles.boldFont, styles.darkFont]}>J'ajoute</Text>
                            <Icon iconStyle={{fontSize: 30}} name="favorite" color="#FF0000"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.resetSession()}>
                        <View style={[styles.button, styles.buttonDark]}>
                            <Text style={[styles.boldFont, styles.lightFont]}>Mes favoris</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <Image style={styles.polygons} source={require('./resources/theme/polygons.jpg')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        paddingTop: 30,
        height: '100%'
    },
    boldFont: {
        fontWeight: 'bold',
        fontSize : 24
    },
    lightFont: {
        color: '#FFFFFF'
    },
    darkFont: {
        color: '#000000'
    },
    title: {
        marginTop: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 32
    },
    avatar: {
        marginTop: '20%',
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 100
    },
    button: {
        width: '50%',
        marginLeft: '25%',
        marginTop: '10%',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderWidth: 3,
        borderRadius: 30,
        borderColor: '#303030',
        justifyContent: "space-between",
        flexDirection: "row",
        alignContent: "center",
    },
    buttonDark: {
        backgroundColor: '#303030',
    },
    polygons: {
        position: 'absolute',
        top:'72%',
        width: '100%',
        resizeMode: 'contain'
    }
})
