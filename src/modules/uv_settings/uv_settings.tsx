import { Row, Col, Form, Button } from 'react-bootstrap';
import './uv_settings.css';
import * as settingsData from './uv_settings.json';

const Settings = () => {

  const saveSettings = () => {
    console.log('Settings have been saved');
  };

  return (
    <div className="uv-settings-container">
      <Col md={{ offset: 3 }}>
        <Form>
          <fieldset >
            <Form.Group as={Row}>
              <Form.Label as="legend" column md={{ span: 3 }} xs={{ span: 3 }}>
                Language
		          </Form.Label>
              <Col md={3} xs={5}>
                <Form.Control as="select">
                  {settingsData.languages.map((language: any, languageIndex: any) => (
                    <option key={'language-' + languageIndex}>{language.title}</option>
                  ))}

                </Form.Control>
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row} className="submit">
            <Col md={{ span: 3, offset: 3 }} xs={{ span: 3, offset: 4 }}>
              <Button onClick={saveSettings}>Save</Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </div>
  )
};

export default Settings;
