/**
 * Stratégie JWT pour Passport.
 *
 * Rôle :
 *  - Définir COMMENT lire le token (depuis le header Authorization Bearer).
 *  - Vérifier la signature et l'expiration du token avec JWT_SECRET.
 *  - Transformer le payload du token en objet "user" accessible dans req.user.
 *
 * Elle est utilisée automatiquement par JwtAuthGuard ('jwt').
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
// On étend la stratégie JWT fournie par passport-jwt
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1) Où récupérer le token : dans le header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2) On respecte l'expiration du token (false = on NE l’ignore pas)
      ignoreExpiration: false,
      // 3) Clé secrète pour vérifier la signature (même que pour signer dans AuthService)
      secretOrKey: process.env.JWT_SECRET || 'dev-secret',
    });
  }

  /**
   * Méthode appelée AUTOMATIQUEMENT si le token est valide.
   *
   * @param payload  Contenu du token décodé (ce que tu as mis dans this.jwtService.sign(...))
   *                 ex: { sub: user._id, email: user.email, role: user.role, iat, exp }
   *
   * Ce que tu retournes ici sera disponible dans req.user dans tes controllers.
   */
  async validate(payload: any) {
    // On peut filtrer/renommer les champs qu'on veut exposer dans req.user
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
