import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { AvatarPipe } from './avatar/avatar';
import { DescriptionPipe } from './description/description';
import { FiltersPipe } from './filters/filters';
import { SafePipe } from './safe/safe';

@NgModule({
  declarations: [
    ThumbnailPipe,
    AvatarPipe,
    DescriptionPipe,
    FiltersPipe,
    SafePipe],
  imports: [],
  exports: [
    ThumbnailPipe,
    AvatarPipe,
    DescriptionPipe,
    FiltersPipe,
    SafePipe],
})
export class PipesModule {
}
