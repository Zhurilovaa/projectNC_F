import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { HttpClient } from '@angular/common/http';

import { AppRoutingModule} from './app-routing/app-routing.module';
import { StatiсsPageModule } from './module/statiсs-page/statiсs-page.module';
import { DynamicPageServModule } from './module/dynamic-page-serv/dynamic-page-serv.module';
import { LoginPanelModule } from './module/login-panel/login-panel.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainMenuComponent } from './menu-fond/main-menu/main-menu.component';
import { FooterComponent } from './menu-fond/footer/footer.component';

import { ConfigService } from './server/service/config.service';

import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { appReducers } from './store/state/app.state';
import { handleLog } from './store/reducers/logger';
import { ConfigEffects } from './store/effects/config.effects';

import { ConfigOutGuard } from './app-routing/config.guard';
import { DonateInGuard } from './app-routing/donate.guard';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MainMenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StatiсsPageModule,
    DynamicPageServModule,
    LoginPanelModule,
    RouterModule,
    StoreModule.forRoot(appReducers, {
      metaReducers: [handleLog]
    }),
    EffectsModule.forRoot([ConfigEffects]),
    AppRoutingModule,
  ],
  providers: [
    ConfigOutGuard,
    DonateInGuard,
    {
      provide: ConfigService,
      deps: [HttpClient, Store]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
