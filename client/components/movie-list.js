import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import readMoviesQuery from "../queries/readMovies";

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
    if (!this.props.data.loading) {
        return this.props.data.movies.map( (movie => {
            return <li className="collection-item" key={movie.id}>{movie.title}</li>
        }))    
    } else {
        return "Chargement des données...";
    }
    
    
}

}



export default graphql(readMoviesQuery) (MovieList);