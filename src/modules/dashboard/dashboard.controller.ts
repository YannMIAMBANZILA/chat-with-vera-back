/**
 * Controller du dashboard admin.
 *
 * Rôle :
 *  - Exposer les routes HTTP du dashboard (API consommée par Angular).
 *  - Protéger toutes les routes par :
 *      - JwtAuthGuard : nécessite un JWT valide (user connecté)
 *      - RolesGuard   : nécessite le rôle 'admin'
 *  - Agréger les données venant de plusieurs services (users, surveys, responses, stats)
 *    pour construire une vue d'ensemble du dashboard.
 */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { UserService } from '../users/user.service';
import { SurveysService } from '../surveys/surveys.service';
import { ResponsesService } from '../responses/responses.service';

@Controller('dashboard')              // Toutes les routes commencent par /api/dashboard
@UseGuards(JwtAuthGuard, RolesGuard) // Auth JWT + vérification du rôle
@Roles('admin')                      // Ensemble du controller réservé aux admins
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService, // stats (collection dashboard_data)
    private readonly userService: UserService,           // utilisateurs
    private readonly surveysService: SurveysService,     // sondages
    private readonly responsesService: ResponsesService, // réponses aux sondages
  ) {}

  /**
   * GET /dashboard/stats
   * Route "historique brut" : renvoie toutes les lignes de la collection dashboard_data.
   * Peut servir pour un graphique de type "historique des activités".
   */
  @Get('stats')
  async getStats() {
    return this.dashboardService.getAllStats();
  }

  /**
   * GET /dashboard/stats/latest
   * Renvoie uniquement la dernière stat enregistrée.
   * Utile pour une carte "stat actuelle" (snapshot).
   */
  @Get('stats/latest')
  async getLatestStat() {
    return this.dashboardService.getLatestStat();
  }

  /**
   * GET /dashboard/overview
   *
   * Route principale pour le dashboard Vue d'ensemble.
   * Elle agrège plusieurs sources de données en un seul objet JSON :
   *  - stats d'activité (dashboard_data)
   *  - liste des sondages récents
   *  - quelques compteurs globaux (nb users, nb réponses, nb sondages, etc.)
   *
   * Angular ne fait qu'un seul appel HTTP pour hydrater tout le dashboard.
   */
  @Get('overview')
  async getOverview() {
    // On lance toutes les requêtes Mongo en parallèle pour aller plus vite
    const [allStats, latestStat, users, surveys, responses] = await Promise.all([
      this.dashboardService.getAllStats(),    // historique complet
      this.dashboardService.getLatestStat(),  // dernière stat
      this.userService.findAll(),             // tous les utilisateurs
      this.surveysService.findAll(),          // tous les sondages
      this.responsesService.findAll(),        // toutes les réponses
    ]);

    // On prépare quelques agrégations simples pour coller à l'UI
    const totalUsers = users.length;
    const totalSurveys = surveys.length;
    const totalResponses = responses.length;

    // Ex. : activités récentes = dernières n stats triées par date décroissante
    const recentActivities = allStats.slice(-7); // ajuster selon ton besoin

    // Ex. : sondages récents = derniers sondages créés
    const recentSurveys = surveys.slice(-5); // ou trier par createdAt si dispo

    // Objet renvoyé au front : structure à adapter à ton modèle Angular
    return {
      // Données pour les graphes "Activités récentes"
      activities: {
        allStats,      // pour un graphe historique
        latestStat,    // pour une carte "snapshot"
        recent: recentActivities,
      },

      // Bloc "Sondages récents"
      surveys: {
        recent: recentSurveys,
        total: totalSurveys,
      },

      // Bloc "Statistiques globales" (cartes en bas, donuts, etc.)
      stats: {
        totalUsers,
        totalSurveys,
        totalResponses,
        // Tu peux ajouter d'autres agrégats ici (par ex. réponses par sondage, par jour, etc.)
      },

      // Si tu veux aussi exposer les données brutes pour d'autres composants :
      raw: {
        users,
        surveys,
        responses,
      },
    };
  }
}
