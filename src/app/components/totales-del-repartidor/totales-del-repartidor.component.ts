import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ComponentNamer} from '../../app.component';
import {ReadRepartoFileService} from '../../services/read-reparto-file.service';
import {ITotal} from '../../interfaces/ITotal';

@Component({
  selector: 'app-totales-del-repartidor',
  templateUrl: './totales-del-repartidor.component.html',
  styleUrls: ['./totales-del-repartidor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TotalesDelRepartidorComponent extends ComponentNamer implements OnInit {

  totales: ITotal[];
  repartidorName = "";
  repId: number;

  constructor(private route: ActivatedRoute, private readRepartoFileService: ReadRepartoFileService, private router: Router) {
    super();
  }

  ngOnInit() {
    const repId = this.route.snapshot.paramMap.get('repId');
    this.repId = parseInt(repId);
    if(this.readRepartoFileService.reparto == null) {
      this.router.navigate(['home/-1/404']);
    } else {
      this.repartidorName = this.readRepartoFileService.getRepartidorName(repId).bold();
      this.totales = this.readRepartoFileService.getTotalesPorRepartidor(repId);
    }
  }
  goHome() {
    this.router.navigate(['home/'+ this.repId]);
  }

}
