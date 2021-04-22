import React from 'react';
import {shallow} from 'enzyme';
import Loader from "./Loader";

describe('Loader', () => {
  let wrapper;

  it('should render a loader', () => {
    wrapper = shallow(<Loader/>)
    expect(wrapper).toMatchSnapshot();
  });
})