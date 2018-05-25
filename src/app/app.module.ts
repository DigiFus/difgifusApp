import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
//plugin storange
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import {
  CreditosPage,
  HomePage,
  LoginPage,
  PerfilPage,
  TabsPage,
  IntroduccionPage,
  RegistroPage
} from '../pages/index.paginas';
import { AutenticarProvider } from '../providers/autenticar/autenticar';
import { AjustesProvider } from '../providers/ajustes/ajustes';
import { TestProvider } from '../providers/test/test';
import { ControlStorangeProvider } from '../providers/control-storange/control-storange';
import { SolicitudesProvider } from '../providers/solicitudes/solicitudes';
import { PerfilProvider } from '../providers/perfil/perfil';

@NgModule({
  declarations: [
    MyApp,
    CreditosPage,
    HomePage,
    LoginPage,
    PerfilPage,
    TabsPage,
    IntroduccionPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Regresar'
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreditosPage,
    HomePage,
    LoginPage,
    PerfilPage,
    TabsPage,
    IntroduccionPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutenticarProvider,
    AjustesProvider,
    TestProvider,
    ControlStorangeProvider,
    SolicitudesProvider,
    PerfilProvider
  ]
})
export class AppModule {}
