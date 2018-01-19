var React = require('react');
var Link = require('react-router-dom').Link;

//simple, dynamically rendered home page routed with react router. Links to Battle page. Stateless.
class Home extends React.Component{
  render(){
    return(
      <div className="home-container">
        <h1>Github Battle: Battle your friends...and stuff.</h1>

        <Link className="button" to="/battle">
          Battle
        </Link>
      </div>
    );
  }
}



module.exports = Home;
