import { Injectable } from "@nestjs/common"; 
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./dto/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()

export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) {}

    // Méthode pour créer un nouvel utilisateur
    async create(createUserDto: CreateUserDto): Promise<User> {
        return new this.userModel(createUserDto).save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
