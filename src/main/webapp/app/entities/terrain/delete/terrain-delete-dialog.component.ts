import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITerrain } from '../terrain.model';
import { TerrainService } from '../service/terrain.service';

@Component({
  templateUrl: './terrain-delete-dialog.component.html',
})
export class TerrainDeleteDialogComponent {
  terrain?: ITerrain;

  constructor(protected terrainService: TerrainService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.terrainService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
