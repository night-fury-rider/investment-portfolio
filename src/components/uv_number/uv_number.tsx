import React, { memo } from 'react';

import './uv_number.css';
import { UVNumberProps } from './uv_number.types';

function UVNumber(props: UVNumberProps) {
  return (
    <div className = {'uv-number-container ' + ((props.config && props.config.class) ? props.config.class : '')}>
      <div className={'bounce-top uv-primary-text uv-text-center align-middle ' +
                              ((props.config && props.config.title && props.config.title.class ) ?
                                  props.config.title.class : '')}>
        {props.title}
      </div>
      <div className={'bounce-top uv-secondary-text uv-text-center ' +
              ((props.config && props.config.subtitle && props.config.subtitle.class) ? props.config.subtitle.class : '')}>
          {props.subtitle}
      </div>

      <div className="uv-component-label">{props.label}</div>
    </div>
  )
}

export default memo(UVNumber);
