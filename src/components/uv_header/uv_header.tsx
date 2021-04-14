import React, { memo } from 'react';

import './uv_header.css';
import { UVHeaderProps } from './UVHeaderTypes';
import { Container, Row } from 'react-bootstrap';

function UVHeader(props: UVHeaderProps) {

  return (
    <Container>
      <Row className="uv-row">
        <div className="uv-header-container">
          <div id="headerDiv">
            <div className={'toolbar ' + (props.theme ? props.theme : 'primary')} role="banner">
              <a href={props.primaryWebsite} target="_blank" rel="noopener noreferrer">
                <img width={props.logoWidth ? props.logoWidth : '40px'}
                  alt={props.logoAlt ? props.logoAlt : 'Yuvraj Patil'}
                  src={props.logoFile ? props.logoFile : 'logo192.png'} />
              </a>
              <span>{props.title}</span>
              <div className="uv-central-title col-8">{props.centralTitle}</div>
              <div className="spacer"></div>
              {
                props.repositoryUrl &&
                <a href={props.repositoryUrl} target="_blank" rel="noopener noreferrer">
                  <img className="logo" alt={props.alt}
                    height={props.repositoryHeight ? props.repositoryHeight : '40px'}
                    src={props.repositoryLogo ? props.repositoryLogo : 'logo192.png'} />
                </a>
              }

            </div>
          </div>
        </div>
      </Row>
    </Container> 
  );
}

export default memo(UVHeader);
