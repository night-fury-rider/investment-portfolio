import React, { useLayoutEffect, useRef } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import * as appData from './../uv-app-data.json';

import './uv-bar-chart.css';
import { useSelector } from 'react-redux';
import uvString from '@uv-tech/util/lib/uv-string';
import UvAppState from './../uv-app-state';

am4core.useTheme(am4themes_animated);

function UvBarChart() {

  let parentIndex = useSelector((state: UvAppState) => {
    return state.barChart.parentIndex
  });

  parentIndex = uvString.isNumber(parentIndex) ? parentIndex : 0;

  const chart = useRef(null);

  useLayoutEffect(() => {

    function getProcessedData(entries: any) {
      for (const entry of entries) {
        entry.value = entry.price * entry.quantity;
      }
      return entries;
    }

    const uvChart: am4charts.XYChart = am4core.create('barChartDiv', am4charts.XYChart);
    uvChart.padding(40, 40, 40, 40);

    const categoryAxis = uvChart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    const valueAxis = uvChart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    const series = uvChart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = 'name';
    series.dataFields.valueX = 'value';
    series.tooltipText = '{valueX.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = 'left';
    labelBullet.label.dx = 10;
    labelBullet.label.text = '{values.valueX.workingValue.formatNumber("#.0as")}';
    labelBullet.locationX = 1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', (fill, target: any) => {
      return uvChart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;

    series.columns.template.maxHeight =  50;

    uvChart.data = getProcessedData(appData.categories[parentIndex].items);

    chart.current = uvChart as any;

    return () => {
      uvChart.dispose();
    };
  }, [parentIndex]);

  return (
    <div className="bar-chart-container">
      <div id="barChartDiv"></div>
    </div>
  );
}

export default UvBarChart;
