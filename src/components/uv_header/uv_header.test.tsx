import React from 'react';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UVHeader from './uv_header';
import * as headerData from './uv_header.json';

Enzyme.configure({ adapter: new Adapter() });

describe('Header Component Suite', ()=> {

  const headerTitle = 'Test Title',
        centralTitle = 12345678,
        theme = 'success',
        alt='Yuvi',
        logoWidth = '100px',
        logoAlt = 'Yuvraj',
        logoFile = 'test.png',
        primaryWebsite = 'www.test.com',
        repositoryUrl = 'test20.com',
        repositoryHeight ='100px',
        repositoryLogo = 'test.png';

  test('has correct snapshot', ()=> {
    expect(<UVHeader title={headerData.config.title}
                    centralTitle={centralTitle}
                    theme={headerData.config.theme}
                    alt={headerData.config.alt}
                    primaryWebsite={headerData.config.primaryWebsite}
                    repository={headerData.config.repository}
                    menu={headerData.config.menu}/>).toMatchSnapshot();
  });

  test('renders with props provided', ()=> {
    let shallowComponent = shallow(<UVHeader title={headerTitle} />);
    expect(shallowComponent.text()).toContain(headerTitle);
    expect(shallowComponent.find('.uv-central-title').length).toEqual(0);
    expect(shallowComponent.find('.toolbar.' + theme).length).toEqual(0);
    expect(shallowComponent.find('.toolbar a.website-link').prop('href')).not.toBeDefined();

    expect(shallowComponent.find('.website-link img').prop('width')).not.toEqual(logoWidth);
    expect(shallowComponent.find('.website-link img').prop('alt')).not.toEqual(logoAlt);
    expect(shallowComponent.find('.website-link img').prop('src')).not.toEqual(logoFile);
    expect(shallowComponent.find('.repository-link img').children().length).toEqual(0);

  });
});
