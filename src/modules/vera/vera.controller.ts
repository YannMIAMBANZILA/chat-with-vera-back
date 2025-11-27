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

    // 🔗 URL du webhook n8n (mets ça dans ton .env si possible)
    const webhookUrl = process.env.N8N_WEBHOOK_URL_test || '';

    const formData = new FormData();

    formData.append('queryId', crypto.randomUUID());

    // champs texte
    formData.append('question', question);
    formData.append('userId', userId);

    // fichiers (optionnels)
    if (files?.length) {
      for (const file of files) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        formData.append('files', file.buffer, {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          filename: file.originalname,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          contentType: file.mimetype,
        });
      }
    }

    // 🔁 envoie vers n8n
    const { data } = await axios.post<unknown>(webhookUrl, formData, {
      headers: formData.getHeaders(),
    });

    // 📨 renvoi brut au front
    // → ton front attend au moins { answer: string }
    return data;
  }
}
