import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl';


import UVHeader from './components/uv_header/uv_header';

import './App.css';

import * as appData from './shared/uv_app-data.json';
import * as headerData from './components/uv_header/uv_header.json';
import * as defaultAppContent from './lang/messages/en-US.json';

import { useSelector } from 'react-redux';
import { UVRootState } from './root.reducer';
import AppRouter from './AppRouter';

import { renderToString } from 'react-dom/server';


const App = () => {

  const [appContent, setAppContent] = useState(defaultAppContent);

  const languageCode = useSelector((state: UVRootState) => {
    return state.settings.languageCode;
  });

  // useEffect for language change
  useEffect(() => {
    import('./lang/messages/' + languageCode + '.json')
      .then((response) => {
        setAppContent(response);
      });
  }, [languageCode]);

  const centralTitle = useSelector((state: UVRootState) => {
    return state.dashboard.totalValue;
  });

  return (
    <div id="uv-app" className={'App uv-font-' + (appData.config.font ? appData.config.font : 'medium')}>

      {appContent &&
        <>
          <IntlProvider messages={appContent}
                        locale={languageCode}
                        defaultLocale={appData.config.languageCode}>

          <Container>
            <Row className="uv-row">
              <UVHeader title={renderToString(<IntlProvider messages={appContent}
                                                            locale={languageCode}
                                                            defaultLocale={appData.config.languageCode}>
                                                  <FormattedMessage id="header_title"
                                                                    defaultMessage="Investment Portfolio"/>
                                              </IntlProvider>)}
                        centralTitle={centralTitle}
                        theme={headerData.config.theme}
                        alt={headerData.config.alt}
                        primaryWebsite={headerData.config.primaryWebsite}
                        repository={headerData.config.repository}
                        menu={headerData.config.menu} />
            </Row>
            <AppRouter></AppRouter>
          </Container>
          </IntlProvider>
        </>
      }
    </div>
  );
}

export default App;
