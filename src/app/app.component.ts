import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: string = '';
  loading: boolean = false;
  userDetails: any;
  userRepos: any[] = [];
  notFound: boolean = false;
  pagedRepos: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private http: HttpClient) { }

  search() {
    this.loading = true;
    this.notFound = false;
    this.userDetails = null;
    this.userRepos = [];
    this.http.get(`https://api.github.com/users/${this.username}`).subscribe(
      (data: any) => {
        this.loading = false;
        this.userDetails = data;
      },
      (error) => {
        this.loading = false;
        this.notFound = true;
      }
    );

    this.http.get(`https://api.github.com/users/${this.username}/repos`).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.userRepos = data;
          this.updatePagedRepos();
        } else {
          console.error("Error: Invalid data format for user repositories.");
        }
      },
      (error) => {
        console.error("Error: Failed to fetch user repositories.");
      }
    );
  }

  updatePagedRepos() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedRepos = this.userRepos.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    this.currentPage++;
    this.updatePagedRepos();
  }

  prevPage() {
    this.currentPage--;
    this.updatePagedRepos();
  }
}
