import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {
    it('should fetch user data from GitHub API', () => {
      const testData = { login: 'testUser' };
      const githubUsername = 'testUser';

      service.getUser(githubUsername).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}`);
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
    });

    it('should handle errors', () => {
      const githubUsername = 'nonExistentUser';

      service.getUser(githubUsername).subscribe(
        () => fail('getUser request should have failed'),
        error => {
          expect(error).toBeTruthy();
        }
      );

      const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}`);
      expect(req.request.method).toEqual('GET');
      req.error(new ErrorEvent('network error'));
    });
  });

  describe('getRepos', () => {
    it('should fetch user repos from GitHub API', () => {
      const testData = [{ name: 'repo1' }, { name: 'repo2' }];
      const githubUsername = 'testUser';
      const page = 1;
      const perPage = 10;

      service.getRepos(githubUsername, page, perPage).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`);
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
    });

    it('should handle errors', () => {
      const githubUsername = 'nonExistentUser';
      const page = 1;
      const perPage = 10;

      service.getRepos(githubUsername, page, perPage).subscribe(
        () => fail('getRepos request should have failed'),
        error => {
          expect(error).toBeTruthy();
        }
      );

      const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`);
      expect(req.request.method).toEqual('GET');
      req.error(new ErrorEvent('network error'));
    });
  });
});
