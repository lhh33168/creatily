import {RouterModule, Routes} from '@angular/router'

import {HomeComponent} from '../components/home/home.component'
import {UserComponent} from '../components/user/user.component'
import {GoodsComponent} from '../components/goods/goods.component'
import {OrdersComponent} from '../components/orders/orders.component'
import {AdminComponent} from '../components/admin/admin.component'

const appRoutes:Routes = [
    {   
    path:'home',
    component:HomeComponent,
    children: [
        {path:'goods',component:GoodsComponent},
        {path:'orders',component:OrdersComponent},
        {path:'admin',component:AdminComponent},
    ]},
    {path:'**',component:UserComponent}
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    {enableTracing: false}
)