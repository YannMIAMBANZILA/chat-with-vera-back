/**
 * Controller du dashboard admin.
 *
 * Rôle :
 *  - Définir les routes HTTP liées aux stats du dashboard.
 *  - Toutes les routes sont protégées par :
 *      - JwtAuthGuard : nécessite un JWT valide
 *      - RolesGuard   : nécessite le rôle 'admin'
 *  - Utilise DashboardService pour récupérer les données dans MongoDB.
 */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('dashboard')              // Toutes les routes commencent par /dashboard
@UseGuards(JwtAuthGuard, RolesGuard) // Auth JWT + vérification de rôle
@Roles('admin')                      // L'ensemble du controller est réservé aux admins
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * GET /dashboard/stats
   * Retourne toutes les lignes enregistrées dans "dashboard_data".
   * Utilisé pour afficher l'historique complet des stats dans le dashboard.
   */
  @Get('stats')
  async getStats() {
    return this.dashboardService.getAllStats();
  }

  /**
   * GET /dashboard/stats/latest
   * Retourne uniquement la dernière stat (la ligne la plus récente).
   * Utile pour afficher un "snapshot" actuel sur la page d'accueil du dashboard.
   */
  @Get('stats/latest')
  async getLatestStat() {
    return this.dashboardService.getLatestStat();
  }
}
