import React from 'react';
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import UVHeader from './components/uv_header/uv_header';
import UVDashboard from './modules/uv_dashboard/uv_dashboard';

import './App.css';
import * as appData from './shared/uv_app-data.json';
import * as headerData from './components/uv_header/uv_header.json';

function App() {

  return (
    <div id="uv-app" className={'App uv-font-' + (appData.config.font ? appData.config.font: 'medium')}>
      <Container>
        <Row className="uv-row">
         <UVHeader data={headerData.config}></UVHeader>
        </Row>
      <UVDashboard ></UVDashboard>
      </Container>
    </div>
  );
}

export default App;
