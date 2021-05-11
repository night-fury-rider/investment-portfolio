import { shallow } from 'enzyme';

import App from './App';

import UVHeader from './components/uv_header/uv_header';

import UVDashboard from './modules/uv_dashboard/uv_dashboard';

jest.mock('react-redux');

let shallowComponent: any;


describe('App Component', ()=> {

  beforeEach( () => {
    shallowComponent = shallow(<App />);
  });

  test('contains Header component', ()=> {
    const headerComponent = shallowComponent.find(UVHeader);
    expect(headerComponent).toHaveLength(1);
  });

  test('contains Dashboard module', ()=> {
    const dashboardComponent = shallowComponent.find(UVDashboard);
    expect(dashboardComponent).toHaveLength(1);
  });

});
