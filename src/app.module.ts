import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VeraModule } from './modules/vera/vera.module';
import { ResponsesModule } from './modules/responses/responses.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { RealtimeModule } from './realtime/realtime.module';

@Module({
  imports: [
    // 1️⃣ Config global
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env', // si besoin
    }),

    // 2️⃣ Connexion MongoDB (une seule fois, proprement)
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

    // 3️⃣ Tes modules métiers
    UserModule,
    AuthModule,
    VeraModule,
    ResponsesModule,
    DashboardModule,
    RealtimeModule, // <= ici, comme un module normal
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
