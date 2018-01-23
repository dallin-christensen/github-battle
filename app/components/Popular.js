//three components, SelectLanguage, RepoGrid, and Popular (parent)
var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

//stateless functional component, allows user to select which language they want to request from the github api.
function SelectLanguage(props){
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return(
    <ul className="languages">
      {languages.map(function(lang){
        return (
          <li
           style={lang === props.selectedLanguage ? {color: '#d0021b'}: null}
           onClick={props.onSelect.bind(null, lang)}
           key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

//stateless functional component. Repogrid takes the results recieved from github api, and renders our nice organized display for the app user.
function RepoGrid(props){

  return (
    <ul className='popular-list'>
      {props.repos.map(function(repo, index){
        return(
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">
              #{index+1}
            </div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={'Avatar for '+repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}


RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}


SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

//Popular is the parent of SelectLanguage and RepoGrid, the only two UI that display within this page.
//What Repos load corresponds to what the selectedLanguage state is. Initially set to "ALL"
//on mount, we fetch the "All" popular repos from github. RepoGrid displays top Repos.
//SelectLanguage allows the selectedLanguage state to be changed, and fetches repos accordingly.
class Popular extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang){
    this.setState(function(){
      return{
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => ({
            repos: repos
        }));
      });
  }

  render(){

    return(
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
        ? <Loading />
        : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}


module.exports = Popular;
