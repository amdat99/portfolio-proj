import React from 'react';

import { shallow,render,mount } from 'enzyme';
import {createSerializer} from 'enzyme-to-json';
import toJson from 'enzyme-to-json';


import ProductItem from './Product-item'

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
// describe('cart item', () => {
      
        let mockFetchProductPending = jest.fn();
        let  mockIncrementItem = jest.fn();
        let mockDecrementItem = jest.fn();
        let wrapper
        let wrapper2

        
  beforeEach(() => {

   const mockProps = {
            item: {
              picture: 'www.picture.com',
              price: 10,
              name: 'ball',
              quantity: 5,
              profileId: 123
            },
           
            incrementItem: mockIncrementItem,
          
          }; 
          
           wrapper = toJson(shallow(<ProductItem  {...mockProps} />))
           wrapper2 = shallow(<ProductItem {...mockProps} />);
        })
        



it('expect to render cartItem component', () => {
    expect(wrapper).toMatchSnapshot();
})


  it('expect increment item to be called when item added', () => {
    wrapper2.find('.product-item-button').simulate('click')
    expect(mockIncrementItem).toHaveBeenCalled();
  });
;
