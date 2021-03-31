import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { Event } from "../events/entities/event.entity";

// non class based providers
import { COFFEE_BRANDS } from "./coffees.constants";

// use class based providers
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        {
            provide: COFFEE_BRANDS,
            useValue: ["Salemba brew", "nestcafe"],
        },
        {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === "development" ? DevelopmentConfigService : ProductionConfigService,
        },
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
