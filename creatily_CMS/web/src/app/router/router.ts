import {RouterModule, Routes} from '@angular/router'

import {HomeComponent} from '../components/home/home.component'
import {UserComponent} from '../components/user/user.component'

const appRoutes:Routes = [
    {path:'home',component:HomeComponent},
    {path:'user',component:UserComponent}
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    {enableTracing: false}
)