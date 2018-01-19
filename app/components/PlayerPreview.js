var React = require('react');
var PropTypes = require('prop-types');


//PlayerPreview is used in both the Results component and Battle Component. Stateless Funcitonal, purely displays the players image and github handle.
//uses child props to pass the correct UI from either Battle or Results, depending on which one invoked it.
function PlayerPreview(props){
  return(
    <div>
      <div className="column">
        <img
          className='avatar'
          src={props.avatar}
          alt={"Avatar for " + props.username}
        />
        <h2 className="username">@{props.username}</h2>
      </div>
      {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

module.exports = PlayerPreview;
