import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CarNumber } from "./car-number";

export const selectcarNumbers = createFeatureSelector<CarNumber[]>("car-number-details");

export const selectCarNumbersById = (carId: number)=>{
    return createSelector(
        selectcarNumbers,
        (carNumbers:CarNumber[]) =>{
            var carById = carNumbers.filter(_ => _.id==carId);
            if(carById.length == 0){
                return null;
            }
            return carById[0];
        }
    )
}