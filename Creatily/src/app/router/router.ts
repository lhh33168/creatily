import { RouterModule, Routes} from '@angular/router';

//组件
import { AppComponent } from '../app.component';
import { FooterComponent } from '../component/footer/footer.component';
import { CartComponent } from '../component/cart/cart.component'
    
const appRoutes:Routes = [
    { path: "footer", component: FooterComponent},
    { path: "cart", component: CartComponent}
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    {enableTracing: false}
)