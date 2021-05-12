import { shallow } from 'enzyme';

import UVTable from './uv_table.component';


describe('Table Component Suite', ()=> {

  const tableHeaders = ['Test1', 'Test2'],
      tableRows = [
                  [1, 5],
                  [2, 7],
                  [3, 11]
                ];

  test('has correct snapshot', ()=> {
    expect(UVTable).toMatchSnapshot();
  });

  test('renders passed rows and headers', ()=> {
    const shallowComponent = shallow(<UVTable headers={tableHeaders} rows={tableRows}/>);
    expect(shallowComponent.text()).toContain(tableHeaders[0]);
    expect(shallowComponent.find('th').length).toEqual(tableHeaders.length);
    expect(shallowComponent.find('td').length).toEqual(tableHeaders.length * tableRows.length);
  });

  test('does not render table when no data is provided', ()=> {
    const shallowComponent = shallow(<UVTable headers={[]} rows={[[]]}/>);
    expect(shallowComponent.find('th').length).toEqual(0);
    expect(shallowComponent.find('td').length).toEqual(0);
  });
});
