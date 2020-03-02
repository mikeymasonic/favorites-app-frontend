import React, { Component } from 'react'
import List from './List';
import request from 'superagent';

export default class Favorites extends Component {
    state = { 
        album: []
    }

    componentDidMount = async () => {
        const faves = await request.get('http://localhost:3000/api/me/favorites')
        .set('Authorization', this.props.user.token);

        this.setState({ album: faves.body })
    }

    render() {
        return (
            <div>
                <List album={ this.state.album }/>
            </div>
        )
    }
}
