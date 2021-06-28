import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import './uv_settings.css';
import * as settingsData from './uv_settings.json';
import { updateSettings } from './uv_settings.actions';

const Settings = () => {

  const dispatch = useDispatch();

  const settingsObj = {
    languageCode: 'en'
  }

  const changeLanguage = (event: any)=> {
    settingsObj.languageCode = settingsData.language.items[event.target.selectedIndex].languageCode;
    dispatch(updateSettings(settingsObj));
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
                <Form.Control as="select" onChange={(event)=>{changeLanguage(event)}}>
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
