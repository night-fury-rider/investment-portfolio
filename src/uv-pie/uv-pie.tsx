import React, { useLayoutEffect, useRef } from 'react';

import uvDevice from '@uv-tech/util/lib/uv-device';


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import * as appData from './../uv-app-data.json';
import { uvStore } from './../uv-store';
import { selectSlice } from './uv-pie-actions';

import './uv-pie.css';

am4core.useTheme(am4themes_animated);

function UvPie() {
  const chart = useRef(null);

  useLayoutEffect(() => {

    let activeSliceIndex: number;

    function getSectorTotal(category:any) {
      let total = 0;
      for (const item of category.items) {
        total += item.price * item.quantity;
      }
      return total;
    }

    function getProcessedData(sectors:any) {
      const processedSectors = [];
      for (const sector of sectors) {
        sector.value = getSectorTotal(sector);
        if (sector.value > 0) {
          processedSectors.push(sector);
        }
      }
      return processedSectors;
    }

    const uvChart = am4core.create('pieDiv', am4charts.PieChart3D);

    uvChart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    uvChart.data = getProcessedData(appData.categories);

      const series = uvChart.series.push(new am4charts.PieSeries3D());

      series.dataFields.value = 'value';
      series.dataFields.category = 'name';
      series.slices.template.propertyFields.fill = 'color';
      series.slices.template.propertyFields.isActive = 'isActive';
      series.slices.template.propertyFields.id = 'id';

      series.slices.template.events.on('hit', ((ev) => {

        if(activeSliceIndex !== parseInt(ev.target.id)) {
          activeSliceIndex = parseInt(ev.target.id);
          uvStore.dispatch(selectSlice(activeSliceIndex));
          series.slices.each(((item) => {
            if (item.isActive && item !== ev.target) {
              item.isActive = false;
            }
          }));
        }
      }));

      if (uvDevice.isMobileDevice()) {
        uvChart.legend = new am4charts.Legend();
        series.labels.template.disabled = true;
      }

      series.labels.template.wrap = true;
      series.labels.template.width = 150;

      chart.current = uvChart as any;
    return () => {
      uvChart.dispose();
    };
  }, []);

  return (
    <div className="pie-container">
      <div id="pieDiv"></div>
    </div>
  );
}

export default UvPie;
