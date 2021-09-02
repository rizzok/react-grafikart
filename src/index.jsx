import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

function useIncrement(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue)
  const increment = () => {
    setCount(c => c + step)
  }
  return [count, increment]
}

function useAutoIncrement(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount(c => c + step)
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])
  
  return count
}

function useToggle(initialValue = true) {
  const [value, setValue] = useState(initialValue)
  const toggle = function () {
    setValue(v => !v)
  }
  return [value, toggle]
}

function useFetch(url) {
  const [state, setState] = useState({
    items: [],
    loading: true
  })

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setState({
        items: data, 
        loading: false
      }))
    // if (!response.ok) {
    //   console.log('!!!!!' + JSON.stringify(data));
    //   setState(s => ({...s, loading: false}))
    // }
  }, [])
  
  return [state.loading, state.items]
}

function Compteur() {
  const count = useAutoIncrement()
  return <button>Compteur = {count}</button>
}

function TodoList() {
  const [loading, items] = useFetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

  if (loading) return <p>Chargement...</p>
  
  return <ul>
    {items.map(t => <li key={t.id}>{t.title}</li>)}
  </ul>
}

function PostTable() {
  const [loading, items] = useFetch('https://jsonplaceholder.typicode.com/comments?_limit=10')

  if (loading) return <p>Chargement...</p>

  return <div className='postTable'>
    {items.map(p => {
      return <div className='post' key={p.id}>
        <h2>{p.name}</h2>
        <p>{p.email}</p>
        <p>{p.body}</p>
      </div>
    })}
  </div>
}

function App() {
  const [compteurVisible, toggleCompteur] = useToggle(true)
  
  return <div>
    Afficher le compteur
    <input type="checkbox" onChange={toggleCompteur} checked={compteurVisible} />
    <br />
    {compteurVisible && <Compteur />}
    <TodoList />
    <PostTable />
  </div>
}

render(
  <App />,
  document.getElementById('root')
)
