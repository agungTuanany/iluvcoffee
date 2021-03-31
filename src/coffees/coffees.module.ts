import { Injectable, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { Event } from "../events/entities/event.entity";

// non class based providers
import { COFFEE_BRANDS } from "./coffees.constants";

// factory based providers
@Injectable()
export class CoffeeBrandsFactory {
    create() {
        /* -- do soemthing here --*/

        return ["Salemba brew", "nestcafe"];
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,

        // {
        //     provide: COFFEE_BRANDS,
        //     useFactory: () =>  ["Salemba brew", "nestcafe"],
        // },

        /* -- OR -- */

        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS,
            useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
            inject: [CoffeeBrandsFactory],
        },
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
