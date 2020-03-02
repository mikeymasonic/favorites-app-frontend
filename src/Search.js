import React, { Component } from 'react'
import List from './List';
import request from 'superagent';

export default class Search extends Component {
    // initialize state
    state = { 
        album: [], // we need to display searched-for characters
        favorites: [], // we need to know if these characters are already favorited
        input: '', // we need to know the search input
    }

    componentDidMount = async () => {
        const faves = await request.get('http://localhost:3000/api/me/favorites')
        .set('Authorization', this.props.user.token);

        // fetch faves on mount to decide whether to put a star or a make favorite button
        this.setState({ favorites: faves.body })
    }

    handleSearch = async (e) => {
        e.preventDefault();

        // // set loading state
        // this.setState({ loading: true });
        // const data = await request.get(`http://localhost:3000/api/swapi?search=${this.state.input}`)

        // set loading state
        this.setState({ loading: true });
        const data = await request.get(`http://localhost:3000/api/lastfm?search=${this.state.input}`)

        // when the user clicks search, hit your search endpoint and set the results in state (and kill the loading state).
        this.setState({
            album: data.body.results.albummatches.album,
            loading: false
        });
    }

    render() {

        return (
            <div>
                {/* on submit, call the handleSearch function */}
                <form onSubmit={this.handleSearch}>
                {/* on change, update the input in state */}
                <input value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
                {/* disable the button if loading */}
                <button disabled={this.state.loading}>Search!</button>
                </form>
                {
                    // if loading, show loading, else, show list
                    this.state.loading 
                    ? "loading!!"
                    : <List 
                    album={this.state.album} 
                    favorites={this.state.favorites}
                    user={this.props.user} />

                }
            </div>
        )
    }
}
