import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './uv_settings.css';
import * as settingsData from './uv_settings.json';

const Settings = () => {

  const changeLanguage = ()=> {
  	console.log('Language Changed');
  }

  return (
    <div className="uv-settings-container">
      <Col md={{ offset: 3, span: 6 }}>
        <Form>
          <fieldset >
            <Form.Group as={Row} className="uv-background-color-faded">
              <Form.Label as="legend" column md={{offset: 1, span: 3 }} xs={{offset: 1, span: 3 }}>
                {settingsData.language.label}
		          </Form.Label>
              <Col md={{offset: 3, span: 3}} xs={{offset: 2, span: 5}}>
                <Form.Control as="select" onChange={changeLanguage}>
                  {settingsData.language.items.map((language: any, languageIndex: any) => (
                    <option key={'language-' + languageIndex}>{language.title}</option>
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
