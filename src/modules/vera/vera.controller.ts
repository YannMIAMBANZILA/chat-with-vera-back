import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import axios from 'axios';
import FormData from 'form-data';

@Controller('vera')
export class VeraController {
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
    }),
  )
  async handleVera(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('question') question: string,
    @Body('userId') userId: string,
  ) {
    if (!question) {
      throw new BadRequestException('La question est obligatoire');
    }

    // 🔗 URL du webhook n8n (utilise N8N_WEBHOOK_URL en production, N8N_WEBHOOK_URL_test en test)
    const webhookUrl =
      process.env.N8N_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL_test;

    if (!webhookUrl) {
      throw new BadRequestException(
        "N8N_WEBHOOK_URL n'est pas configuré dans le .env",
      );
    }

    const formData = new FormData();

    formData.append('queryId', crypto.randomUUID());

    // champs texte
    formData.append('question', question);
    formData.append('userId', userId || 'anonymous');

    // fichiers (optionnels)
    if (files?.length) {
      for (const file of files) {
        formData.append('files', file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype,
        });
      }
    }

    try {
      console.log('🚀 Envoi vers n8n:', webhookUrl);
      console.log('📝 Question:', question);
      console.log('📁 Fichiers:', files?.length || 0);

      // 🔁 envoie vers n8n
      const { data } = await axios.post<unknown>(webhookUrl, formData, {
        headers: formData.getHeaders(),
        timeout: 30000, // 30 secondes
      });

      console.log('✅ Réponse n8n reçue');

      // 📨 renvoi brut au front
      return data;
    } catch (error) {
      console.error('❌ Erreur n8n:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new BadRequestException(
            "Le webhook n8n n'existe pas ou n'est pas actif. Vérifiez que votre workflow n8n est démarré.",
          );
        }
        throw new BadRequestException(
          `Erreur n8n (${error.response?.status}): ${error.message}`,
        );
      }

      throw error;
    }
  }
}
