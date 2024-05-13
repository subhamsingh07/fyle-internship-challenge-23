import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: jasmine.SpyObj<ApiService>;


  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser', 'getRepos']);

    // Set the getUser and getRepos methods to return Observables
    apiServiceSpy.getUser.and.returnValue(of({}));
    apiServiceSpy.getRepos.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create the app', () => {
    expect(component).toBeTruthy();
  });

  xit('should initialize with default values', () => {
    expect(component.title).toEqual('fyle-frontend-challenge');
    expect(component.user).toBeUndefined();
    expect(component.repositories).toEqual([]);
    expect(component.errorMessage).toEqual('');
    expect(component.isDarkTheme).toEqual(false);
    expect(component.currentPage).toEqual(1);
    expect(component.totalPages).toEqual(0);
    expect(component.pages).toEqual([]);
    expect(component.visiblePages).toEqual([]);
    expect(component.searchUsername).toEqual('johnpapa');
    expect(apiService.getUser).toHaveBeenCalledWith('johnpapa');
  });

  describe('getUserData', () => {
    xit('should fetch user data and repositories when user exists', () => {
      const userData = { login: 'testUser', public_repos: 10 };
      const reposData = [{ name: 'repo1' }, { name: 'repo2' }];

      apiService.getUser.and.returnValue(of(userData));
      apiService.getRepos.and.returnValue(of(reposData));

      component.getUserData('testUser');

      expect(apiService.getUser).toHaveBeenCalledWith('testUser');
      expect(apiService.getRepos).toHaveBeenCalledWith('testUser', 1, component.perPage);
      expect(component.user).toEqual(userData);
      expect(component.repositories).toEqual(reposData);
      expect(component.totalPages).toEqual(1);
      expect(component.pages).toEqual([1]);
      expect(component.visiblePages).toEqual([1]);
      expect(component.errorMessage).toEqual('');
    });

    xit('should handle error when user does not exist', () => {
      const error = { status: 404, message: 'User not found' };

      apiService.getUser.and.returnValue(throwError(error));
      apiService.getRepos.and.returnValue(of([]));

      component.getUserData('nonExistentUser');

      expect(component.errorMessage).toEqual('User not found');
      expect(component.user).toBeNull();
      expect(component.repositories).toEqual([]);
      expect(component.totalPages).toEqual(0);
      expect(component.pages).toEqual([]);
      expect(component.visiblePages).toEqual([]);
    });
  });
});
