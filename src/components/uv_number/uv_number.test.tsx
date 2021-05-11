import { shallow } from 'enzyme';

import UVNumber from './uv_number';
import { numberTitle, numberLabel, numberConfig } from './uv_number.mocks';

let shallowComponent: any;

describe('UVNumber Component Suite', ()=> {

  beforeEach(()=> {
    shallowComponent = shallow(<UVNumber title={numberTitle} label={numberLabel}/>);
  });

  test('has correct snapshot', ()=> {
    expect(shallowComponent.find('.uv-number-container').length).toEqual(1);
  });

  test('renders title and label', ()=> {
    expect(shallowComponent.find('.uv-number-container').length).toEqual(1);
  });

  test('renders title and label with classes provided', ()=> {
    shallowComponent = shallow(<UVNumber title={numberTitle} label={numberLabel} config={numberConfig} />);
    expect(shallowComponent.find('.' + numberConfig.class).length).toEqual(1);
    expect(shallowComponent.find('.' + numberConfig.title.class).length).toEqual(1);
    expect(shallowComponent.find('.' + numberConfig.subtitle.class).length).toEqual(1);
  });
});
