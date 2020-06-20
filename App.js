import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AsyncStorage } from 'react-native'
import * as firebase from 'firebase'
import { Provider } from 'react-redux'
import './main/database/config'

//* SCREENS
import HomeScreen from './main/HomeScreen'
import AddFav from './main/AddFav'
import SearchScreen from './main/SearchScreen'
import SearchResults from './main/SearchResults'
import MovieScreen from './main/MovieScreen'
import SplashScreen from './main/SplashScreen'
import LogScreen from './main/LogScreen'
import LoginScreen from './main/LoginScreen'
import RegisterScreen from './main/RegisterScreen'


//* STORE
import Store from './store/store'

//* Create the navigator
const Stack = createStackNavigator()


export default class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            initialRouteName : ""
        }
    }

    render() {

        firebase.auth().onAuthStateChanged(user => {
            setTimeout(() => {
                if (user !== null) {
                    this.setState({
                        loading: false,
                        initialRouteName: "Home"
                    })
                } else {
                    this.setState({
                        loading: false,
                        initialRouteName: "LogScreen"
                    })
                }
            }, 1000)
        })

        if (this.state.loading === true) {
            return (
                <SplashScreen />
            )
        } else {
            return (
                <Provider store={Store}>
                  <NavigationContainer>
                      <Stack.Navigator headerMode="none" initialRouteName={this.state.initialRouteName}>
                          <Stack.Screen name="Home" component={HomeScreen} initialParams={{ title: 'Accueil' }}/>
                          <Stack.Screen name="AddFav" component={AddFav} initialParams={{ title: 'Ajout Favoris' }}/>
                          <Stack.Screen name="SearchScreen" component={SearchScreen} initialParams={{ title: 'Rechercher' }}/>
                          <Stack.Screen name="SearchResults" component={SearchResults} initialParams={{ title: 'Résultats' }}/>
                          <Stack.Screen name="MovieScreen" component={MovieScreen} initialParams={{ title: 'Votre film' }}/>

                          <Stack.Screen name="LogScreen" component={LogScreen} initialParams={{ title: 'Bienvenue' }}/>
                          <Stack.Screen name="LoginScreen" component={LoginScreen} initialParams={{ title: 'Me connecter' }}/>
                          <Stack.Screen name="RegisterScreen" component={RegisterScreen} initialParams={{ title: 'M\'enregister' }}/>
                      </Stack.Navigator>
                  </NavigationContainer>
                </Provider>
            )
        }
    }
}
