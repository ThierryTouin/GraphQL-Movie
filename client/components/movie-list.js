import React, { Component } from 'react';
import { graphql , compose } from 'react-apollo';
import { Link } from 'react-router';
import readMoviesQuery from "../queries/readMovies";
import deleteMoviesMutation from "../queries/deleteMovies";

class MovieList extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Liste de films</h1>

                <ul className="collection">
                    {this.renderMovies()}
                </ul>
                
                <Link to="/movies/create" className="btn-float btn-large waves-effect waves-light blue right ">
                     <i className="material-icons">add</i>
                </Link>

            </div>
        )
    }

renderMovies() {
    if (!this.props.readMoviesQuery.loading) {
        return this.props.readMoviesQuery.movies.map( (movie => {
            return (
            <li className="collection-item" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                
                <i className="material-icons secondary-content delete_button" onClick={ () => this.onDeleteMovie(movie.id)}>delete</i>
            </li>)
        }))    
    } else {
        return "Chargement des données...";
    }
    
    
}

onDeleteMovie(id) {

    console.log("id to delete : ",id);
    this.props.deleteMoviesMutation({
        variables:{
            id
        }
    }).then( () => {
        this.props.readMoviesQuery.refetch();
    })
}


}



export default compose(
    graphql(readMoviesQuery, { 
        name : "readMoviesQuery"
    }),
    graphql(deleteMoviesMutation, { 
        name : "deleteMoviesMutation"
    })
) (MovieList);