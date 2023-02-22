import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectorAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { CarNumber } from '../store/car-number';
import { invokeUpadteCarRegApi } from '../store/carnumbers.action';
import { selectCarNumbersById } from '../store/carnumbers.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private appStore: Store<Appstate>
  ) { }
  carRegForm: CarNumber = {
    id: 0,
    ownerName: '',
    number: ''
  }

  ngOnInit() {
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectCarNumbersById(id)));
      })
    )
    fetchFormData$.subscribe((data) => {
      if (data) {
        this.carRegForm = { ...data }
      } else {
        this.router.navigate(['/'])
      }
    })
  }


  update() {
    this.store.dispatch(
      invokeUpadteCarRegApi({ payload: { ...this.carRegForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectorAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}


