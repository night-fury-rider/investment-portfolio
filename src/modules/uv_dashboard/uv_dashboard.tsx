import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { UVRootState } from '../../root.reducer';

import UVPie from '../../components/uv_pie/uv_pie';
import UVBarChart from '../../components/uv_bar-chart/uv_bar-chart';
import UVAngularGauge from '../../components/uv_angular-gauge/uv_angular-gauge';
import UVNumber from '../../components/uv_number/uv_number';
import UVTable from '../../components/uv_table/uv_table.component';

function UVDashboard() {

  let uvNumberData = useSelector((state: UVRootState) => {
    return state.dashboard.numbers;
  });

  let uvPieData = useSelector((state: UVRootState) => {
    return state.dashboard.pieCharts;
  });

  let UVBarChartData = useSelector((state: UVRootState) => {
    return state.dashboard.barCharts;
  });

  let uvAngularGauageData = useSelector((state: UVRootState) => {
    return state.dashboard.angularGauages;
  });

  let uvTableData = useSelector((state: UVRootState) => {
    return state.dashboard.tables;
  });

  return (
    <div className="uv-dashboard" id="uv-dashboard">
      <Container>
        <Row className="uv-container uv-row">
          <Col md={6} xs={12}>
            <UVPie componentId={0}
                   config={uvPieData[0].config}
                   categories={uvPieData[0].data.categories}></UVPie>
          </Col>
          <Col md={6} xs={12}>
              <UVBarChart componentId={0}
                          config={UVBarChartData[0].config}
                          items={UVBarChartData[0].data}></UVBarChart>
          </Col>
        </Row>
        <Row className="uv-row">
          { uvAngularGauageData[0].data.score > 0 &&
            <Col md={4} xs={12}>
              <UVAngularGauge componentId={0}
                              config={uvAngularGauageData[0].config}
                              score={uvAngularGauageData[0].data.score}
                              data={uvAngularGauageData[0].data.items}></UVAngularGauge>
            </Col>
          }
          {
            uvNumberData && uvNumberData.map((obj: any, index: any) => (
              typeof(obj.title) !=='undefined' &&
                <Col md={4} xs={12} key={index}>
                  <Row>
                    <Col md={{ span: 12, offset: 1 }} xs={12}>
                      <UVNumber config={obj.config}
                                title={obj.title}
                                subtitle={obj.subtitle}
                                label={obj.label}/>
                    </Col>
                  </Row>
                </Col>
            ))
          }
        </Row>

        <Row className="uv-row">
          {
            uvTableData[0] && uvTableData[0].rows &&
              <Col md={4} xs={12}>
                <UVTable headers={uvTableData[0].headers}
                        rows={uvTableData[0].rows}></UVTable>
              </Col>
          }
        </Row>

      </Container>
    </div>
  );
}

export default UVDashboard;
