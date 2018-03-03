import { RouterModule, Routes} from '@angular/router';

//组件
import { AppComponent } from '../app.component';
import { FooterComponent } from '../component/footer/footer.component';

const appRoutes:Routes = [
    { path: "/footer", component: FooterComponent}
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    {enableTracing: false}
)