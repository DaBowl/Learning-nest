import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CheckUserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // console.log(req, 'req++++++++++');
    // console.log(res, 'res++++++++++');
    next();
  }
}
