import React, { Component } from "react";
import { getMovies } from '../services/fakeMovieService';
import Like from "./common/like";
class Movies extends Component {
    state = {
        movies: getMovies()
    }

    constructor() {
        super()
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleLike(movie) {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        console.log(movies[index])
        movies[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked
        this.setState({ movies: movies })

    }

    handleDelete(movieId) {
        const movies = this.state.movies.filter(movie => (movie._id !== movieId))
        this.setState({ movies: movies })
    }


    render() {
        const { length: count } = this.state.movies
        if (count === 0) return <p>There are no movies in the database</p>
        return (
            <>
                <p>Showing {count} movies from the database</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                                <td><button onClick={() => this.handleDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button></td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            </>
        )
    }
}

export default Movies;
