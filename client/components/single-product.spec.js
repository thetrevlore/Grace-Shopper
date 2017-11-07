
/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleProduct from './single-product'
import AddProduct from './AddProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let singleProd

  beforeEach(() => {
    singleProd = shallow(<SingleProduct />)
  })

  it('renders single AddProduct component', () => {
    expect(singleProd.find('h1')).to.have.length(1);
  })
})