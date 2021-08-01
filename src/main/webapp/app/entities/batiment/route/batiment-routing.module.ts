import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BatimentComponent } from '../list/batiment.component';
import { BatimentDetailComponent } from '../detail/batiment-detail.component';
import { BatimentUpdateComponent } from '../update/batiment-update.component';
import { BatimentRoutingResolveService } from './batiment-routing-resolve.service';

const batimentRoute: Routes = [
  {
    path: '',
    component: BatimentComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BatimentDetailComponent,
    resolve: {
      batiment: BatimentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BatimentUpdateComponent,
    resolve: {
      batiment: BatimentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BatimentUpdateComponent,
    resolve: {
      batiment: BatimentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(batimentRoute)],
  exports: [RouterModule],
})
export class BatimentRoutingModule {}
