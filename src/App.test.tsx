import React from 'react';
import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';

import App from './App';

import UVHeader from './components/uv_header/uv_header';

import * as headerJSONData from './components/uv_header/uv_header.json'
import UVDashboard from './modules/uv_dashboard/uv_dashboard';
import { UVRootState } from './root.reducer';

jest.mock('react-redux');

let shallowComponent: any;


describe('***********************************App Component***********************************', ()=> {

  beforeEach( () => {
    shallowComponent = shallow(<App />);
  });

  test('Contains Header component', ()=> {
    const headerComponent = shallowComponent.find(UVHeader);
    expect(headerComponent).toHaveLength(1);
  });

  test('Contains Dashboard module', ()=> {
    const dashboardComponent = shallowComponent.find(UVDashboard);
    expect(dashboardComponent).toHaveLength(1);
  });

});
