import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
    id!: number;
    cars_name!: string;
    cars_price!: number;
    cars_image!: string;
    cars_size!: string;
    created_by!: string;
    updated_by!: string;
    created_at!: Date;
    updated_at!: Date;

    static get tableName(){
        return "cars"
    }
}

export type Cars = ModelObject<CarsModel>;