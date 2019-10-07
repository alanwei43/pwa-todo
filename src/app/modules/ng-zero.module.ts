import { NgModule } from '@angular/core';
import { NZ_ICONS } from 'ng-zorro-antd';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline
} from '@ant-design/icons-angular/icons';

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];

@NgModule({
  exports: [NgZorroAntdModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons },
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class NgZeroModule {
}
