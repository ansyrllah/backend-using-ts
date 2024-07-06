import CarRepository, { carsType } from "../repositories/CarRepository";
import cloudinary from '../middleware/cloudinary';

export default new class CarService {
    async create( requestBody:carsType ){
        return CarRepository.create(requestBody);
    }

    async update(id: string, requestBody:carsType ){
        return CarRepository.update(id, requestBody)
    }

    async delete(id: string){
        return CarRepository.delete(id)
    }

    async get(id: string){
        return CarRepository.findById(id)
    }

    async list(query: any){
        try{
            let cars;

            if(!query){
                cars = await CarRepository.findAll();
            }else{
                cars = await CarRepository.find(query);
            }

            return {
                data: cars.data,
                count: cars.total
            }

        } catch (err){
            throw err;
        }
    }

    async upload(file: any){
        const fileBase64 = file?.buffer.toString("base64")
        const fileString = `data:${file?.mimetype};base64,${fileBase64}`
        try {
            const result = await cloudinary.uploader.upload(fileString)
            return result
        } catch (e){
            throw (e)
        }
    }
}