import { UsersModel } from "../models/users";

class UserRepository {
  async findByEmail(email: string) {
    return await UsersModel.query().findOne({ email });
  }

  async createUser(userData: any) {
    return await UsersModel.query().insert(userData);
  }
}

export default new UserRepository();
