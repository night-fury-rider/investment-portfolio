import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl';

import UVHeader from './components/uv_header/uv_header';

import './App.css';

import * as appData from './shared/uv_app-data.json';
import * as headerData from './components/uv_header/uv_header.json';
import * as defaultContent from './lang/messages/en-US.json';

import { useSelector } from 'react-redux';
import { UVRootState } from './root.reducer';
import AppRouter from './AppRouter';

import { renderToString } from 'react-dom/server';

import UVTranslator from './lang/UVTranslator';
import UVFormatter from './lang/UVFormatter';

const App = () => {

  const language = useSelector((state: UVRootState) => {
    return state.settings.language;
  });


  const locale = useSelector((state: UVRootState) => {
    return state.settings.locale;
  });

  const [appContent, setAppContent] = useState({
    defaultLocale: appData.config.localeCode,
    locale: locale.code,
    messages: defaultContent
  });

  // useEffect for language change
  useEffect(() => {
    import('./lang/messages/' + language.code + '.json')
      .then((response) => {
        setAppContent({
          defaultLocale: appData.config.localeCode,
          locale: locale.code,
          messages: response
        });
      });
  }, [language.code]);

    // useEffect for locale change
  useEffect(() => {
    setAppContent({
      defaultLocale: appData.config.localeCode,
      locale: locale.code,
      messages: appContent.messages
    });
   }, [locale.code]);


  const centralTitle = useSelector((state: UVRootState) => {
    return state.dashboard.totalValue;
  });

  return (
    <div id="uv-app" className={'App uv-font-' + (appData.config.font ? appData.config.font : 'medium')}>

      {appContent &&
        <>
          <IntlProvider {...appContent}>

          <Container>
            <Row className="uv-row">

              <UVHeader title={renderToString(<UVTranslator appContent={appContent}
                                                            id="header_title"
                                                            defaultMessage="Investment Portfolio"/>)}
                        centralTitle={renderToString(<UVFormatter appContent={appContent}
                                                                  value={centralTitle}/>)}
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
