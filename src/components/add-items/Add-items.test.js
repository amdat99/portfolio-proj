import React from 'react';

import { shallow,render,mount } from 'enzyme';
import {createSerializer} from 'enzyme-to-json';
import toJson from 'enzyme-to-json';

import {AddItems} from './Add-items'

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
// describe('cart item', () => {
      
        let mockhandleSubmit = jest.fn();
        let wrapper
        let wrapper2
    
        const mockOnChange = jest.fn();


        
  beforeEach(() => {

   const mockProps = {
            itemData:{ name: 'ball', price: 4, description: 'good', category: 'general', soldBy: 'john', picture: 'picyire', userId:'123',productId: 123},
            handleSubmit: mockhandleSubmit,
            submitToggle: true
            
          }; 
          
           wrapper = toJson(shallow(<AddItems  {...mockProps} />))
           wrapper2 = shallow(<AddItems {...mockProps} />)
        })

        afterEach(() => {
            jest.clearAllMocks();
        });
        
    it('expect to render additems component', () => {
    expect(wrapper).toMatchSnapshot();
    })

    // it('expect to render additems component', () => {

    //     wrapper2.find('.sign-on-container').simulate('submit');
    //     expect(mockhandleSubmit).toHaveBeenCalled()
    // })
