import { Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import './uv_settings.css';
import * as settingsData from './uv_settings.json';
import { updateLanguage, updateLocale } from './uv_settings.actions';
import { UVRootState } from '../../root.reducer';

const Settings = () => {

  const dispatch = useDispatch();

  const language = useSelector((state: UVRootState) => {
    return state.settings.language;
  });

  const locale = useSelector((state: UVRootState) => {
    return state.settings.locale;
  });

  const changeLanguage = (event: any)=> {
    dispatch(updateLanguage(settingsData.language.items[event.target.selectedIndex]));
  }

  const changeLocale = (event: any)=> {
    dispatch(updateLocale(settingsData.locale.items[event.target.selectedIndex]));
  }

  return (
    <div className="uv-settings-container">
      <Col md={{ offset: 3, span: 6 }}>
        <Form className="uv-background-color-faded">
          <fieldset >
            <Form.Group as={Row} >
              <Form.Label as="legend" column md={{offset: 1, span: 3 }} xs={{offset: 1, span: 3 }}>
                {settingsData.language.label}
		          </Form.Label>
              <Col md={{offset: 3, span: 3}} xs={{offset: 2, span: 5}}>
                <Form.Control as="select" value={language.title} onChange={(event)=>{changeLanguage(event)}}>
                  {settingsData.language.items.map((languageObj: any, languageIndex: any) => (
                    <option key={'language-' + languageIndex}>{languageObj.title}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label as="legend" column md={{offset: 1, span: 3 }} xs={{offset: 1, span: 3 }}>
                {settingsData.locale.label}
              </Form.Label>
              <Col md={{offset: 3, span: 3}} xs={{offset: 2, span: 5}}>
                <Form.Control as="select" value={locale.title} onChange={(event)=>{changeLocale(event)}}>
                  {settingsData.locale.items.map((localeObj: any, localeIndex: number) => (
                    <option key={'locale-' + localeIndex}>{localeObj.title}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

          </fieldset>
        </Form>
      </Col>
    </div>
  )
};

export default Settings;
