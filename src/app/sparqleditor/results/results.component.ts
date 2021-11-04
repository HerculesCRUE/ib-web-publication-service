import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { BindingValue, SparqlResults } from 'src/app/_models/sparql';

/**
 * ResultsComponent
 *
 * @export
 * @class ResultsComponent
 * @implements {AfterViewInit}
 * @implements {OnChanges}
 * @implements {OnInit}
 * @implements {AfterViewChecked}
 *  
 * Example of SPARQL to show graphics
 * 
 * 
 * PREFIX  xsd:  <http://www.w3.org/2001/XMLSchema#>
 * 
 * SELECT ?published (COUNT(?x) as ?cuenta)
 * WHERE {
 *     ?x <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>  <http://hercules.org/um/es-ES/rec/Article> .  
 *     ?x <http://hercules.org/um/es-ES/rec/publishedIn> ?published .
 * 
 * }  GROUP BY ?published
 * LIMIT 10
 * 
 *  
 */
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  inputs: ['data', 'errorMessage'],
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges, AfterViewChecked {

  activeTab = 'table';

  data: SparqlResults = null;
  errorMessage = null;

  echartData: any[];
  echartLabels: string[];

  chart = {
    bar: new EChartOptions('bar'),
    line: new EChartOptions('line'),
    buble: new EChartOptions('scatter'),
    sector: new EChartOptions('pie'),
    map: new EChartOptions('map')
  };

  constructor(private cd: ChangeDetectorRef) {

  }
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }


  // Set values when load the view
  ngOnChanges(changes: SimpleChanges) {

    this.enableGraphics();
    this.activeTab = 'table';
  }

  /**
   *
   *
   * @param {string} tab
   * @memberof ResultsComponent
   */
  changeTab(tab: string, disabled: boolean) {
    if (!disabled) {
      this.activeTab = tab;
    }

  }


  /*
   ************************************
   ********* PRIVATE FUNCTONS *********
   ************************************
  */
  private enableGraphics() {
    this.setAllActiveCharts(false);

    if (!!this.data && this.data.head.vars.length >= 2 && !!this.data.results.bindings && this.data.results.bindings.length > 0) {
      Object.keys(this.chart).forEach(k => {
        this.generateCustomChart(this.chart[k]);
      });
    }
  }

  private isText(binding: BindingValue): boolean {
    return binding.type === 'literal' && !this.isNumeric(binding);
  }

  private isNumeric(binding: BindingValue): boolean {
    if (binding.type === 'literal' && binding.hasOwnProperty('datatype')) {
      if (binding.datatype.includes('integer') || binding.datatype.includes('decimal') ||
        binding.datatype.includes('float') || binding.datatype.includes('double')) {
        return true;
      }
    }
    return false;
  }

  private setAllActiveCharts(active: boolean): void {
    this.echartLabels = null;
    this.echartData = null;
    Object.keys(this.chart).forEach(k => {
      this.chart[k].active = active;
    });
  }

  private generateCustomChart(chart: EChartOptions): any {
    chart.options = chart.type === 'pie' ? this.getCustomPieChart(chart) : this.getCustomAxisChart(chart);
    chart.active = !!chart.options;
  }

  private getCustomPieChart(chart: EChartOptions): any {

    const type = chart.type;
    if (type !== 'pie') {
      return null;
    }

    const chartData = this.generateChartData({ numericAndTextRequired: true, forceFirstLabelNumeric: true });
    if (!chartData) {
      return null;
    }

    const data = [];

    chartData.values.forEach((v: Array<{ label: string, value: any }>) => {
      const dataItem = { value: [], name: null, dimensionNames: chartData.labels };
      if (!chartData.label1.numeric) {
        const label1Item = v[0];
        dataItem.name = label1Item.value;
      } else if (!chartData.label2.numeric) {
        const label2Item = v[1];
        dataItem.name = label2Item.value;
      }
      v.forEach((labelValue: { label: string, value: any }) => {
        dataItem.value.push(labelValue.value);
      });
      data.push(dataItem);
    });

    return {
      tooltip: {
        trigger: 'item',
        formatter: (p: any) => {
          return this.formatTooltip(p.data, p.marker);
        }
      },
      series: [{
        type: 'pie',
        label: {
          formatter: (p: any) => {
            return this.unformatItemValue(p.name);
          }
        },
        data: data
      }]
    };
  }

  private getCustomAxisChart(chart: EChartOptions): any {

    const type = chart.type;
    if (!(type === 'bar' || type === 'line' || type === 'scatter')) {
      return null;
    }

    const chartData = this.generateChartData({ sortItems: true });
    if (!chartData) {
      return null;
    }

    const labels = chartData.labels;

    let xNumeric = chartData.label1.numeric;
    let yNumeric = chartData.label2.numeric;

    if (type === 'bar' && !xNumeric && !yNumeric) {
      return null;
    }

    let xAxisType = 'category';
    let xAxisData = [];
    let yAxisType = 'category';
    let yAxisData = [];

    let series = [];

    chartData.values.forEach((v: Array<{ label: string, value: any }>) => {

      let seriesName = null;
      let xAxisValue = null;
      let yAxisValue = null;
      const data = [];

      v.forEach((labelValue: { label: string, value: any }, i: number) => {
        const dataValue = labelValue.value;
        if (i == 0) {
          seriesName = dataValue;
          xAxisValue = dataValue;
        } else if (i == 1) {
          yAxisValue = dataValue;
        }
        data.push(dataValue);
      });

      if (xNumeric || yNumeric) {

        let serie = series[0];
        if (!series.length) {
          serie = {
            dimensions: labels,
            data: [],
            type: type
          };
          series.push(serie);
        }
        serie.data.push(data);

      } else {
        series.push({
          name: seriesName,
          dimensions: labels,
          data: [data],
          type: type
        });
      }

      yAxisData.push(yAxisValue);
      xAxisData.push(xAxisValue);

    });

    xAxisData.sort();
    yAxisData.sort();

    if (xNumeric || yNumeric) {
      if (xNumeric) {
        xAxisData = undefined;
        xAxisType = 'value';
      } else {
        yAxisData = undefined;
        yAxisType = 'value';
      }
    }

    return {
      tooltip: {
        trigger: 'item',
        formatter: (d: any) => {
          return this.formatTooltip(d, d.marker);
        },
        axisPointer: {
          type: 'cross',
          label: {
            formatter: (p: any) => {
              if (typeof p.value === 'number') {
                return Math.round(p.value * 100) / 100; // 2 decimal places
              } else {
                return this.unformatItemValue(p.value);
              }
            }
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: xAxisType,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          formatter: (value: any) => {
            return this.unformatItemValue(value);
          }
        },
        data: xAxisData
      },
      yAxis: {
        type: yAxisType,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          formatter: (value: any) => {
            return this.unformatItemValue(value);
          }
        },
        data: yAxisData
      },
      series: series
    };
  }

  private generateChartData(config: ChartDataConfig): ChartData {
    const firstResult = this.data.results.bindings[0];

    let labels = this.data.head.vars.filter(v => {
      const header = firstResult[v];
      return this.isNumeric(header) || this.isText(header);
    });

    if (labels.length < 2) {
      return null;
    }

    let label1 = labels[0];
    let label2 = labels[1];

    let label1Numeric = this.isNumeric(firstResult[label1]);
    let label2Numeric = this.isNumeric(firstResult[label2]);

    if (config.numericAndTextRequired && ((!label1Numeric && !label2Numeric) || (label1Numeric && label2Numeric))) {
      return null;
    }

    if (config.forceFirstLabelNumeric && !label1Numeric) {
      labels[0] = label2;
      labels[1] = label1;
      label1 = labels[0];
      label2 = labels[1];
      label1Numeric = true;
      label2Numeric = false;
    }

    const values = [];

    const label1ValueMap = {};
    const label2ValueMap = {};

    const items = this.data.results.bindings.filter(i => true); // copy array

    if (config.sortItems) {
      items.sort(function (a, b) {
        let xLabelA: string | number = a[label1].value;
        let xLabelB: string | number = b[label1].value;
        if (label1Numeric) {
          xLabelA = +xLabelA;
          xLabelB = +xLabelB;

          let yLabelA: string | number = a[label2].value;
          let yLabelB: string | number = b[label2].value;
          if (label2Numeric) {
            yLabelA = +yLabelA;
            yLabelB = +yLabelB;
          }
          if (xLabelA == xLabelB) {
            return (yLabelA < yLabelB) ? -1 : (yLabelA > yLabelB) ? 1 : 0;
          }
        }
        return (xLabelA < xLabelB) ? -1 : 1;
      });
    }

    items.forEach(item => {

      const itemValues = [];

      labels.forEach((label, i) => {
        let dataValue: any = item[label].value;
        if (i == 0) {
          dataValue = this.formatItemValue(dataValue, label1Numeric, label1ValueMap);
        } else if (i == 1) {
          dataValue = this.formatItemValue(dataValue, label2Numeric, label2ValueMap);
        }
        itemValues.push({ label: label, value: dataValue });
      });

      values.push(itemValues);
    });

    return {
      labels: labels,
      label1: { name: label1, numeric: label1Numeric },
      label2: { name: label2, numeric: label2Numeric },
      values: values
    }
  }

  /**
   * Respects repeated values
   */
  private formatItemValue(dataValue: any, numeric: boolean, valuesMap: {}) {
    let value = dataValue;
    if (numeric) {
      value = value !== null && value !== undefined ? +value : value;
    } else {
      let count = valuesMap[value];
      if (!count) {
        count = 0;
      }
      valuesMap[value] = count + 1;
      if (count > 0) {
        let padding = "000000000" + count;
        padding = padding.substr(padding.length - 10);
        value = value + '#$@' + padding;
      }
    }
    return value;
  }
  private unformatItemValue(value: any) {
    return typeof value === 'string' ? value.split('#$@')[0] : value;
  }
  private formatTooltip(d: any, marker: string): string {
    let output = '';
    for (let i = 0; i < d.dimensionNames.length; i++) {
      const value = this.unformatItemValue(d.value[i]);
      output += marker + d.dimensionNames[i] + ': ' + value;
      if (i != d.dimensionNames.length - 1) { // Append a <br/> tag if not last in loop
        output += '<br/>'
      }
    }
    return output;
  }

}

export class EChartOptions {
  type: 'bar' | 'line' | 'scatter' | 'pie' | 'map';
  active: boolean;
  options: any;
  constructor(type: 'bar' | 'line' | 'scatter' | 'pie' | 'map') {
    this.type = type;
  }
}

export class ChartData {
  labels: Array<string>;
  label1: { name: string, numeric: boolean };
  label2: { name: string, numeric: boolean };
  values: Array<Array<{ label: string, value: any }>>;
}

export class ChartDataConfig {
  numericAndTextRequired?: boolean;
  forceFirstLabelNumeric?: boolean;
  sortItems?: boolean;
}