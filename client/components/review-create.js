import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import createReviewMutation from '../queries/createReview';
import readMovieQuery from '../queries/readMovie';
class ReviewCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { terms : ""};
    }
    render() {
        
        return (
            <div>
                <div className="row">
                <form className="input-field col s6">
                    <input 
                        type="text"
                        className="validate"
                        onChange={ e => this.setState( {terms: e.target.value}) }
                        value={this.state.terms}
                        onKeyPress={ this.handleSubmitForm.bind(this)}
                    />        



                </form>
                <label className="active">Ajouter une review</label>
                </div>
            </div>
        )
    }


    handleSubmitForm(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            this.props.createReviewMutation({
                variables: {
                    content: this.state.terms,
                    movieId: this.props.movieId
                },
                /* ne sert plus a rien car dans index.js : il y a maintenant dataIdFromObject : o => o.id dans le client Appolo
                refetchQueries: [
                    { 
                        query : readMovieQuery,
                        variables : {
                            id : this.props.movieId
                        }
                    }
                ]
                */
            }).then( () => {
                this.setState({ terms : ""}); 

            })
        }
    }

}


export default compose(
    graphql(createReviewMutation, {
        name: "createReviewMutation"
    }
    )
) (ReviewCreate);

