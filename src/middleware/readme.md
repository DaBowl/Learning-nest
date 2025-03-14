# 中间件 (Middleware) in NestJS

中间件是NestJS中的一个函数，它在请求被路由处理之前被调用。中间件可以对请求进行预处理，例如验证、日志记录、修改请求对象等。中间件在整个请求-响应周期中扮演着重要角色。

### 示例代码

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`);
    next();
  }
}

// 在模块中应用中间件
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
```

在上面的示例中，`LoggerMiddleware` 是一个简单的中间件，它在每个请求到达时打印日志。然后在 `AppModule` 中，我们使用 `MiddlewareConsumer` 将这个中间件应用到 `cats` 路由。
