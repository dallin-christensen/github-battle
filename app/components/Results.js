//Results, Player, Profile

import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';


//Stateless Functional. Renders PlayerPreview component as well as statistics view for the Player component.
function Profile({ info }){
  const { avatar_url, login, name, location, company, followers, following, public_repos, blog } = info;

  return(
    <PlayerPreview avatar={avatar_url} username={login}>
      <ul>
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers:{followers}</li>
        <li>Following:{following}</li>
        <li>Public Repos:{public_repos}</li>
        {blog && <li><a href={blog}>{blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

//stateless functional. Player nicely places together the specific profile component with corresponding "winner", "loser", and scores.
function Player({label, score, profile}){
  return(
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}


//Results, after component mounts and data is fetched from github, sets state to player data.
//on set state, if no errors, displays the player components passing results though props.
class Results extends React.Component{

  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }


  async componentDidMount(){
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);

    const players = await battle([ playerOneName, playerTwoName ]);

    if(results === null){
      return this.setState(() => ({
        error: 'there was an error. check that both users exist on github',
        loading: false
      }));
    }

    this.setState(() => ({
      error: null,
      winner: results[0],
      loser: results[1],
      loading: false
    }));

  }

  render(){
    const { error, winner, loser, loading } = this.state;

    if(loading){
      return <Loading />
    }

    if(error){
      return(
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return(
      <div className='row'>
        <Player
          label="Winner"
          score={winner.score}
          profile={winner.profile}
        />

        <Player
          label="Loser"
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

export default Results;
