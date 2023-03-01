import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [sortOption, setSortOption] = useState('stars');

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    setRepos(response.data);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortFunction = (a, b) => {
    if (sortOption === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    } else if (sortOption === 'forks') {
      return b.forks_count - a.forks_count;
    } else {
      return 0;
    }
  };

  const sortedRepos = [...repos].sort(sortFunction);

  const handleBack = () => {
    setUsername('');
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          class="form-control" 
          id="formGroupExampleInput" 
          placeholder="Githubuser name:"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button class="button-small" type="submit"><p id="button-text">Search</p></button>
        <button class="button-small" onClick={handleBack}><p id="button-text">Back</p></button>
      </form>
      <div>
        <label htmlFor="sortOption">Sort by:</label>
        <select id="sortOption" value={sortOption} onChange={handleSortChange}>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </select>
      </div>
      <ul>
        {sortedRepos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url}>{repo.name}</a>
            <span>Stars: {repo.stargazers_count}</span>
            <span>Forks: {repo.forks_count}</span>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default Search;