/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleOrder} from './SingleOrder';
import sinon from 'sinon';

const adapter = new Adapter()
enzyme.configure({adapter})


describe('SingleOrder component', () => {
  let orderId

  let spy = () => {}

  beforeEach(() => {
    orderId = shallow(<SingleOrder match={{params: {id: 1}}} fetchOrder={spy} />)
  })

  xit('renders the order id in an h4', () => {
    expect(orderId.find('h4').text()).to.be.equal(1);
  })
})

describe('SingleOrder component', () => {

  xit('calls componentWillMount', () => {
    sinon.spy(SingleOrder.prototype, 'componentWillMount');
    const wrapper = mount(<SingleOrder />);
    expect(SingleOrder.prototype.componentWillMount).to.have.property('callCount', 1);
  });

})




// const wrapper = shallow(<MyComponent />);
// expect(wrapper.find(Foo)).to.have.length(3);

