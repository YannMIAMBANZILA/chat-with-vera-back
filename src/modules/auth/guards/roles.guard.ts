/**
 * Guard de rôle.
 *
 * Il lit les rôles attendus (définis par @Roles(...))
 * et compare avec le rôle de l'utilisateur présent dans req.user
 * (payload du JWT, injecté par JwtAuthGuard).
 *
 * Si le rôle de l'utilisateur n'est pas dans la liste, on bloque l'accès (403).
 */


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Récupère les rôles requis soit sur la méthode, soit sur la classe
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(), // méthode (route)
      context.getClass(),   // classe (controller)
    ]);

    // Si aucune meta @Roles n'est présente, on laisse passer (pas de restriction de rôle)
    if (!requiredRoles) {
      return true;
    }

    // Récupère la requête HTTP
    const request = context.switchToHttp().getRequest();

    // req.user est renseigné par JwtAuthGuard à partir du JWT (payload)
    const user = request.user;

    // Autorise si le rôle de l'utilisateur est dans la liste des rôles requis
    return requiredRoles.includes(user?.role);
  }
}