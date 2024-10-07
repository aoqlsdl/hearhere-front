import { ILibrary } from "./Library";

export interface IUser {
    email: string;
    name: string;
    library: ILibrary[];
}

export interface IUserData {
    email: string;
    name: string;
}

class User implements IUser {
    private readonly _email: string;
    private readonly _name: string;
    private readonly _library: ILibrary[];

    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name;
    }

    get library(): ILibrary[] {
        return this._library;
    }

    constructor(email: string, name: string, library: ILibrary[]) {
        this._email = email;
        this._name = name;
        this._library = library;
    }

    equals(_user: User): boolean {
        if (this.email !== _user.email) {
            return false;
        }

        if (this.name !== _user.name) {
            return false;
        }
        return true;
    }
}

export default User;
