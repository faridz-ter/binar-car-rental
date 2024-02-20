import Users, { IUsers } from "../models/Users";

export interface IRegisterUser {
    username: string;
    password: string;
    email: string;
    role: string;
  }

class RepositoryAuth {
    constructor() {}
    create(createArgs: any) {
        return Users.query().insert(createArgs);
    }

    async findUser(email: string): Promise<IUsers> {
        const user = await Users.query().findOne({email}).select('*') as unknown as IUsers;
        return user ;
    }

    getTotalUser() {
        return Users.query().resultSize();
    }
}

export default RepositoryAuth;