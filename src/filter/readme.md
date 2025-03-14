## NestJS 异常过滤器

NestJS 中的异常过滤器用于处理和转换应用程序抛出的异常。它们提供了一种捕获错误并向客户端返回适当响应的方法。异常过滤器可以用于处理特定类型的异常或创建全局错误处理机制。

### 创建异常过滤器

要创建异常过滤器，需要实现 `ExceptionFilter` 接口并定义 `catch` 方法。`catch` 方法接受两个参数：异常对象和主机对象，主机对象提供了访问请求和响应对象的方法。

下面是一个自定义异常过滤器的示例：

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorResponse = {
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message || null,
    };

    response.status(status).json(errorResponse);
  }
}
```

在上面的示例中，我们创建了一个名为 `HttpErrorFilter` 的异常过滤器，它捕获 `HttpException` 类型的异常，并返回一个包含错误信息的 JSON 响应。
