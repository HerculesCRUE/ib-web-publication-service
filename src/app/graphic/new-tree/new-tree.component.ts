import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AreasService } from 'src/app/_services/areas.service';

/**
 *
 *
 * @export
 * @class NewTreeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-new-tree',
  templateUrl: './new-tree.component.html',
  styleUrls: ['./new-tree.component.css']
})
export class NewTreeComponent implements OnInit, OnChanges {

  /**
   *
   *
   * @type {EventEmitter<any>}
   * @memberof NewTreeComponent
   */
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() clearTree;
  /**
   *
   *
   * @type {string}
   * @memberof NewTreeComponent
   */
  @Input() treeType: string;
  loaded: boolean;
  /**
   *
   *
   * @type {*}
   * @memberof NewTreeComponent
   */
  data: any;
  /**
   *
   *
   * @memberof NewTreeComponent
   */
  filter = [];
  resetData = false;
  resetDataArray: any;
  /**
   * Creates an instance of NewTreeComponent.
   * @memberof NewTreeComponent
   */

  @Input() itemClass: string = 'col-6';

  constructor(private areasService: AreasService) { }

  ngOnInit(): void {
    this.areasService.getAll().subscribe(data => {
      this.data = this.returnCorrectData(data);
      this.resetDataArray = this.returnCorrectData(data);
      setTimeout(() => {
        this.loaded = true;
      }, 300);

    });
    this.filterChanged.emit(this.filter);
  }


  returnCorrectData(data) {
    const result = {
      name: 'Áreas',
      children: [

      ]
    };
    if (data && data.length > 0) {
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

  ngOnChanges(simpleChanges: SimpleChanges) {
    console.log(this.clearTree);
    if (this.clearTree >= 1) {
      this.resetData = true;
    }

    this.filter = [];
    this.searchFilter.emit(this.filter);
    this.data = this.resetDataArray;
    setTimeout(() => {
      this.resetData = false;
    }, 1);

  }
  /**
   *
   *
   * @param {*} area
   * @param {*} parentToRemove
   * @memberof NewTreeComponent
   */
  areaClicked(area, parentToRemove) {
    // si selecciono un hijo el padre se tiene que ir
    if (parentToRemove && !parentToRemove.selected) {
      const indexToRemove = this.filter.indexOf(parentToRemove.value);
      if (indexToRemove !== -1) {
        this.filter.splice(indexToRemove, 1);
      }
    }
    if (area.selected) {
      this.filter.push(area.value);
      if (parentToRemove && parentToRemove.selected) {
        const indexToRemove1 = this.filter.indexOf(parentToRemove.value);
        if (indexToRemove1 !== -1) {
          this.filter.splice(indexToRemove1, 1);
        }
      }
    } else {
      if (parentToRemove && parentToRemove.selected) {
        this.filter.push(parentToRemove.value);
        this.removeInsedeObject(area, null);
      } else {
        this.removeInsedeObject(area, null);
      }
    }
    this.filter = this.filter.filter((v, i, a) => a.indexOf(v) === i);
    this.filterChanged.emit(this.filter);
  }

  search() {
    this.searchFilter.emit(this.filter);
  }

  /**
   *
   *
   * @param {*} area
   * @param {*} parentToRemove
   * @memberof NewTreeComponent
   */
  removeInsedeObject(area, parentToRemove) {
    const indexToRemove1 = this.filter.indexOf(area.value);
    if (indexToRemove1 !== -1) {
      this.filter.splice(indexToRemove1, 1);
      area.selected = false;
      if (parentToRemove && parentToRemove.selected) {
        this.filter.push(parentToRemove.value);
      } else if (parentToRemove && !parentToRemove.selected) {
        parentToRemove.selected = false;
      }
    }
    area.children.forEach(element => {
      const indexToRemove = this.filter.indexOf(element.value);
      if (indexToRemove !== -1) {
        this.filter.splice(indexToRemove, 1);
        element.selected = false;
      }
      if (element.children) {
        this.removeInsedeObject(element, element);
      }
    });
  }

}
