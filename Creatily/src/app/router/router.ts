import { RouterModule, Routes} from '@angular/router';

import { BootpageComponent } from '../component/bootpage/bootpage.component';
import { FooterComponent } from '../component/footer/footer.component';
import { RegloginComponent } from '../component/reglogin/reglogin.component';
import { LoginComponent } from '../component/login/login.component';

const appRoutes:Routes = [
    { path:"", redirectTo:"/bootpage",pathMatch:'full'},
    { path: "bootpage", component: BootpageComponent },
    { path: "reglogin", component: RegloginComponent },
    { path: "login", component: LoginComponent }
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    {enableTracing: false}
)