import React from 'react';

import { shallow} from 'enzyme';
import {createSerializer} from 'enzyme-to-json';
import toJson from 'enzyme-to-json';

import {ShopHeader} from './Shop-header'

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
// describe('cart item', () => {
      

        let wrapper
        let wrapper2
        const mockCategories = ['shoes'];
        let mockfetchCategoryPending = jest.fn();
        let mockonDropdownToggle = jest.fn();
   

        
  beforeEach(() => {




   const mockProps = {
          categories: mockCategories,

            fetchCategoryPending: mockfetchCategoryPending,
            onDropdownToggle: mockonDropdownToggle
           
          }; 
          
           wrapper = toJson(shallow(<ShopHeader  {...mockProps} />))
           wrapper2 = shallow(<ShopHeader {...mockProps} />);
        })
        



it('expect to render cartDropdowncomponent', () => {
    expect(wrapper).toMatchSnapshot();
})


// it('should call category  when button clicks', () => {
//   wrapper2.find('.shopheader-title').simulate('click');
//   expect(mockfetchCategoryPending).toHaveBeenCalled();
// });

// it('should call togglecart  when button clicks', () => {
// wrapper2.find('[id="shopheader-hover"]').simulate('mouseenter');
//     expect(mockonDropdownToggle).toHaveBeenCalled();
//   });
  




