import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ModelConverter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.modelConverter;
  },
);