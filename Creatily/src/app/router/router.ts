import { RouterModule, Routes} from '@angular/router';

import { BootpageComponent } from '../component/bootpage/bootpage.component';
import { RegloginComponent } from '../component/reglogin/reglogin.component';
import { LoginComponent } from '../component/login/login.component';
import { DetailComponent } from '../component/detail/detail.component';
import { CartComponent } from '../component/cart/cart.component';
import { OrderComponent } from '../component/order/order.component';
import { PaymentComponent } from '../component/payment/payment.component';
import { AddressComponent } from '../component/address/address.component';
import { HomeComponent } from '../component/home/home.component';
import { NewAddressComponent } from '../component/new-address/new-address.component';

import { CommunityComponent} from '../component/community/community.component';



import { RegisterComponent} from '../component/register/register.component';
import { CommentComponent} from '../component/comment/comment.component';
import { RegisterpwdComponent } from '../component/registerpwd/registerpwd.component';
import { UserComponent } from '../component/user/user.component';


const appRoutes:Routes = [
    { path:"", redirectTo:"/bootpage",pathMatch:'full'},
    { path: "bootpage", component: BootpageComponent },
    { path: "home", component: HomeComponent},
    { path: "reglogin", component: RegloginComponent },
    { path: "login", component: LoginComponent },
    { path: "phonecode", component: RegisterComponent },
    { path: "register", component: RegisterpwdComponent},
    { path: "detail/:id", component: DetailComponent},
    { path: "cart", component: CartComponent},
    { path: "order", component: OrderComponent},
    { path: "payment", component: PaymentComponent},
    { path: "address", component: AddressComponent},
    { path: "newAddress", component: NewAddressComponent},


    { path: "community", component: CommunityComponent},

    { path: "comment/:id", component: CommentComponent},
    { path: "user", component: UserComponent }

]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    {enableTracing: false}
)