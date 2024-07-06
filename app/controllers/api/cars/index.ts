import { Request, Response } from 'express';
import CarsService from "../../../services/carService"

interface AuthenticatedRequest extends Request {
    user?: {
       nama: any;
    };
  }

//knex
async function getCars(req:Request, res:Response){
    const { q } = req.query
    const cars = await CarsService.list(q)

    return res.status(200).json(cars)
}
//knexend

async function getCarsById(req:Request, res:Response){
    const { id } = req.params

    try{
        const cars = await CarsService.get(id)
        return res.status(200).json(cars)
    } catch(e) {
        return res.status(404).send("Data tidak ditemukan!")
    }
    
}

async function addCars(req:any, res:Response){
    if(!req.body){
        return res.status(400).send("Invalid Request")
    }

    try{
        const fileUpload = await CarsService.upload(req.file)
        const cars = await CarsService.create(
            {
                ...req.body,
                cars_image: fileUpload.url,
                created_by: req.user?.nama
            }
        )

        return res.status(201).json(cars)
    }catch(e){
        return res.status(400).send("Gagal upload file")
    }
}
//todo : tambahkan fungsi untuk delete dan update
async function deleteCars(req:Request, res:Response){
    const { id } = req.params

    try{
        const cars = CarsService.delete(id);
        res.status(200).send("Data berhasil di hapus")
    } catch(e) {
        return res.status(404).send("Data tidak ditemukan!")
    }
}

async function updateCars(req:any, res:Response){
    const { id } = req.params

    if(!req.file){
        try{
            const cars = await CarsService.update(id, {...req.body, updated_by: req.user?.nama})
            return res.status(200).send("Data berhasil di update")
        }catch (e){
            return res.status(404).send("Data tidak ditemukan!")
        }
    }

    try{
        let fileUpload

        try{
            fileUpload = await CarsService.upload(req.file)
        } catch(e){
            return res.status(404).send("Data tidak ditemukan!")
        }

        const cars = CarsService.update(id, {
            ...req.body,
            cars_image: fileUpload.url,
            updated_by: req.user?.nama

        })
        return res.status(200).send("Data berhasil di update")
    } catch(e) {
        return res.status(400).send("Gagal upload file")
    }

}

//todo : export delete dan update
export default {
    getCars,
    getCarsById,
    addCars,
    deleteCars,
    updateCars
}