import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { HttpLoaderService } from './core/services/loader.service';
import tinycolor from "tinycolor2";
export let browserReloaded = false;

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public config: any = {
  };
  colorPalette: Color[] = [];
  title: string = 'MACH';
  constructor(
    public loaderService: HttpLoaderService,
    public router: Router
  ) {
    const primary = '#192f59';
    const secondary = '#2ea9e4';
    this.saveThemeColor(primary);
    this.saveThemeColor(secondary, false);
    this.setTitle();
  }

  ngOnInit() {
    
    
  }

  saveThemeColor(color: string, isPrimary = true) {
    this.colorPalette = this.computeColors(color);
    const type = isPrimary ? 'primary' : 'secondary';
    for (const color of this.colorPalette) {
      const key1 = `--mach-${type}-${color.name}`;
      const value1 = color.hex;
      const key2 = `--mach-${type}-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  computeColors(hex: string): Color[] {
    return [
      this.getColorObject(tinycolor(hex).lighten(52), '50'),
      this.getColorObject(tinycolor(hex).lighten(37), '100'),
      this.getColorObject(tinycolor(hex).lighten(26), '200'),
      this.getColorObject(tinycolor(hex).lighten(12), '300'),
      this.getColorObject(tinycolor(hex).lighten(6), '400'),
      this.getColorObject(tinycolor(hex), '500'),
      this.getColorObject(tinycolor(hex).darken(6), '600'),
      this.getColorObject(tinycolor(hex).darken(12), '700'),
      this.getColorObject(tinycolor(hex).darken(18), '800'),
      this.getColorObject(tinycolor(hex).darken(24), '900'),
      this.getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
      this.getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
      this.getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
      this.getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
    ];
  }
  
  getColorObject(value: any, name: string): Color {
    const c = tinycolor(value);
    return {
      name: name,
      hex: c.toHexString(),
      darkContrast: c.isLight()
    };
  }

  setTitle() {
    // get product/organization name for setting title from config API
    const instititutionName = this.config.instititutionName ? this.config.instititutionName : 'DAMS';
    document.title = instititutionName ? instititutionName : '';
  }
}
