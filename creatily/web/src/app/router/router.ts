import {RouterModule, Routes} from '@angular/router'

import {CartComponent} from '../components/cart/cart.component'
import {CommunityComponent} from '../components/community/community.component'
import {DetailsComponent} from '../components/details/details.component'
import {HomeComponent} from '../components/home/home.component'
import {UserComponent} from '../components/user/user.component'

const appRoutes:Routes = [
    {path:'cart',component:CartComponent},
    {path:'community',component:CommunityComponent},
    {path:'details',component:DetailsComponent},
    {path:'home',component:HomeComponent},
    {path:'user',component:UserComponent}
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    {enableTracing: false}
)