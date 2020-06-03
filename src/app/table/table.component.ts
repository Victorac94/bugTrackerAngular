import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableType: string;
  @Input() data: any;
  columnsToDisplay: any;

  constructor() {
    this.columnsToDisplay = ['id', 'state', 'severity', 'creation_date', 'summary'];
  }

  ngOnInit(): void {
  }

}
