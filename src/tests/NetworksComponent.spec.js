import React from 'react';
import NetworksComponent from '../components/GalleryComponent';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

const component = shallow(<NetworksComponent />)

it('render  selections', () => {
    expect(component.find('DropdownItem'))
})