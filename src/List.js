import React, { Component } from 'react'
import request from 'superagent';
import { withRouter } from 'react-router-dom';

// we need withRouter to get access to the URL to see if we are on the favorites page 
export default withRouter(class List extends Component {
    /* whenever youre in a list and clicking on an item has a function that needs access to that item, you need a function that returns a function*/
    makeFavorite = async (record) => {
        console.log('List', this.props)
        // when the user clicks the makeFavorite button, add this character to the favorite list
        const fave = await request.post('http://localhost:3000/api/me/favorites', {
            artist: record.artist,
            album: record.name,
            image: record.url,
        })
        .set('Authorization', this.props.user.token)

        console.log('fave', fave.body)
    }
    
    renderButtonOrStar = (record) => {
        // check the favorites list if we're on the search page
        const isOnFavoritesList = this.props.favorites.find(person => record.name === person.name);
        if (!isOnFavoritesList) {
            // if they're not on the list, give user option to add them to favorites
            // we are iterating through a list, and we need the item in a function, so we make an anonymous function that CALLS that function on click with the right arguments
        return <button onClick={ (e) => this.makeFavorite(record)}>Make favorite</button>
        }

        // otherwise, indicate that they ae already on the favorites list
        return <span role="img" alt="star" aria-labelledby="star-boy">⭐</span>
    }

    render() {
        console.log('url', this.props)
        return (
            <div>
                {
                    // iterate over the characters, and for each character, show their name
                    this.props.album.map(record => <div key={[...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('')} className="record-box">
                        <div>{record.artist}</div>
                        <div>{record.name}</div>
                        <div>{record.url}</div>
                        <div><img alt="record" src={record.image[2]['#text']}/></div>
                        {
                            this.props.location.pathname !== '/favorites' 
                            // only render a button or star on the search page
                                && this.renderButtonOrStar(record)
                        }
                    </div>)
                }
            </div>
        )
    }
})