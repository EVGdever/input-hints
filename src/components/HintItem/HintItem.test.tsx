import React from 'react';
import {shallow, mount} from 'enzyme';
import HintItem from "./HintItem";

let activeHint = 0

const props = {
  user: {
    email: "Sincere@april.biz",
    id: '1',
    name: "Leanne Graham"
  },
  activeHint,
  clickHandler: (id: number) => {
    console.log(id)
  },
  index: 0,
  setActiveHint() {
    activeHint++;
  }
}

describe('HintItem', () => {
  it('should render a hint-item', () => {
    const component = shallow(
      <HintItem
        key={props.user.id}
        user={props.user}
        index={props.index}
        clickHandler={props.clickHandler}
        setActiveHint={props.setActiveHint}
        active={props.activeHint === props.index}
      />
    )

    expect(component).toMatchSnapshot();
  });
})