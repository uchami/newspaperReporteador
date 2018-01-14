import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ComponentNamer} from '../../app.component';
import {ReadRepartoFileService} from '../../services/read-reparto-file.service';
import {ITotal} from '../../interfaces/ITotal';

@Component({
  selector: 'app-totales-del-repartidor',
  templateUrl: './totales-del-repartidor.component.html',
  styleUrls: ['./totales-del-repartidor.component.css']
})
export class TotalesDelRepartidorComponent extends ComponentNamer implements OnInit {

  totales: ITotal[];

  constructor(private route: ActivatedRoute, private readRepartoFileService: ReadRepartoFileService, private router: Router) {
    super();
  }

  ngOnInit() {
    const repId = this.route.snapshot.paramMap.get('repId');
    if(this.readRepartoFileService.reparto == null) {
      this.router.navigate(['home/404']);
    } else {
      this.totales = this.readRepartoFileService.getTotalesPorRepartidor(repId);
    }
  }

}
