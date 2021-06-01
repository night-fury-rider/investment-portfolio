import React, { memo } from 'react';

import { UVTableProps } from './uv_table.types';
import { Table } from 'react-bootstrap';

const UVTable = (props: UVTableProps) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {
            props.headers && props.headers.map((header: any, headerIndex: any) => (
              <th key={headerIndex}>{header}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          props.rows && props.rows.map((row: any, rowIndex: any) => (
            <tr key={rowIndex}>
              {
                row && row.map((obj: any, index: any) => (
                  <td key={index}>{obj}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default memo(UVTable);
