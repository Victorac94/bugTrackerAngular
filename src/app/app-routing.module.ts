import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { IssuesComponent } from './issues/issues.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { IssueComposerComponent } from './issue-composer/issue-composer';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'issues', component: IssuesComponent },
  { path: 'issues/new', component: IssueComposerComponent },
  { path: 'issues/:issueId', component: IssueDetailsComponent },
  { path: 'issues/:issueId/edit', component: IssueComposerComponent },
  { path: 'user/:userId', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
