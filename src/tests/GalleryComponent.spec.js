import React from 'react';
import GalleryComponent from '../components/GalleryComponent';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

const component = shallow(<GalleryComponent />)

it('render  pictures', () => {
    expect(component.find('h5'))
})