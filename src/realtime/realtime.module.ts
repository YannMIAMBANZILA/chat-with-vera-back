import { Module } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway';
import { MongoWatchService } from './mongo-watch.service';

@Module({
  imports: [],
  providers: [RealtimeGateway, MongoWatchService],
})
export class RealtimeModule {}
