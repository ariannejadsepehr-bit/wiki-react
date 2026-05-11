import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    const roleHierarchy: Record<string, number> = {
      super_admin: 6,
      admin: 5,
      seo_manager: 4,
      editor: 3,
      business_owner: 2,
      user: 1,
      guest: 0,
    };

    const userLevel = roleHierarchy[user.role] ?? 0;
    return requiredRoles.some(
      (role) => userLevel >= (roleHierarchy[role] ?? 0),
    );
  }
}
