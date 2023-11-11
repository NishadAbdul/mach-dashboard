import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { AppState } from 'src/app/app.service';
import { RouteDataService } from 'src/app/core/services/routedata.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  public animateSideBar: boolean = false;
  public stepIndex: number = 0;
  public expanded: boolean = false;
  @Input() ApplicationProgress: number = 0;
  constructor(private routeDataService: RouteDataService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private appState: AppState) {
    const currentStep = this.appState.getSharedObj('resumeStep');
    if (currentStep > 0 && this.stepIndex === 0) {
      this.stepIndex = currentStep;
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route: any) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route: any) => route.outlet === 'primary'),
      mergeMap((route: any) => route.data)
    ).subscribe((event: any) => {
      this.stepIndex = event['ApplicationProgress'];
      this.appState.setSharedObj('resumeStep', this.stepIndex);
    });
  }

}
