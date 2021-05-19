import UVDashboard from './uv_dashboard';
import { shallow } from 'enzyme';

import UVPie from '../../components/uv_pie/uv_pie';
import UVBarChart from '../../components/uv_bar-chart/uv_bar-chart';
import UVAngularGauge from '../../components/uv_angular-gauge/uv_angular-gauge';
import UVNumber from '../../components/uv_number/uv_number';
import UVTable from '../../components/uv_table/uv_table.component';

describe('Dashboard Component Suite', ()=> {

  test('loads corresponding components', ()=> {
    const shallowComponent = shallow(<UVDashboard />);

    expect(shallowComponent.find(UVPie)).toHaveLength(1);
    expect(shallowComponent.find(UVBarChart)).toHaveLength(1);
    expect(shallowComponent.find(UVAngularGauge)).toHaveLength(0);
    expect(shallowComponent.find(UVNumber)).toHaveLength(0);
    expect(shallowComponent.find(UVTable)).toHaveLength(0);
  });
});