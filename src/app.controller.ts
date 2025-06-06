import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'hello world' };
  }

  @Get('alimentos')
  @Render('index')
  alimentos() {
    return { message: 'alimentos' };
  }
}
