import React, { useState, useEffect } from 'react';
import Personas from './personas';
import Filtro from './filtro';
import Formulario from './formulario';
import phoneService from "../Services/phonebook"
import Notification from './notificacion';



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [estados, setEstados] = useState(false)

  //GET
  useEffect(() => {
    phoneService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()

    if (persons.find((person) => person.name === newName)) {
      const contacto = persons.find((contacto) => contacto.name === newName)
      const contacto2 = { ...contacto, number: newNumber }

      const confirmacion = window.confirm(`${newName} ya ha sido añadido al phonebook, desea reemplezar el numero?`)

      if (confirmacion == true) {
        console.log('update');
        //actualizar
        phoneService
          .update(contacto.id, contacto2)
          .then(response => {
            setPersons(persons.map(c => {
              if (c.id !== contacto.id) {
                return c
              } else {
                return response
              }
            }))
            setEstados(true)
            setMessage(`Se actulizó al contacto ${newNumber}`)
            setTimeout(() => {
              setEstados(false)
              setMessage(null)
            }, 5000)

          })
          .catch(error => {
            setEstados(false)
            setMessage(`El contacto  ${newName} no se pudó actualizar`)
            setTimeout(() => {
              setEstados(false)
              setMessage(null)
            }, 5000)
          })

        setNewName('')
        setNewNumber('')
      }
    } else {
      console.log('create');

      const personObject = {
        name: newName,
        number: newNumber
      }

      //CREATE
      phoneService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setEstados(true)
          setMessage(`Se añadió al contacto ${newName}`)
          setTimeout(() => {
            setEstados(false)
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setEstados(false)
          setMessage('Error al agregar contacto ')
          setTimeout(() => {
            setEstados(false)
            setMessage(null)
          }, 5000)
        })

        setNewName('')
        setNewNumber('')



    }
  }


  const handleNewName = (event) =>
    setNewName(event.target.value)

  const handleNewNumber = (event) =>
    setNewNumber(event.target.value)

  const handleFilter = (event) => setFilter(event.target.value)


  const personasMostrar =
    filter === ''
      ? persons
      : persons.filter(
        (person) =>
          person.name
            .toLowerCase()
            .indexOf(filter.toLowerCase()) > -1
      )

  const borrarPersona = (id) => {
    const contacto = persons.find(c => c.id === id)
    const contacto2 = persons.filter(c => c.id !== contacto.id)
    const confirmacion = window.confirm(`¿Desea borrar al contacto: ${contacto.name} ?`)

    if (confirmacion) {
      phoneService
        .eliminar(id)
        .then(response => {
          setEstados(true)
          setPersons(contacto2)
          setMessage(`Se ha eliminado al contacto ${contacto.name}`)
          setTimeout(() => {
            setEstados(false)
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setEstados(false)
          setMessage(`No se pudó eliminar al contacto ${contacto.name} `)
          setTimeout(() => {
            setEstados(false)
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(c => c.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          <Notification message={message} />
      </div>
      
      <Filtro handleFilter={handleFilter} />

      <div>
        <h2>add a new</h2>
      </div>

      <Formulario
        addNewName={addName}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Personas
        personasMostrar={personasMostrar}
        borrarPersona={borrarPersona}
      />
    </div>
  )
}


export default App