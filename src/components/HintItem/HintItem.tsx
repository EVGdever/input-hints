import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {UserInterface} from "../../App";

export interface HintItemProps {
  index: number,
  active: boolean,
  user: UserInterface,
  clickHandler(id: number): void,
  setActiveHint: Dispatch<SetStateAction<number>>,
}

const HintItem: React.FC<HintItemProps> = ({
  user,
  active,
  clickHandler,
  setActiveHint,
  index
}) => {
  const [img, setImg] = useState(undefined);

  useEffect(() => {
    // Get user image
    fetch('https://jsonplaceholder.typicode.com/photos/' + user.id)
      .then(response => response.json())
      .then(json => setImg(json.url))
  }, [user])

  const hoverHandler = (id: number) => {
    setActiveHint(id)
  }

  return (
    <div
      className={"hint-item" + (active ? ' active' : '')}
      onClick={() => clickHandler(index)}
      onMouseEnter={() => hoverHandler(index)}
    >
      {
        img ?
          <>
            <img className="avatar" src={img} alt=""/>
            <div className="user-info">
              <p className="name">{user.name}</p>
              <p className="email">{user.email}</p>
            </div>
          </> : null
      }
    </div>
  )
}

export default HintItem;