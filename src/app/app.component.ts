import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge';
  user: any;
  repositories: any[] = [];
  errorMessage: string = '';
  isDarkTheme: boolean = false;
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  searchUsername: string = '';
  perPage: number = 10;
  visiblePages: number[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUserData('johnpapa');
  }

  getUserData(username: string) {
    this.apiService.getUser(username).subscribe(
      (userData: any) => {
        this.user = userData;
        this.getRepositories(username, this.currentPage);
      },
      (error: any) => {
        this.errorMessage = 'User not found';
        this.user = null; // Clear user data on error
        this.repositories = []; // Clear repositories on error
        this.totalPages = 0; // Reset total pages on error
        this.pages = []; // Clear pages on error
        this.visiblePages = []; // Clear visible pages on error
      }
    );
  }

  getRepositories(username: string, page: number) {
    this.apiService.getRepos(username, page, this.perPage).subscribe(
      (repos: any[]) => {
        this.repositories = repos;
        this.totalPages = Math.ceil(this.user.public_repos / this.perPage);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.calculateVisiblePages();
      },
      (error: any) => {
        this.errorMessage = 'Failed to fetch repositories';
        this.repositories = []; // Clear repositories on error
        this.totalPages = 0; // Reset total pages on error
        this.pages = []; // Clear pages on error
        this.visiblePages = []; // Clear visible pages on error
      }
    );
  }
  

  searchUser(username: string) {
    if (username.trim() !== '') {
      this.currentPage = 1; // Reset current page when searching for a new user
      this.getUserData(username);
      this.searchUsername='';
    }
  }

  redirectToRepo(url: string) {
    window.open(url, '_blank');
  }

  redirectToTopic(topic: string) {
    const topicUrl = `https://github.com/topics/${topic}`;
    window.open(topicUrl, '_blank'); // Open the GitHub topic URL in a new tab
  }  

  firstPage() {
    this.currentPage = 1;
    this.getRepositories(this.user.login, this.currentPage);
  }

  lastPage() {
    this.currentPage = this.totalPages;
    this.getRepositories(this.user.login, this.currentPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRepositories(this.user.login, this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRepositories(this.user.login, this.currentPage);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getRepositories(this.user.login, this.currentPage);
    }
  }

  changePerPage() {
    this.currentPage = 1;
    this.getRepositories(this.user.login, this.currentPage);
  }

  calculateVisiblePages() {
    const maxVisiblePages = 5;
    const startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    this.visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
