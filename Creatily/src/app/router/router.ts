import { RouterModule, Routes} from '@angular/router';

//组件
import { AppComponent } from '../app.component';
import { FooterComponent } from '../component/footer/footer.component';
import { DetailComponent } from '../component/detail/detail.component';
import { CartComponent } from '../component/cart/cart.component';
import { OrderComponent } from '../component/order/order.component';
import { PaymentComponent } from '../component/payment/payment.component';
import { AddressComponent } from '../component/address/address.component';
import { NewAddressComponent} from '../component/new-address/new-address.component'
    
const appRoutes:Routes = [
    { path: "footer", component: FooterComponent},
    { path: "detail/:id", component: DetailComponent},
    { path: "cart", component: CartComponent},
    { path: "order", component: OrderComponent},
    { path: "payment", component: PaymentComponent},
    { path: "address", component: AddressComponent},
    { path: "newAddress", component: NewAddressComponent}
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    {enableTracing: false}
)