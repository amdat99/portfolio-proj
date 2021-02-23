import React from 'react';

import { shallow } from 'enzyme';
import {createSerializer} from 'enzyme-to-json';
import toJson from 'enzyme-to-json';

import {ProductPage} from './Product-page'

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

      
  
        let wrapper
   

        
  beforeEach(() => {

   const mockProps = {
            produt: {
              picture: 'www.picture.com',
              price: 10,
              name: 'ball',
              quantity: 5,
              profileId: 123
            },
          
          }; 
          
           wrapper = toJson(shallow(<ProductPage  {...mockProps} />))
           
        })
        



it('expect to render cartItem component', () => {
    expect(wrapper).toMatchSnapshot();
})

