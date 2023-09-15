import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  data: any[] = [];
  filteredData: any[] = [];
  searchItems: string = '';
  currentPageNumber: number = 1;
  itemsPerPage: number = 10;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http
      .get<any>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res) => {
        this.data = res;
        this.filterData();
      });
  }

  filterData(): void {
    this.filteredData = this.data.filter((item) => {
      return item.title.toLowerCase().includes(this.searchItems.toLowerCase());
    });
    this.currentPageNumber = 1;
  }

  onPageChange(page: number): void {
    this.currentPageNumber = page;
  }

  getPaginatedData() {
    const startIndex = (this.currentPageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }
}
