import React, { useEffect, useRef } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import './uv_angular-gauge.css';
import { UVAngularGaugeConfig, UVAngularGaugeData } from './uv_angular-gauge.types';

am4core.useTheme(am4themes_animated);

function UVAngularGauge(props: any) {

  const chart = useRef(null);

  let score: number;
  let config: UVAngularGaugeConfig;
  let data: UVAngularGaugeData[];

  config = props.config;
  score = props.score;
  data = props.data;

  //  Grading Lookup
  function lookUpGrade(lookupScore: any, grades: any) {
    // Only change code below this line
    for (var i = 0; i < grades.length; i++) {
      if (grades[i].lowScore < lookupScore && grades[i].highScore >= lookupScore) {
        return grades[i];
      }
    }
    return null;
  }

  useEffect(() => {

    // Hide the gauge when score, config or data is not available.
    if(!score || !config || !data) {
      return;
    }

    config.score = (score && score >= config.chartMin && score <= config.chartMax) ? score : config.score;

    // create uvChart
    let uvChart = am4core.create("gaugeDiv", am4charts.GaugeChart);
    uvChart.hiddenState.properties.opacity = 0;
    uvChart.fontSize = config.fontSize ? config.fontSize: 11;
    uvChart.innerRadius = am4core.percent(config.innerRadius ? config.innerRadius : 80);
    uvChart.resizable = config.resizable ? config.resizable : true;

    let axis = uvChart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = config.chartMin;
    axis.max = config.chartMax;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent((config.mainAxis && config.mainAxis.radius) ? config.mainAxis.radius : 80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = (config.mainAxis && config.mainAxis.lineStrokeOpacity) ? config.mainAxis.lineStrokeOpacity : 0.1;
    axis.renderer.grid.template.disabled = (config.mainAxis && config.mainAxis.gridDisabled) ? config.mainAxis.gridDisabled : true;
    axis.renderer.labels.template.radius = am4core.percent((config.mainAxis && config.mainAxis.labelRadius) ? config.mainAxis.labelRadius : 15);
    axis.renderer.labels.template.fontSize = (config.mainAxis && config.mainAxis.labelFontSize) ? config.mainAxis.labelFontSize :  '0.9em';

    // Hide scale numbering
    axis.renderer.labels.template.disabled = (config.mainAxis && config.mainAxis.labelsDisabled) ? config.mainAxis.labelsDisabled : true;

    // Axis for ranges (Hand)
    let axis2 = uvChart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis2.min = config.chartMin;
    axis2.max = config.chartMax;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = (config.handAxis && config.handAxis.labelsDisabled) ? config.handAxis.labelsDisabled : true;
    axis2.renderer.grid.template.disabled = (config.handAxis && config.handAxis.gridDisabled) ? config.handAxis.gridDisabled : false;
    axis2.renderer.grid.template.opacity = (config.handAxis && config.handAxis.girdOpacity) ? config.handAxis.girdOpacity : 0.5;
    axis2.renderer.labels.template.bent = (config.handAxis && config.handAxis.labelBent) ? config.handAxis.labelBent : true;
    axis2.renderer.labels.template.fill = am4core.color((config.handAxis && config.handAxis.labelColor) ? config.handAxis.labelColor : '#000');
    axis2.renderer.labels.template.fontWeight = (config.handAxis && config.handAxis.labelFontWeight) ? config.handAxis.labelFontWeight : 'bold';
    axis2.renderer.labels.template.fillOpacity = (config.handAxis && config.handAxis.labelFillOpacity) ? config.handAxis.labelFillOpacity : 0.3;

    //  Ranges
    for (let grading of data) {
      let range = axis2.axisRanges.create();
      range.axisFill.fill = am4core.color(grading.color);
      range.axisFill.fillOpacity = (config.range && config.range.AxisFillOpacity) ? config.range.AxisFillOpacity : 0.8;
      range.axisFill.zIndex = (config.range && config.range.AxisFillzIndex) ? config.range.AxisFillzIndex : -1;
      range.value = grading.lowScore > config.chartMin ? grading.lowScore : config.chartMin;
      range.endValue = grading.highScore < config.chartMax ? grading.highScore : config.chartMax;
      range.grid.strokeOpacity = (config.range && config.range.gridStrokeOpacity) ? config.range.gridStrokeOpacity : 0;
      range.label.inside = (config.range && config.range.labelInside) ? config.range.labelInside : true;
      range.label.text = (config.upperCaseGrades === true) ? grading.title.toUpperCase() : grading.title;
      range.label.location = (config.range && config.range.labelLocation) ? config.range.labelLocation : 0.5;

      range.label.paddingBottom = (config.range && config.range.labelPaddingBottom) ? config.range.labelPaddingBottom : -5; // ~half font size
      range.label.fontSize = (config.range && config.range.labelFontSize) ? config.range.labelFontSize : '0.9em';
    }

    let matchingGrade = lookUpGrade(config.score, data);

    // Label 1
    let label = uvChart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = "6em";
    label.x = am4core.percent(50);
    label.paddingBottom = 15;
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    //label.dataItem = data;
    label.text = config.score.toFixed(1);
    label.text = '';  //  To avoid flicker effect, assigned empty string as initial value.
    label.fill = am4core.color(matchingGrade.color);

    //  Label 2
    let label2 = uvChart.radarContainer.createChild(am4core.Label);
    label2.isMeasured = false;
    label2.fontSize = "2em";
    label2.horizontalCenter = "middle";
    label2.verticalCenter = "bottom";
    label2.text = config.title;
    label2.fill = am4core.color(matchingGrade.color);

    //  Hand
    let hand = uvChart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent((config.hand && config.hand.innerRadius) ? config.hand.innerRadius : 55);
    hand.startWidth = (config.hand && config.hand.startWidth) ? config.hand.startWidth : 8;
    hand.pin.disabled = (config.hand && config.hand.pinDisabled) ? config.hand.pinDisabled : true;
    hand.value = config.score;
    hand.fill = am4core.color((config.hand && config.hand.fill) ? config.hand.fill : '#444');
    hand.stroke = am4core.color((config.hand && config.hand.stroke) ? config.hand.stroke : '#000');
    hand.showValue(config.score - 0.5);

    hand.events.on("positionchanged", function(){
      label.text = config.showScore ? (axis2.positionToValue(hand.currentPosition) + 0.5).toFixed(0) : '';
      let matchingGrade = lookUpGrade(axis.positionToValue(hand.currentPosition), data);
      label2.text = config.title;
      label2.fill = am4core.color(matchingGrade.color);
      label2.stroke = am4core.color(matchingGrade.color);
      label.fill = am4core.color(matchingGrade.color);
    })

    chart.current = uvChart as any;

    return () => {
      uvChart.dispose();
    };

}, [score, config, data]);

  return (
    <div className="uv-angular-gauge-container">
      <div id="gaugeDiv"></div>
    </div>
  )
}
export default UVAngularGauge;