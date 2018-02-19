import { NgModule } from '@angular/core';
import {RemoveQuotePipe} from './remove-quote.pipe';
import {NothingFreePipe} from './nothing-free.pipe';

@NgModule({
  imports: [],
  declarations: [RemoveQuotePipe, NothingFreePipe],
  exports: [RemoveQuotePipe, NothingFreePipe]
})
export class CustomPipesModule {

  static forRoot() {
    return { ngModule: CustomPipesModule, providers: [] };
  }

}
