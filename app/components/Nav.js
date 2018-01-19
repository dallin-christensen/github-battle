var React = require('react');
var NavLink = require('react-router-dom').NavLink;

//SPA navigation. Since this app isn't actually directing to different pages, this gives the UI for the management parent component rendered. React Router navlink implementation.
function Nav(){

  return (
    <ul className="nav">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/battle">
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/popular">
          Popular
        </NavLink>
      </li>
    </ul>

  )

}

module.exports = Nav;
