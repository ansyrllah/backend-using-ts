import UserRepository from "../repositories/userRepository";
import { encyrptPassword, checkPassword, createToken } from "../utils/encrypt";

class UserService {
  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordCorrect = await checkPassword(user.password, password);

    if (!passwordCorrect) {
      throw new Error("Wrong password");
    }

    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role,
      nama: user.nama,
      created_at: user.created_at,
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      nama: user.nama,
      token,
      created_at: user.created_at,
    };
  }

  async register(userData: any, createdBy: string) {
    if (userData.role === "superadmin") {
      throw new Error("Superadmin cannot be created");
    }

    const encryptedPassword = await encyrptPassword(userData.password);
    const newUser = {
      ...userData,
      password: encryptedPassword,
      created_by: createdBy,
    };

    return await UserRepository.createUser(newUser);
  }

  async registerMember(userData: any) {
    const encryptedPassword = await encyrptPassword(userData.password);
    const newUser = {
      ...userData,
      password: encryptedPassword,
      role: "user",
    };

    return await UserRepository.createUser(newUser);
  }
}

export default new UserService();
