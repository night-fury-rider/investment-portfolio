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
      <Col md={{ offset: 3 }}>
        <Form>
          <fieldset >
            <Form.Group as={Row}>
              <Form.Label as="legend" column md={{ span: 2 }} xs={{ span: 3 }}>
                {settingsData.language.label}
		          </Form.Label>
              <Col md={2} xs={5}>
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
