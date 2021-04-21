import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
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
export class NewTreeComponent implements OnInit {
  /**
   *
   *
   * @type {EventEmitter<any>}
   * @memberof NewTreeComponent
   */
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
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
  /**
   * Creates an instance of NewTreeComponent.
   * @memberof NewTreeComponent
   */
  constructor(private areasService: AreasService) { }

  ngOnInit(): void {
    this.areasService.getAll().subscribe(data => {
      this.data = this.returnCorrectData(data);
      setTimeout(() => {
        this.loaded = true;
      }, 300);

    });
    // this.data = HelperGraphics.returnDataForTree(this.treeType);
  }


  returnCorrectData(data) {
    const result = {
      name: 'Áreas',
      children: [

      ]
    };

    data.forEach(element => {
      result.children.push({
        name: element.title,
        value: element.id,
        selected: false,
        children: []
      });
    });

    return result;

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
