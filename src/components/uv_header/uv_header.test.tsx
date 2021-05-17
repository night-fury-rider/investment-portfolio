import React from 'react';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UVHeader from './uv_header';


Enzyme.configure({ adapter: new Adapter() });

describe('UVHeader Component Suite', ()=> {

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
    expect(<UVHeader title={headerTitle}
                     centralTitle={centralTitle}
                     theme={theme}
                     alt={alt}
                     primaryWebsite={primaryWebsite}
                     logoWidth={logoWidth}
                     logoAlt={logoAlt}
                     logoFile={logoFile}
                     repositoryUrl={repositoryUrl}
                     repositoryHeight={repositoryHeight}
                     repositoryLogo={repositoryLogo}/>).toMatchSnapshot();
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

    shallowComponent = shallow(<UVHeader title={headerTitle}
                                         centralTitle={centralTitle}
                                         theme={theme}
                                         alt={alt}
                                         primaryWebsite={primaryWebsite}
                                         logoWidth={logoWidth}
                                         logoAlt={logoAlt}
                                         logoFile={logoFile}
                                         repositoryUrl={repositoryUrl}
                                         repositoryHeight={repositoryHeight}
                                         repositoryLogo={repositoryLogo}/>);


    expect(shallowComponent.find('.uv-central-title').length).toEqual(1);

    expect(shallowComponent.find('.toolbar.' + theme).length).toEqual(1);
    expect(shallowComponent.find('.website-link img').prop('width')).toEqual(logoWidth);

    expect(shallowComponent.find('a.repository-link').prop('href')).toEqual(repositoryUrl);
    expect(shallowComponent.find('.repository-link img').prop('alt')).toEqual(alt);
    expect(shallowComponent.find('.repository-link img').prop('height')).toEqual(repositoryHeight);
    expect(shallowComponent.find('.repository-link img').prop('src')).toEqual(repositoryLogo);


    shallowComponent = shallow(<UVHeader title={headerTitle}
                                         centralTitle={'' + centralTitle}
                                         repositoryUrl={repositoryUrl}/>);

    expect(shallowComponent.find('.uv-central-title').text()).toEqual('' + centralTitle);
    expect(shallowComponent.find('.repository-link img').prop('height')).toEqual('40px');
    expect(shallowComponent.find('.repository-link img').prop('src')).toEqual('logo192.png');
  });

});
