import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './dto/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // Méthode pour créer un nouvel utilisateur
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      // Gérer les erreurs
      // email déjà utilisé
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }

  // Méthode pour récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Méthode pour récupérer un utilisateur par son ID
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  // Méthode pour récupérer un utilisateur par son email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
