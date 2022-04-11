import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {
  @Input()
  public displayedColumns!: { fieldName: string; title: string }[];
  @Input()
  public dataSource!: any;
  public responsiveMode: boolean = false;

  getColumnsName = () =>
    this.displayedColumns?.map(({ fieldName }) => fieldName);

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        this.responsiveMode = !state.matches;
      });
  }
}
