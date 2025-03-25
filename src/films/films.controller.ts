import {
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { FilmsService } from './films.service';
import { UserEntity } from 'src/entities/user.entity';
// import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/auth.guard';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('getItem/:id')
  findAll(@Param() params: any): string {
    console.log(params, 'params++++++++++');
    return JSON.stringify(params);
  }

  @Post('save')
  //   @HttpCode(204)
  @Header('Cache-Control', 'no-store')
  @Redirect('http://localhost:3000/films/getItem?cat=miao', 200)
  create(@Query('version') version): any {
    if (version === '5') {
      return { url: 'changed' };
    }
    return 'this action';
  }

  @Get('getItem/*')
  findAlsl(@Req() request: Request): string {
    console.log(request, 'request++++++++++');
    return 'here--findAll';
  }

  @Get('observe')
  observables(): Observable<any[]> {
    return of([]);
  }

  @Get('query')
  getQuery(@Query('age') age: number, @Query('breed') breed: string) {
    console.log(age, 'query++++++++++', breed);
    return JSON.stringify(age);
  }

  @Get('userList')
  @UseGuards(RolesGuard)
  async getUserList(): Promise<UserEntity[]> {
    const users = await this.filmsService.getUserList();
    return users;
  }

  @Get('user')
  // @UseFilters(HttpExceptionFilter)
  async getUser(@Query('id', ParseIntPipe) id: number): Promise<UserEntity> {
    const users = await this.filmsService.getUser(id);
    return users;
  }
}
