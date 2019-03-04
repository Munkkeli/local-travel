import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import {
  IonicApp,
  IonicErrorHandler,
  IonicModule,
  LoadingController,
} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MediaProvider } from '../providers/media/media';
import { MenuPage } from '../pages/menu/menu';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { PipesModule } from '../pipes/pipes.module';
import { UsernameValidator } from '../validators/username-validator';
import { UploadPage } from '../pages/upload/upload';
import { PlayerPage } from '../pages/player/player';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { MyFilesPage } from '../pages/my-files/my-files';
import { ModifyPage } from '../pages/modify/modify';
import { ProfilePage } from '../pages/profile/profile';
import { FiltersPipe } from '../pipes/filters/filters';
import { DescriptionPipe } from '../pipes/description/description';
import { ExifProvider } from '../providers/exif/exif';
import { SafePipe } from '../pipes/safe/safe';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    LoginRegisterPage,
    UploadPage,
    PlayerPage,
    MyFilesPage,
    ModifyPage,
    ProfilePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    PipesModule,
    PinchZoomModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    LoginRegisterPage,
    UploadPage,
    PlayerPage,
    MyFilesPage,
    ModifyPage,
    ProfilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
    UsernameValidator,
    LoadingController,
    FiltersPipe,
    DescriptionPipe,
    ExifProvider,
    SafePipe,
    Camera,
    FileTransfer,
  ],
})
export class AppModule {
}
