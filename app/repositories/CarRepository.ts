import { MaybeCompositeId } from "objection";
import { CarsModel, Cars } from "../models/cars";

export type carsType = Cars;

export default new class CarRepository {
    async create( createArgs: Cars ){
        return CarsModel.query().insert(createArgs).returning('*')
    }

    async update(id: MaybeCompositeId, updateArgs: Cars){
        return CarsModel.query()
            .where({ id })
            .patch(updateArgs)
            .throwIfNotFound()
            .returning("*");
    }

    async delete(id: MaybeCompositeId){
        return CarsModel.query()
            .deleteById(id)
            .throwIfNotFound()
    }

    async findById(id: MaybeCompositeId){
        return CarsModel.query()
            .findById(id)
            .throwIfNotFound();
    }

    async findAll(){
        const query = CarsModel.query();
        const [total, data] = await Promise.all([
            query.resultSize(),
            query.select()
        ]);

        return {
            data,
            total
        }
    }

    async find(q: string | undefined | string[]){
        const query = CarsModel
            .query()
            .whereLike('cars_name', `%${q}%`)
            .orWhereLike('cars_size', `%${q}%`)
        
        const [total, data] = await Promise.all([
            query.resultSize(),
            query.select()
        ]);
        
        return {
            data,
            total
        }
    }

    async getTotalCars(){
        return CarsModel.query().count()
    }
}