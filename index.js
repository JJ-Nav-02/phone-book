import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Personas from './componentes/personas';
import Filtro from './componentes/filtro';
import Formulario from './componentes/formulario';
import axios from 'axios';



const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', phone: '' })
  const [filter, setFilter] = useState('')
  const isNewName = persons.find(
    (persons) =>
      persons.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase()
  )

  useEffect(() => {
    console.log('Entro al Effect');
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('Entro al then');
        setPersons(response.data)
      })
  }, [])
  
  const addNewName = (event) => {
    event.preventDefault()

    if (!isNewName) {
      const personObject = {
        name: newPerson.name,
        phone: newPerson.phone,
      }

      setPersons(persons.concat(personObject))
      setNewPerson({ name: '', phone: '' })
    } else {
      alert(`${newPerson.name} ya esta dado de alta`)
    }
  }

  const handleNewName = (event) =>
    setNewPerson({ newPerson, name: event.target.value })

  const handleNewPhone = (event) =>
    setNewPerson({ newPerson, phone: event.target.value })

  const handleFilter = (event) => setFilter(event.target.value)

  const personasMostrar =
    filter === ''
      ? persons
      : persons.filter(
        (person) =>
          person.name
            .toLocaleLowerCase()
            .indexOf(filter.toLocaleLowerCase()) > -1
      )



  return (
    <div>
      <h2>Phonebook</h2>
      <Filtro handleFilter={handleFilter} />

      <div>
        <h2>add a new</h2>
      </div>
      <h2>Numbers</h2>
      <Formulario
        addNewName={addNewName}
        handleNewName={handleNewName}
        handleNewPhone={handleNewPhone}
        newPerson={newPerson}
      />
      <Personas personasMostrar={personasMostrar} />
    </div>
  )

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

