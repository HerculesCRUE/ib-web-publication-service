import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { AreasService } from 'src/app/_services/areas.service';

/**
 *
 *
 * @export
 * @class TreeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html'
})
export class TreeComponent implements OnInit {
  /**
   *
   *
   * @type {EventEmitter<any>}
   * @memberof TreeComponent
   */
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
  /**
   *
   *
   * @type {NgxEchartsDirective}
   * @memberof TreeComponent
   */
  @ViewChild('echarts') echarts: NgxEchartsDirective;
  /**
   * type of tree data
   * @type {string}
   * @memberof TreeComponent
   */
  @Input() treeType = 'area';
  /**
   *
   *
   * @type {*}
   * @memberof TreeComponent
   */
  @Input() data: any;
  /**
   *
   *
   * @type {*}
   * @memberof TreeComponent
   */
  filterDate: any;
  /**
   *
   *
   * @type {*}
   * @memberof TreeComponent
   */
  options: any;
  /**
   * filter data
   * @type {Array}
   * @memberof TreeComponent
   */
  filter = [];
  /**
   * data to filter for emit
   * @type {array}
   * @memberof TreeComponent
   */
  dataTofilter = [];
  /**
   *
   * style for when selected
   * @memberof TreeComponent
   */
  hoverStyle = { lineStyle: { color: 'black' } };
  /**
   *
   * style for when is not selected
   * @memberof TreeComponent
   */
  hoverStyleGrey = { lineStyle: { color: 'grey' } };
  /**
   *
   *  selected option
   * @memberof TreeComponent
   */
  selected = { selected: true };
  /**
   *
   *  level of tree
   * @memberof TreeComponent
   */
  level = 0;
  loaded;
  constructor(private areasService: AreasService) {
  }

  ngOnInit(): void {
    this.areasService.getAll().subscribe(data => {
      this.data = this.returnCorrectData(data);
      this.loaded = true;
      this.filterDate = this.data;
      this.options = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
        },
        series: [
          {
            type: 'tree',
            data: [this.data],
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            symbolSize: 7,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9,
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left',
              },
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
          },
        ],
      };
    });
    // this.data = HelperGraphics.returnDataForTree(this.treeType);


  }

  returnCorrectData(data) {
    const result = {
      name: 'Áreas',
      children: []
    };
    if (data && data.lenght > 0) {
      data.forEach(element => {
        result.children.push({
          name: element.title,
          value: element.id,
          selected: false,
          children: []
        });
      });
    }

    return result;

  }
  /**
   * Method invoked when the chart is initialized
   * param e
   */
  onChartInit(chartInstance: any) {
  }

  /**
   * returns if node has been selected
   * param tree (the full tree)
   * param nodeName (node name to search)
   */
  isNodeSelected(tree, nodeName) {
    let status = false;
    tree.children.forEach(element => {
      element.children.forEach(subNode => {
        if (nodeName === subNode.name) {
          status = this.findStyle(subNode) && subNode.lineStyle?.color === 'black';
          if (subNode.hasOwnProperty('children')) {
            this.cleanNode(subNode, nodeName);
          }
        } else {
          if (subNode.hasOwnProperty('children')) {
            this.searchInsedeNodes(subNode, nodeName);
          }
        }
      });
    });
    return status;
  }

  searchInsedeNodes(subnode, nodeName) {
    let status = false;
    subnode.children.forEach(subNode => {
      if (nodeName === subNode.name) {
        status = this.findStyle(subNode) && subNode.lineStyle?.color === 'black';
      } else {
        if (subNode.hasOwnProperty('children')) {
          this.searchInsedeNodes(subNode, nodeName);
        }
      }
    });
    return status;
  }

  cleanNode(subnode, nodeName) {
    subnode.children.forEach(subNode => {
      !subNode.hasOwnProperty('lineStyle') ? Object.assign(subNode, { lineStyle: { color: 'grey' } }) : subNode.lineStyle.color = 'grey';
    });
  }

  isFirstLine(tree, nodeName): boolean {
    let status = false;
    tree.children.forEach(element => {
      if (element.name === nodeName) { status = true; }
    });
    return status;
  }

  /**
   * finds if node has the property lineStyle
   * param node 
   */
  findStyle(node): boolean {
    return node.hasOwnProperty('lineStyle');
  }


}
