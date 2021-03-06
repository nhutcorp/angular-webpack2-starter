import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {
  MdButtonModule, MdCardModule, MdIconModule, MdInputModule,
  MdToolbarModule, MdListModule, MdSidenavModule
} from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

import { rootReducer } from './reducers';
import { StoreDevToolsModule } from './features/store-devtools.module';
import { UserEffects } from './user/user.effects';

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const APP_IMPORTS = [
  EffectsModule.run(UserEffects),
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdToolbarModule,
  MdListModule,
  MdSidenavModule,
  ReactiveFormsModule,
  RouterStoreModule.connectRouter(),
  StoreModule.provideStore(rootReducer),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevToolsModule,
  TransferHttpModule
];
