import { createFeature, createReducer, on } from "@ngrx/store";
import { HojavidaActions } from "./hojavida.actions";
import { PersonaDto } from "../../models";

export const HOJAVIDA_FEATURE_KEY = "hojavida";

export interface HojavidaState {
  persona: PersonaDto | null;
  loadingPersona: boolean;
  errorPersona: string;
}

const initialState: HojavidaState = {
  persona: null,
  loadingPersona: false,
  errorPersona: null,
};

const reducer = createReducer(
  initialState,
  on(HojavidaActions.loadPersona, (state) => ({
    ...state,
    loadingPersona: true,
    errorPersona: null,
  })),
  on(HojavidaActions.loadPersonaSuccess, (state, { persona }) => ({
    ...state,
    persona,
    loadingPersona: false,
  })),
  on(HojavidaActions.loadPersonaFailure, (state, { error }) => ({
    ...state,
    loadingPersona: false,
    errorPersona: error,
  })),
  on(HojavidaActions.clearPersona, () => initialState),
  on(HojavidaActions.updatePersonaInState, (state, { persona }) => ({
    ...state,
    persona,
  }))
);

export const hojavidaFeature = createFeature({
  name: HOJAVIDA_FEATURE_KEY,
  reducer,
});

export const {
  name: hojavidaFeatureKey,
  reducer: hojavidaReducer,
  selectHojavidaState,
  selectPersona,
  selectLoadingPersona,
  selectErrorPersona,
} = hojavidaFeature;
