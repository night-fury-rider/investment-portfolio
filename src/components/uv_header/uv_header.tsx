import React, { memo } from 'react';

import './uv_header.css';
import { UVHeaderProps } from './UVHeaderTypes';
import { Container, Row, Col } from 'react-bootstrap';

import uvNumber from '@uv-tech/util/lib/uv-number';

function UVHeader(props: UVHeaderProps) {

  return (
    <Container>
      <Row className="uv-row">
        <div className="uv-header-container">
          <div id="headerDiv">
            <div className={'toolbar ' + (props.theme ? props.theme : 'primary')} role="banner">
              <Col xs={2} md={1}>
                <a href={props.primaryWebsite} target="_blank" rel="noopener noreferrer">
                  <img width={props.logoWidth ? props.logoWidth : '40px'}
                    alt={props.logoAlt ? props.logoAlt : 'Yuvraj Patil'}
                    src={props.logoFile ? props.logoFile : 'logo192.png'} />
                </a>
              </Col>
              <Col xs={7} md={3}>
                <span>{props.title}</span>
              </Col>
              <Col xs={2} md={6}>
                { props.centralTitle &&
                  <div className="uv-central-title">
                    {uvNumber.changeFormat(props.centralTitle)}
                  </div>
                }

              </Col>
              <Col md={{span:1, offset:1}} className="d-none d-md-block d-lg-block">
                <div className="spacer"></div>
                {
                  props.repositoryUrl &&
                  <a href={props.repositoryUrl} target="_blank" rel="noopener noreferrer">
                    <img className="logo" alt={props.alt}
                      height={props.repositoryHeight ? props.repositoryHeight : '40px'}
                      src={props.repositoryLogo ? props.repositoryLogo : 'logo192.png'} />
                  </a>
                }
              </Col>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default memo(UVHeader);
