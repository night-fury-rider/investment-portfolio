import React from 'react';

import './uv_number.css';
import { UvNumberProps } from '../../shared/Types';

function UvNumber(props: UvNumberProps) {

  return (
    <div className = {'uv-number-container ' + ((props.config && props.config.class) ? props.config.class : '')}>
      <div className={'bounce-top uv-primary-text uv-text-center align-middle ' +
                              ((props.config && props.config.title && props.config.title.class ) ?
                                  props.config.title.class : '')}>
        {props.data.title}
      </div>
      <div className={'bounce-top uv-secondary-text uv-text-center ' +
              ((props.config && props.config.subtitle && props.config.subtitle.class) ? props.config.subtitle.class : '')}>
          {props.data.subtitle}
      </div>

      <div className="uv-component-label">{props.data.label}</div>
    </div>
  )
}

export default UvNumber;
