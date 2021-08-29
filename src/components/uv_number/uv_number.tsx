import { memo } from 'react';
import { useSpring, animated } from 'react-spring';

import './uv_number.css';
import { UVNumberProps } from './uv_number.types';

const UVNumber = (props: UVNumberProps) => {

  // Note: number variable is from useSpring. Don't try to rename it.
  const { number } = useSpring({
    reset: true,
    from: { number: 0 },
    number: props.title,
    delay: 750
  });

  return (
    <div className = {'uv-number-container ' + ((props.config && props.config.class) ? props.config.class : '')}>
      <div className={'bounce-top uv-primary-text uv-text-center align-middle ' +
                              ((props.config && props.config.title && props.config.title.class ) ?
                                  props.config.title.class : '')}>
        <animated.div>{number.to(n => n.toFixed(2))}</animated.div>
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
