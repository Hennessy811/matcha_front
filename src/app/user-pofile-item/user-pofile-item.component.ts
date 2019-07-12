import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-pofile-item',
  templateUrl: './user-pofile-item.component.html',
  styleUrls: ['./user-pofile-item.component.sass']
})
export class UserPofileItemComponent implements OnInit {

  editField: boolean = true;
  hover: boolean = true;

  @Input() fieldValue: string;
  @Input() fieldName: string;
  @Output() changeValue = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  saveValue() {
    this.editField = !this.editField;
    if (this.editField) {
      let data = {};
      data[this.fieldName] = this.fieldValue;
      this.changeValue.emit(data);
    }
  }

}
