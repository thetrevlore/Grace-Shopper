/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleOrder} from './SingleOrder';
import sinon from 'sinon';

const adapter = new Adapter()
enzyme.configure({adapter})

describe('<SingleOrder />', () => {
  // let singleOrder

  // beforeEach(() => {
  //   singleOrder = shallow(<SingleOrder match={{params: {id: 1}}}/>)
  // })



  xit('calls componentWillMount', () => {
    // singleOrder = shallow(<SingleOrder match={{params: {id: 1}}}/>)
    sinon.spy(SingleOrder.prototype, 'componentWillMount');
    const wrapper = mount(<SingleOrder />);
    expect(SingleOrder.prototype.componentWillMount).to.have.property('callCount', 1);
  });

})






