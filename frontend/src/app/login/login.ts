import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, ButtonModule, PasswordModule, MessageModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
