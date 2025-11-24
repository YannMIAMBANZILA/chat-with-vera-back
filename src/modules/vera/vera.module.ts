import { Module } from "@nestjs/common";
import { VeraController } from "./vera.controller";
import { VeraService } from "./vera.service";

@Module({
    controllers: [VeraController], // enregistrer le contrôleur Vera
    providers: [VeraService], // enregistrer le service Vera
})
export class VeraModule {}

