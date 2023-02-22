import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectorAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { CarNumber } from '../store/car-number';
import { invokecarNumberApi, invokeSaveCarRegApi } from '../store/carnumbers.action';
import { selectcarNumbers, selectCarNumbersById } from '../store/carnumbers.selector';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,    
    private route: ActivatedRoute,
 
   
  ) { }

  carRegForm: CarNumber = {
    id: 0,
    ownerName: '',
    number: ''
  }

  loginuser(data:any){
    console.log(data);
  }
  
  save() {
    this.store.dispatch(invokeSaveCarRegApi({ payload: { ...this.carRegForm } }))
    let appStatus$ = this.appStore.pipe(select(selectorAppState))
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(setApiStatus({apiStatus: {apiStatus:'',apiResponseMessage:''}}))
        this.router.navigate(['/']);
      }
    });
  }

}
