import { createAction, props } from "@ngrx/store";
import { CarNumber } from "./car-number";

export const invokecarNumberApi = createAction(
    "[Car Number Api] invoke car Registration number Fetch Api"
);

export const carNumberApiSuccess = createAction(
    "[Car Number Api] car Registration number Fetch Api Success",
    props<{ allcarnumbers: CarNumber[] }>()
);

export const invokeSaveCarRegApi = createAction(
    "[Car Number Api] invoke save car Registration number Api",
    props<{ payload: CarNumber }>()
);

export const saveCarRegApiSuccess = createAction(
    "[Car Number Api]  save car Registration number Api Success",
    props<{ response: CarNumber }>()
);

export const invokeUpadteCarRegApi = createAction(
    "[Car Number Api]  invoke update car Registration number Api",
    props<{ payload: CarNumber }>()
);

export const UpadteCarRegApiSuccess = createAction(
    "[Car Number Api]  update car Registration number Api Success",
    props<{ response: CarNumber }>()
);

export const invokedeleteCarRegApi = createAction(
    "[Car Number Api]  invoke delete car Registration number Api",
    props<{ id: number }>()
);


export const deleteCarRegApiSuccess = createAction(
    "[Car Number Api]  delete car Registration number Api Success",
    props<{ id: number }>()
);