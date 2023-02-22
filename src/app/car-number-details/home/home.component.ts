import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectorAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokecarNumberApi, invokedeleteCarRegApi } from '../store/carnumbers.action';
import { selectcarNumbers } from '../store/carnumbers.selector';
declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private store: Store,   
    private appStore: Store<Appstate>
    ) { }

  //creating a observable variable and implement a selector for listening the changes in the store

  carNumbers$ = this.store.pipe(select(selectcarNumbers))
  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit() {   
    this.store.dispatch(invokecarNumberApi());
  }
  
  confirmDelete(id: number){
    this.idToDelete = id;
    this.store.dispatch(invokedeleteCarRegApi({id: this.idToDelete}));
    let apiStatus$ = this.appStore.pipe(select(selectorAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {     
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        
      }
    });
  }
}
