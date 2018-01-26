//three components, SelectLanguage, RepoGrid, and Popular (parent)
import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

//stateless functional component, allows user to select which language they want to request from the github api.
function SelectLanguage({ selectedLanguage, onSelect }){
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return(
    <ul className="languages">
      {languages.map((lang) => {
        return (
          <li
           style={lang === selectedLanguage ? {color: '#d0021b'}: null}
           onClick={() => onSelect(lang)}
           key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

//stateless functional component. Repogrid takes the results recieved from github api, and renders our nice organized display for the app user.
function RepoGrid({ repos }){

  return (
    <ul className='popular-list'>
      {repos.map(({ owner, stargazers_count, name, html_url }, index) => (
        <li key={name} className="popular-item">
          <div className="popular-rank">
            #{index+1}
          </div>
          <ul className="space-list-items">
            <li>
              <img
                className="avatar"
                src={owner.avatar_url}
                alt={'Avatar for '+owner.login}
              />
            </li>
            <li><a href={html_url}>{name}</a></li>
            <li>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      ))}
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

  state = {
    selectedLanguage: 'All',
    repos: null
  }

  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = async (lang) => {
    this.setState(() => ({ selectedLanguage: lang, repos: null }) );

    const repos = await fetchPopularRepos(lang);
    this.setState(() => ({ repos }));
    
  }

  render(){
    const { selectedLanguage, repos } = this.state;

    return(
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos
        ? <Loading />
        : <RepoGrid repos={repos} />}
      </div>
    )
  }
}


export default Popular;
