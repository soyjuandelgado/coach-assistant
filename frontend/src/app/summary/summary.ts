import { Component } from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-summary',
  imports: [ToolbarModule, ButtonModule, PanelModule],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary {}
