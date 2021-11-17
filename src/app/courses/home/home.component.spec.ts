import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonClickEvents, click} from '../common/test-utils';
import { Course } from '../model/course';
import { fake } from 'cypress/types/sinon';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  let beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  let advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');

  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])
    TestBed.configureTestingModule({
      imports: [CoursesModule,
        NoopAnimationsModule],
        providers: [{provide: CoursesService, useValue: coursesServiceSpy}]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      coursesService = TestBed.inject(CoursesService)
    });
  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => { 
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);
  });


  it("should display only advanced courses", () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);
  });


  it("should display both tabs", () => {  
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2);
  });


  it("should display advanced courses when tab clicked", () => {    
    component.filterByCategory = spyOn(component, 'filterByCategory').and.returnValue(of({} as Course[]));
    component.reloadCourses();
    expect(component.filterByCategory).toHaveBeenCalledTimes(2)    
  });

});


