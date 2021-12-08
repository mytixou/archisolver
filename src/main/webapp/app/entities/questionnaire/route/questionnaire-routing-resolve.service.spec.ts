jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IQuestionnaire, Questionnaire } from '../questionnaire.model';
import { QuestionnaireService } from '../service/questionnaire.service';

import { QuestionnaireRoutingResolveService } from './questionnaire-routing-resolve.service';

describe('Questionnaire routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: QuestionnaireRoutingResolveService;
  let service: QuestionnaireService;
  let resultQuestionnaire: IQuestionnaire | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(QuestionnaireRoutingResolveService);
    service = TestBed.inject(QuestionnaireService);
    resultQuestionnaire = undefined;
  });

  describe('resolve', () => {
    it('should return IQuestionnaire returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultQuestionnaire = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultQuestionnaire).toEqual({ id: 123 });
    });

    it('should return new IQuestionnaire if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultQuestionnaire = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultQuestionnaire).toEqual(new Questionnaire());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Questionnaire })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultQuestionnaire = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultQuestionnaire).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
