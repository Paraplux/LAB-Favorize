import 'react-native-gesture-handler'
import React, { Component } from 'react'

//* External component
import { StyleSheet, TextInput, View, StatusBar, TouchableOpacity, Text, ActivityIndicator, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import axios from 'axios'

//* Personal component
import TopBar from './components/TopBar'


export default class SearchScreen extends Component {

    constructor(props) {
        super(props)
        this.navigation = this.props.navigation
        this.route = this.props.route
        this.state = {
            query: '',
            report: null
        }
        this.trending()
    }

    trending () {
        axios
        .get(`
        https://api.themoviedb.org/3/discover/movie?api_key=040dff99eeba55116f8145fd1862aa4d&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
        .then((response) => {
            this.setState({report: response.data.results})
        })
    }

    renderMovie = ({item}) => {
        const year = new Date(item.release_date).getFullYear()
        return (
        <TouchableOpacity style={styles.trendingContainer} onPress={() => this.navigation.navigate('MovieScreen', {data: item.id})}>
            <Text style={styles.trendingItem}>{item.title}</Text>
            <Text style={styles.trendingItem}>{year}</Text>
        </TouchableOpacity>
        )
    }

    render() {
        if (this.state.report === null) {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="dark-content" />
                    <TopBar options={{navigation: this.navigation, route: this.route}}/>
                    <ActivityIndicator size="large" color="#303030"/>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="dark-content" />
                    <TopBar options={{navigation: this.navigation, route: this.route}}/>
                    <TextInput  style={styles.input}
                                placeholder="Je cherche ..."
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                                onSubmitEditing={() => this.navigation.navigate('SearchResults', {data: this.state.text})}
                                autoFocus
                    />
                    <Text style={styles.trending}>Tendances actuelles</Text>
                    <FlatList
                        data={this.state.report}
                        renderItem={this.renderMovie}
                        keyExtractor={({id}) => id.toString()}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFEF',
        paddingTop: 30,
        height: '100%'
    },
    input: {
        marginLeft: '10%',
        width: '80%',
        height: 40,
        borderBottomColor: '#909090',
        borderBottomWidth: 1
    },
    trending: { 
        textAlign: "center", 
        paddingVertical: 20, 
        fontSize: 20, 
        fontWeight: "bold" 
    },
    trendingContainer: {
        paddingVertical: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#909090',
    },
    trendingItem : {
        fontSize: 16,
        color: '#909090',
        fontStyle: 'italic'
    }
})
