import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AddFeeDetailComponent } from './add-fee-detail.component';
import { AddFeeDetailService } from 'src/app/services/add-fee-detail/add-fee-detail.service';
import { PaybubbleHttpClient } from 'src/app/services/httpclient/paybubble.http.client';
import { FeeModel } from 'src/app/models/FeeModel';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routerMock = {
  navigateByUrl: jasmine.createSpy('navigateByUrl')
};

describe('AddFeeDetailComponent', () => {
  let component: AddFeeDetailComponent;
  let fixture: ComponentFixture<AddFeeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeeDetailComponent ],
      providers: [
        PaybubbleHttpClient,
        AddFeeDetailService,
        { provide: Router, useValue: routerMock }
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        RouterModule,
        RouterTestingModule.withRoutes([])],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should toggle help with fees', () => {
    component.helpWithFeesIsVisible = false;
    component.toggleHelpWithFees();
    expect(component.helpWithFeesIsVisible).toBeTruthy();
  });

  it('Should select a fee', () => {
    const fee: FeeModel = new FeeModel;
    component.selectFee(fee);
    fixture.detectChanges();
    const service = fixture.debugElement.injector.get(AddFeeDetailService);
    expect(service.selectedFee).toEqual(fee);
  });

  it('Saving add fee detail should navigate to review fee detail page', () => {
    const fee: FeeModel = new FeeModel;
    fee.calculated_amount = 20.00;
    component.selectFee(fee);
    fixture.detectChanges();
    component.saveAndContinue();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/reviewFeeDetail');
  });
});
