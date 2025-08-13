import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PersonaDto } from '../../models';

export const HojavidaActions = createActionGroup({
  source: 'Hojavida',
  events: {
    'Load Persona': props<{ id: number }>(),
    'Load Persona Success': props<{ persona: PersonaDto }>(),
    'Load Persona Failure': props<{ error: string }>(),
    'Clear Persona': emptyProps(),
    'Update Persona In State': props<{ persona: PersonaDto }>(),
  }
});
