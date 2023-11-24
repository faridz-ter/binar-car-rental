import Users from "../models/Users";

class RepositoryAuth {
    create(createArgs: any) {
        return Users.query().insert(createArgs);
    }

    async findUser(username: string): Promise<Users | undefined> {
        try {
            const user = await Users.query().findOne({username}).select('*');
            return user;
        } catch (error) {
            console.error('Error finding user:', error);
            return undefined;
        }
    }

    getTotalUser() {
        return Users.query().resultSize();
    }
}

export default new RepositoryAuth();