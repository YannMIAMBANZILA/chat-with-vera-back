/**
 * Décorateur custom pour déclarer les rôles autorisés
 * sur un controller ou une route spécifique.
 *
 * Usage :
 *   @Roles('admin')
 *   @Roles('admin', 'super-admin')
 * Le guard RolesGuard lira cette meta pour décider si l'utilisateur a le droit d'accéder à la route.
 */

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
