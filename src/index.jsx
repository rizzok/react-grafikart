import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

function useIncrement (initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue)

  const increment = function () {
    setCount(c => c + 1)
  }

  return [
    count, 
    increment
  ]
}

function useAutoIncrement (initialValue = 0, step = 1) {
  const [value, setValue] = useState(initialValue)

  return [value, increment]
}

function useToggle(initialValue = true) {
  const [compteurVisible, setCompteurVisible] = useState(initialValue)
  const toggleCompteur = function () {
    setCompteurVisible(c => !c)
  }
  return [compteurVisible, toggleCompteur]
}

function Compteur () {
  const [count, increment] = useAutoIncrement(10)

  return <button onClick={increment} className="compteur">Incrémenter {count}</button>
}

function App () {

  // const [compteurVisible, toggleCompteur] = useToggle(true)
  
  return <div>
    {/* Afficher le compteur
    <input type="checkbox" onChange={toggleCompteur} checked={compteurVisible} />
    <br />
    {compteurVisible && <Compteur />} */}
    <TodoList />
  </div>
}

function TodoList () {
  const [todos, setTodos] = useState([])

  useEffect(function () {
    (async function () {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      const responseData = await response.json()
      if (response.ok) {
        setTodos(responseData)
      } else {
        alert(JSON.stringify(responseData))
      }
    })()
  }, [])
  
  return <div>
    {todos.map(t => <li>{t.title}</li>)}
  </div>
}

render (
  <App />, 
  document.getElementById('app')
)
