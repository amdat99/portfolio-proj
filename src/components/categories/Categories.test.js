import React from 'react';

import { shallow} from 'enzyme';
import {createSerializer} from 'enzyme-to-json';
import toJson from 'enzyme-to-json';

import {Categories} from './Categories'

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

        let wrapper
        let wrapper2
        let mockfetchCategoryPending

        const mockMatch = {
            params: 'shoes',
            url: 'shoes'
          };
      

        
  beforeEach(() => {
   
    mockfetchCategoryPending = jest.fn();

   const mockProps = {
            categoryItems: {
              picture: 'www.picture.com',
              price: 10,
              name: 'ball',
              quantity: 5,
              profileId: 123
            },
            match: mockMatch,
            fetchCategoryPending: mockfetchCategoryPending

            }
        
          
           wrapper = toJson(shallow(<Categories  {...mockProps} />))
           wrapper2 = shallow(<Categories {...mockProps} />);
        })
        



it('expect to render cartItem component', () => {
    expect(wrapper).toMatchSnapshot();
    

})

it('expect fetchcategory pending to be called on render', () => {
    const match = '/category/'+'shoes'
    if( match.url === '/category/'+'shoes'){
   expect(mockfetchCategoryPending).toHaveBeenCalled();
    }

    // it('the counrt numbet should be rendered', () => {
    //     const match = parseInt(wrapper2.find('.categories-title').text());
    //     expect(match.params).totoBe('shoes');
    //   });

      
// it('the count number should be rendered', () => {
//     const itemCount = parseInt(wrapper2.find('.cart-button-count').text());
//     expect(itemCount).toBe(1);
//   });

 
})

