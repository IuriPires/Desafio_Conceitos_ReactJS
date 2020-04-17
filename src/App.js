import React, { useEffect, useState } from "react";
import api from 'services/api';
import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  const repository = {
    title: `Repositorio criado ${Date.now()}`,
    techs: ['ReactJS', 'NodeJS'],
    url: 'https://fakeurl.com'
  }
  
  async function fetchRepositories() {
    api.get('repositories')
    .then(({ data }) => {
      setRepositories(data);
    });
  }

  async function handleAddRepository() {
    api.post('repositories', repository)
    .then(({data}) => {
      setRepositories([...repositories, data]);
    });
  }

  async function handleRemoveRepository(id) {
    return api.delete(`repositories/${id}`)
    .then(() => {
      setRepositories([])
    })
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
