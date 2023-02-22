import { createFeatureSelector } from "@ngrx/store";
import { Appstate } from "./appstate";

export const selectorAppState = createFeatureSelector<Appstate>('appstate')