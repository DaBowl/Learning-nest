# NestJS中的Guard

在NestJS中，Guard是一种用于处理请求的守卫，它可以在请求到达处理器之前对其进行验证和授权。Guard的主要作用是决定请求是否应该被处理。

## 创建Guard

要创建一个Guard，需要实现`CanActivate`接口。以下是一个简单的示例：

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // 在这里添加你的验证逻辑
    return validateRequest(request);
  }
}

function validateRequest(request: any): boolean {
  // 自定义的验证逻辑
  return true;
}
```

## 使用Guard

创建好Guard之后，可以通过`@UseGuards()`装饰器将其应用到控制器或路由处理器上。

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('cats')
export class CatsController {
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return 'This action returns all cats';
  }
}
```

在上面的示例中，`AuthGuard`会在`findAll`处理器执行之前被调用。如果`AuthGuard`的`canActivate`方法返回`true`，请求将继续处理；否则，请求将被拒绝。

## 总结

Guard在NestJS中是一个强大的工具，可以帮助开发者在请求处理之前进行验证和授权。通过实现`CanActivate`接口并使用`@UseGuards()`装饰器，可以轻松地将Guard集成到应用程序中。
