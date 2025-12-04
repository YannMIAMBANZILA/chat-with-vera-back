/**
 * Guard JWT pour protéger les routes.
 *
 * Rôle :
 *  - S'exécute avant la route (controller).
 *  - Délègue à la stratégie "jwt" (JwtStrategy) la vérification du token.
 *  - Si le token est valide, req.user est rempli (par JwtStrategy).
 *  - Si invalide → 401 Unauthorized.
 *
 * Usage :
 *   @UseGuards(JwtAuthGuard)
 *   @Get('profile')
 *   getProfile(@Request() req) {
 *     return req.user;
 *   }
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// On indique qu'on utilise la stratégie nommée "jwt"
export class JwtAuthGuard extends AuthGuard('jwt') {}
