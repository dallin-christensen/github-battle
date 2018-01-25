const React = require('react');
const PropTypes = require('prop-types');


//PlayerPreview is used in both the Results component and Battle Component. Stateless Funcitonal, purely displays the players image and github handle.
//uses child props to pass the correct UI from either Battle or Results, depending on which one invoked it.
function PlayerPreview({ avatar, username, children}}){
  return(
    <div>
      <div className="column">
        <img
          className='avatar'
          src={avatar}
          alt={"Avatar for " + username}
        />
        <h2 className="username">@{username}</h2>
      </div>
      {children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

module.exports = PlayerPreview;
