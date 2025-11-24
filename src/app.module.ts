import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VeraModule } from './modules/vera/vera.module';
import { ResponsesModule } from './modules/responses/responses.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');

        if (!uri) {
          console.error('❌ MONGO_URI is missing in environment variables');
          throw new Error('MONGO_URI is missing in environment variables');
        }

        console.log('✅ Connecting to MongoDB...');
        return {
          uri,
        };
      },
    }),

    VeraModule,
    ResponsesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
