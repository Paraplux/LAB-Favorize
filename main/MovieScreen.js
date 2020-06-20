import 'react-native-gesture-handler'
import React, { Component } from 'react'

//* External component
import { StyleSheet, View, StatusBar, TouchableOpacity, Text, ActivityIndicator, Image, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import AsyncStorage from 'react-native';

//* Redux
import { connect } from 'react-redux'

//* Personal component
import TopBar from './components/TopBar'


class MovieScreen extends Component {


    constructor(props) {
        super(props)

        this.navigation = this.props.navigation
        this.route = this.props.route
        this.movieFavs = this.props.movieFavs

        this.state = {
            loading: true,
            movie: null,
            casting: null,
            castingExtended: false,
            crewExtended: true
        }

        this.queryMovie(this.route.params.data)
    }

    /**
     * Renvoie les infos d'un film via axios et l'API The Movie Database
     * @param {number} query id du film
     */
    queryMovie (query) {
        axios
        .get(`
        https://api.themoviedb.org/3/movie/${query}?api_key=040dff99eeba55116f8145fd1862aa4d&language=fr-FR`)
        .then((response) => {
            this.setState({
                movie: response.data,
                loading: false
            })
            // console.log(response.data)
        })

        axios
        .get(`
        https://api.themoviedb.org/3/movie/${query}/credits?api_key=040dff99eeba55116f8145fd1862aa4d`)
        .then((response) => {
            this.setState({
                casting: response.data,
                loading: false
                })
        })
    }


    /**
     * Renvoie le casting selon state.castingExtended
     */
    getCasting() {
        if (!this.state.castingExtended) {
            const casting = this.state.casting.cast.slice(0, 10).map((item, i = 0) => {
                return (
                    <View key={i++} style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: "bold"}}>{item.name} : </Text>
                        <Text style={{}}>{item.character}</Text>
                    </View>
                )
              })
              return casting
        } else {
            const casting = this.state.casting.cast.map((item, i = 0) => {
                return (
                    <View key={i++} style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: "bold"}}>{item.name} : </Text>
                        <Text style={{}}>{item.character}</Text>
                    </View>
                )
              })
              return casting
        }
    }

    /**
     * Renvoie l'équipe selon le state.crewExtended et selon les cas
     */
    getCrew() {

        //Il va falloir récupérer les personnes les plus importantes et laisser les autres en toggle
        const previousCrew = this.state.casting.crew
        let finalCrew = {}

        function getJob (queryJob) {
            let data = ""
            previousCrew.forEach(function(pers) {
                if (pers.job === queryJob) {
                    data += pers.name + ", "
                }
            })
            return data.substr(0, data.length - 2)
        }

        //TODO Quand il sera question de rendre les gens cliquable, prendre en compte l'ID TMBD de la personne !

        finalCrew = [
            {
                job: "Réalisation",
                name : getJob("Director") != "" ? getJob("Director") : "nc.",
            },
            {
                job: "Scénario",
                name : getJob("Screenplay") != "" ? getJob("Screenplay") : "nc.",
            },
            {
                job: "Musique",
                name : getJob("Original Music Composer") != "" ? getJob("Original Music Composer") : "nc.",
            },
            {
                job: "Direction artistique",
                name : getJob("Supervising Art Director") != "" ? getJob("Supervising Art Director") : "nc.",
            },
            {
                job: "Décors",
                name : getJob("Set Decoration") != "" ? getJob("Set Decoration") : "nc.",
            },
            {
                job: "Costume",
                name : getJob("Costume Designer") != "" ? getJob("Costume Designer") : "nc.",
            },
            {
                job: "Photographie",
                name : getJob("Director of Photography") != "" ? getJob("Director of Photography") : "nc.",
            },
            {
                job: "Montage",
                name : getJob("Editor") != "" ? getJob("Editor") : "nc.",
            },
            {
                job: "Production",
                name : getJob("Producer") != "" ? getJob("Producer") : "nc."
            }
        ]


        const crew = finalCrew.map((item, i = 0) => {
            return (
                <View key={i++} style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: "bold"}}>{item.job} : </Text>
                    <Text style={{width: '80%'}}>{item.name}</Text>
                </View>
            )
        })

        return crew
    }

    /**
     * Renvoie les genres du films
     */
    getGenres () {
        const movie = this.state.movie
        let genres = ""
        movie.genres.map((genre) => {
            genres += genre.name + ", "
        })
        genres = genres.substr(0, genres.length - 2)
        return genres
    }

    /**
     * Renvoie la date de sortie formatée
     */
    getReleaseDate() {
        const movie = this.state.movie
        const releaseDate = new Date(movie.release_date)
        return releaseDate.getDate() + "/" + (parseInt(releaseDate.getMonth())+1) + "/" + releaseDate.getFullYear()
    }

    /**
     * Renvoie la note du film sous form d'étoiles
     */
    getNote() {
        const movie = this.state.movie
        const rating = movie.vote_average

        if (rating > 0 && rating <= 1) {
            return (
                <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/semi-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                </View>
            )
        } else if (rating > 1 && rating <= 2) {
            return (
                <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                </View>
            )
        } else if (rating > 2 && rating <= 3) {
            return (
                <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/semi-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                </View>
            )
        } else if (rating > 3 && rating <= 4) {
            return (
                <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                </View>
            )
        } else if (rating > 4 && rating <= 5) {
            return (
                <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/semi-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                </View>
            )
        } else if (rating > 5 && rating <= 6) {
            return (
                <View style={{flexDirection: 'row', justifyContent: "center", marginBottom: 20}}>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                </View>
            )
        } else if (rating > 6 && rating <= 7) {
            return (
                <View style={{flexDirection: 'row', justifyContent: "center", marginBottom: 20}}>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/semi-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                </View>
            )
        } else if (rating > 7 && rating <= 8) {
            return (
                <View style={{flexDirection: 'row', justifyContent: "center", marginBottom: 20}}>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/empty-star.png')}/>
                </View>
            )
        } else if (rating > 8 && rating <= 9) {
            return (
                <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/semi-star.png')}/>
                </View>
            )
        } else if (rating > 9 && rating <= 10) {
            return (
                <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                    <Image style={{width: 30, height: 30}} source={require('./resources/icons/full-star.png')}/>
                </View>
            )
        }
    }

    toggleFavorite() {
        this.setState({
            loading: true
        })
        const action = {
            type: "TOGGLE_FAVORITE",
            value: this.state.movie.id
        }
        this.props.dispatch(action)
        this.setState({
            loading: false
        })
    }

    render() {
        if (this.state.movie === null || this.state.casting === null) {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="dark-content" />
                    <TopBar options={{navigation: this.navigation, route: this.route}}/>
                    <ActivityIndicator size="large" color="#303030"/>
                </View>
            )
        } else {

            this.getCrew()
            this.getGenres()

            const movie = this.state.movie

            const renderButton = () => {
                console.log(this.props.movieFavs)
                if (this.props.movieFavs.findIndex(id => id == movie.id) !== -1) {
                return (
                    <TouchableOpacity style={[styles.button, styles.buttonFav]} onPress={() => this.toggleFavorite(this.state.movie.id)}>
                        <Icon iconStyle={{fontSize: 60}} name="favorite" color="#FF0000"/>
                    </TouchableOpacity>
                )
                } else {
                    return (
                        <TouchableOpacity style={styles.button} onPress={() => this.toggleFavorite(this.state.movie.id)}>
                            <Icon iconStyle={{fontSize: 60}} name="favorite" color="#808080"/>
                        </TouchableOpacity>
                    )
                }
            }

            return (
                <View style={styles.container}>
                    <StatusBar barStyle="dark-content" />
                    <TopBar options={{navigation: this.navigation, route: this.route}}/>
                    <ScrollView>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        <View style={{width: '50%', marginLeft: '25%', resizeMode: 'contain'}}>{this.getNote()}</View>
                        <View style={styles.tileThumbContainer}>
                            <Image style={styles.tileThumb} source={{uri: `https://image.tmdb.org/t/p/w342/${movie.poster_path}`}}/>
                        </View>
                        {renderButton()}
                        
                        <View style={styles.informations}>
                            <Text style={styles.informationsTitle}>Résumé</Text>
                            <Text>{movie.overview}</Text>
                            <Text style={styles.informationsTitle}>Informations</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: "bold"}}>Titre original : </Text>
                                <Text style={{}}>{movie.original_title}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: "bold"}}>Sortie : </Text>
                                <Text style={{}}>{this.getReleaseDate()}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: "bold"}}>Durée : </Text>
                                <Text style={{}}>{movie.runtime} minutes</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: "bold"}}>Budget : </Text>
                                <Text style={{}}>{movie.budget != 0 ? movie.budget + "$" : "-"}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: "bold"}}>Box Office : </Text>
                                <Text style={{}}>{movie.revenue != 0 ? movie.revenue + "$" : "-"}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: "bold"}}>Genres : </Text>
                                <Text style={{width: '80%'}}>{this.getGenres()}</Text>
                            </View>
                            {this.getCrew()}
                            <Text style={styles.informationsTitle}>Distribution</Text>
                            {this.getCasting()}
                            <TouchableOpacity onPress={() => this.setState({castingExtended: !this.state.castingExtended})}>
                                <Text style={{textAlign: "center", fontWeight:"bold", fontSize: 32}}>...</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFEF',
        paddingTop: 30,
        height: '100%',
    },
    movieTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: "center",
        marginVertical: 20
    },
    tileThumbContainer: {
        width: '60%',
        marginLeft: '20%',
        aspectRatio: 237/340
    },
    tileThumb: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    button: {
        marginTop: 30,
    },
    buttonFav: {
        color: '#303030',
    },
    boldFont: {
        fontWeight: 'bold',
        fontSize : 24
    },
    informations: {
        marginVertical: 30,
        paddingHorizontal: '5%'
    },
    informationsTitle: {
        marginVertical: 20,
        fontSize: 24,
        fontWeight: 'bold',
    }
})

const mapStateToProps = (state) => {
    return {
        movieFavs: state.movieFavs
    }
}

export default connect(mapStateToProps)(MovieScreen)
