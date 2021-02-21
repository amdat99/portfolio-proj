import React from 'react';

import { shallow } from 'enzyme';
import {createSerializer} from 'enzyme-to-json';
import toJson from 'enzyme-to-json';

import CartDropdown from './Cart-dropdown'

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

it('expect to render Greeting component', () => {
    const mockCartItems = [ {
        name: 'ball',
        price: '5',
        seller: 'john',
        image: 'picture',
        id: 'id'
    }]
    expect(toJson(shallow(<CartDropdown  cartItems={mockCartItems}/>))).toMatchSnapshot();
})
