import React, { useState, useEffect } from "react";
import api from "./services/api.js"

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const newRepo = {
      title: `${Date.now()}`,
      url: "https://github.com/LFPaiser/Be-The-Hero-SOS-11.0",
      techs: ["Node.js", "React JS", "React Native"]
    }

    const response = await api.post(`repositories`, newRepo)

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">{
        repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
