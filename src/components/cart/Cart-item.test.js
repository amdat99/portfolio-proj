import React from 'react';

import { shallow,render,mount } from 'enzyme';
import {createSerializer} from 'enzyme-to-json';
import toJson from 'enzyme-to-json';
import { withRouter } from 'react-router-dom'

import CartItem from './Cart-item'

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
            fetchProductPending: mockFetchProductPending,
            incrementItem: mockIncrementItem,
            decrementItem: mockDecrementItem
          }; 
          
           wrapper = toJson(shallow(<CartItem  {...mockProps} />))
           wrapper2 = shallow(<CartItem {...mockProps} />);
        })
        



it('expect to render cartItem component', () => {
    expect(wrapper).toMatchSnapshot();
})

it('expect increment item to be called item added', () => {

    wrapper2.find('img').simulate('click')
    expect(mockFetchProductPending).toHaveBeenCalled();
  });
// 