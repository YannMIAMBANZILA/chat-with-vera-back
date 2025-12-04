import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { RealtimeGateway } from './realtime.gateway';

interface ResponseDoc {
  _id: { toString?: () => string } | string;
  horodateur: string;
  whereDoYouHeard: string;
  pourquoiVera: string;
  veraEasy: string;
  winTime: string;
  fiability: string;
  moreLiked: string;
  problem: string;
  ifProblem: string;
  recommandation: string;
  suggestion: string;
}

interface ChangeStreamEvent {
  operationType: string;
  fullDocument?: ResponseDoc;
}

@Injectable()
export class MongoWatchService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MongoWatchService.name);
  private changeStream?: ReturnType<
    ReturnType<Connection['collection']>['watch']
  >;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly realtimeGateway: RealtimeGateway,
  ) {}

  onModuleInit(): void {
    this.logger.log('Starting MongoDB change stream on "responses" collection');

    const collection = this.connection.collection<ResponseDoc>('responses');

    // [] = pipeline vide → on écoute tout, tu peux filtrer si tu veux
    this.changeStream = collection.watch([], {
      fullDocument: 'updateLookup',
    });

    this.changeStream.on('change', (change: ChangeStreamEvent) => {
      this.logger.debug(`Change detected: ${change.operationType}`);

      if (change.operationType === 'insert' && change.fullDocument) {
        const doc = change.fullDocument;
        const docId =
          typeof doc._id === 'string'
            ? doc._id
            : (doc._id.toString?.() ?? String(doc._id));

        this.realtimeGateway.broadcastNewData({
          id: docId,
          horodateur: doc.horodateur,
          whereDoYouHeard: doc.whereDoYouHeard,
          pourquoiVera: doc.pourquoiVera,
          veraEasy: doc.veraEasy,
          winTime: doc.winTime,
          fiability: doc.fiability,
          moreLiked: doc.moreLiked,
          problem: doc.problem,
          ifProblem: doc.ifProblem,
          recommandation: doc.recommandation,
          suggestion: doc.suggestion,
        });
      }

      // Tu peux aussi gérer update/delete si tu veux
      // if (change.operationType === 'update') { ... }
    });

    this.changeStream.on('error', (err: Error) => {
      this.logger.error('Change stream error', err);
    });
  }

  async onModuleDestroy(): Promise<void> {
    if (this.changeStream) {
      await this.changeStream.close();
    }
  }
}
