import { createReducer, on } from "@ngrx/store";
import { CarNumber } from "./car-number";
import { carNumberApiSuccess, deleteCarRegApiSuccess, saveCarRegApiSuccess, UpadteCarRegApiSuccess } from "./carnumbers.action";

export const initialState: ReadonlyArray<CarNumber> = [];

//create a reducer to push the initial state to store
export const carNumberReducer = createReducer(
    initialState,
    on(carNumberApiSuccess, (state, { allcarnumbers }) => {
        return allcarnumbers;
    }),
    on(saveCarRegApiSuccess, (state, { response }) => {
        let newState = [...state]
        newState.unshift(response);
        return newState;
    }),
    on(UpadteCarRegApiSuccess, (state, { response }) => {
        let newState = state.filter(_ => _.id !== response.id);
        newState.unshift(response);
        return newState;
    }),
    on(deleteCarRegApiSuccess, (state, { id }) => {
        let newState = state.filter((_) => _.id != id);       
        return newState;
    }),
);