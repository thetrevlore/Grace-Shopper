import { expect } from 'chai';
import React from 'react';
import enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import spy from 'sinon';
import { cartList } from './cartList';

const adapter = new Adapter()
enzyme.configure({adapter})

describe('cartList component', () => {
  let clickSpy, cart

  beforeEach('Create component and event spy', () => {
    clickSpy = spy();
    cart = shallow(<cartList onClick={clickSpy} />)
  });

  xit('calls click fn', () => {
    cart.simulate('click');
    expect(clickSpy.called).to.be.equal(true);
  });

})
