import React from 'react';
import { Container, Row } from 'react-bootstrap';

import UVHeader from './components/uv_header/uv_header';
import UVDashboard from './modules/uv_dashboard/uv_dashboard';

import './App.css';
import * as appData from './shared/uv_app-data.json';
import * as headerData from './components/uv_header/uv_header.json';
import { useSelector } from 'react-redux';
import { UVRootState } from './root.reducer';

function App() {

  let centralTitle = useSelector((state: UVRootState) => {
    return state.dashboard.totalValue;
  });

  return (
    <div id="uv-app" className={'App uv-font-' + (appData.config.font ? appData.config.font: 'medium')}>
      <Container>
        <Row className="uv-row">
          <UVHeader title={headerData.config.title}
                    centralTitle={centralTitle}
                    theme={headerData.config.theme}
                    alt={headerData.config.alt}
                    primaryWebsite={headerData.config.primaryWebsite}
                    repositoryUrl={headerData.config.repositoryUrl}
                    repositoryLogo={headerData.config.repositoryLogo}/>
        </Row>
      <UVDashboard ></UVDashboard>
      </Container>
    </div>
  );
}

export default App;
