import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() tableType: string;
  @Input() data: any;
  tableData: any;
  columnsToDisplay: string[];

  constructor() {
    this.columnsToDisplay = ['id', 'state', 'severity', 'creation_date', 'summary'];
  }

  ngOnInit(): void {
    this.tableData = new MatTableDataSource(this.data);
    this.tableData.sort = this.sort;
    this.tableData.paginator = this.paginator;
  }

  applyFilter(event) {
    const filterValue = event.target.value;
    this.tableData.filter = filterValue.trim();
  }
}
