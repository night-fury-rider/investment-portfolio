import { IntlProvider, FormattedNumber } from 'react-intl';
import { renderToString } from 'react-dom/server';

const UVFormatter = (props: any)=> {

  const {appContent, ...numberProps} = props;

  return (
    <IntlProvider {...appContent}>

      {props.value &&
        <FormattedNumber {...numberProps}/>
      }
    </IntlProvider>
  );
};

export default UVFormatter;
