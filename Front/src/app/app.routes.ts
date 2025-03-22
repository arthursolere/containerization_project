import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserInformationComponent } from './user-informations/user-informations.component';
import { AuthGuard } from './auth-guard.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedTasksComponent } from './shared-tasks/shared-tasks.component';


export const routes: Routes = [
    {path : 'sign-in', component: SignInComponent},
    {path : 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
    {path : 'sign-up', component: SignUpComponent},
    {path : 'user-informations', component: UserInformationComponent},
    {path : 'shared-tasks', component: SharedTasksComponent},
    {path : '', component: DashboardComponent, canActivate: [AuthGuard]},
];
