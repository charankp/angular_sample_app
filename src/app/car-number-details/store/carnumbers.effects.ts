import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { setApiStatus } from "src/app/shared/store/app.action";
import { Appstate } from "src/app/shared/store/appstate";
import { CarDetailService } from "../car-detail.service";
import { carNumberApiSuccess, deleteCarRegApiSuccess, invokecarNumberApi, invokedeleteCarRegApi, invokeSaveCarRegApi, invokeUpadteCarRegApi, saveCarRegApiSuccess, UpadteCarRegApiSuccess } from "./carnumbers.action";
import { selectcarNumbers } from "./carnumbers.selector";

@Injectable()

export class carNumberEffects {
    constructor(
        private actions$: Actions,
        private cardetailService: CarDetailService,
        private appStore: Store<Appstate>,
        private store: Store
    ) { }

    loadAllCarNumbers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokecarNumberApi),
            withLatestFrom(this.store.pipe(select(selectcarNumbers))),
            switchMap(([, carNumbersFromStore]) => {
                if (carNumbersFromStore.length > 0) {
                    return EMPTY;
                }
                return this.cardetailService.get()
                    .pipe(
                        map((data) => carNumberApiSuccess({ allcarnumbers: data })
                        )
                    )
            })
        )
    );


    saveNewCarDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeSaveCarRegApi),
            switchMap((action) => {
                this.appStore.dispatch(
                    setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.cardetailService.create(action.payload).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setApiStatus({
                                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                            })
                        );
                        return saveCarRegApiSuccess({ response: data });
                    })
                );
            })
        );
    });


    updateCarDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeUpadteCarRegApi),
            switchMap((action) => {
                this.appStore.dispatch(
                    setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.cardetailService.update(action.payload).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setApiStatus({
                                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                            })
                        );
                        return UpadteCarRegApiSuccess({ response: data });
                    })
                );
            })
        );
    });

    deleteCarDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokedeleteCarRegApi),
            switchMap((action) => {
                this.appStore.dispatch(
                    setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.cardetailService.delete(action.id).pipe(
                    map(() => {
                        this.appStore.dispatch(
                            setApiStatus({
                                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                            })
                        );
                        return deleteCarRegApiSuccess({ id: action.id });
                    })
                );
            })
        );
    });
}