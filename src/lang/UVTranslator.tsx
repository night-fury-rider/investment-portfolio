import { IntlProvider, FormattedMessage } from 'react-intl';

const UVTranslator = (props: any)=> {

  const {appContent, ...messageProps} = props;

  return (
    <IntlProvider {...appContent}>

      {props.id &&
        <FormattedMessage {...messageProps}/>
      }
    </IntlProvider>
  );
};

export default UVTranslator;
