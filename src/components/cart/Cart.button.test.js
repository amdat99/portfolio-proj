import React from 'react';

import { shallow} from 'enzyme';
import {createSerializer} from 'enzyme-to-json';
import toJson from 'enzyme-to-json';


import {CartButton} from './Cart-button'

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
// describe('cart item', () => {
      
        let mocktoggleCartHidden = jest.fn();
        let wrapper
        let wrapper2

        
  beforeEach(() => {

   const mockProps = {
            itemCount: '1',
            toggleCartHidden: mocktoggleCartHidden,
          
          }; 
          
           wrapper = toJson(shallow(<CartButton  {...mockProps} />))
           wrapper2 = shallow(<CartButton {...mockProps} />);
        })
        



it('expect to render cartButton component', () => {
    expect(wrapper).toMatchSnapshot();
})

it('expect togglecart hidden to be called on click', () => {
    wrapper2.find('.cart-button-container').simulate('click');
    expect(mocktoggleCartHidden).toHaveBeenCalled()
})

it('the count number should be rendered', () => {
    const itemCount = parseInt(wrapper2.find('.cart-button-count').text());
    expect(itemCount).toBe(1);
  });



