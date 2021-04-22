import React, {useCallback, useEffect, useRef, useState} from 'react';
import search from './images/search.png';
import HintItem from "./components/HintItem/HintItem";
import Loader from "./components/Loader/Loader";

export interface UserInterface {
  id: string,
  name: string,
  email: string
}

const App: React.FC = () => {
  const hintRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState<string>('')
  const [activeHint, setActiveHint] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hintShow, setHintShow] = useState(false)
  const [users, setUsers] = useState<UserInterface[]>([])

  const changeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(prevState => {
      if (prevState.length <= 1 && event.target.value.length > 1)
        getUsers()

      if (event.target.value.length <= 1)
        setUsers([])

      return event.target.value
    });
  }, [])

  const setUser = useCallback((id: number) => {
    setActiveHint(0)
    setHintShow(false)
    setInput(users[id].name)
  }, [users])

  const keyPressHandler = useCallback((event: React.KeyboardEvent) => {
    let active = activeHint
    if (users) {
      if (event.key === 'Enter') {
        return setUser(active)
      }

      if (event.key === 'ArrowDown' && active !== users.length - 1) {
        active++
      }

      if (event.key === 'ArrowUp' && active !== 0) {
        active--
      }

      if (hintRef.current) {
        hintRef.current.scroll(0, active * 50)
      }

      setActiveHint(active)
    }
  }, [users, setActiveHint, activeHint, setUser])

  const getUsers = () => {
    setLoading(true)
    setHintShow(true)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        const data = json.map((fetchedUser: any) => {
          return {
            id: fetchedUser.id,
            name: fetchedUser.name,
            email: fetchedUser.email
          }
        })

        // Check loader
        setTimeout(() => {
          setUsers(data)
          setLoading(false)
        }, 2000)

        // setUsers(data)
        // setLoading(false)
      })
      .catch(error => {
        setHintShow(false)
        setLoading(false)
        throw new Error(error)
      })
  }

  return (
    <div>
      <p className="prompt">Для того что бы появилась подсказка начните ввод</p>
      <p className="timeout">Задержка в запросе добавлена искусствено, ее можно убрать тут (App.tsx:76-79)</p>
      <div className="input-fluid">
        <img className="input-icon" src={search} alt="search"/>
        <input
            type="text"
            onKeyUp={keyPressHandler}
            onChange={changeHandler}
            value={input}
            placeholder="Search"
        />
        {
          hintShow ?
              <div className="hint" ref={hintRef}>
                {

                  !loading ?
                    users.map((user, index) => {
                      return (
                        <HintItem
                          key={user.id}
                          user={user}
                          index={index}
                          clickHandler={setUser}
                          setActiveHint={setActiveHint}
                          active={activeHint === index}
                        />
                      )
                    })
                    : <Loader/>
                }
              </div>
            : null
        }

      </div>
    </div>
  );
}

export default App;
