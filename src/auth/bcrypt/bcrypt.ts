import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class Bcrypt {

    async hashPassword(password: string) {

        const salts = 10
        return await bcrypt.hash(password, salts);
    }

    comparePassword(password: string, passwordHash: string) {
        return bcrypt.compareSync(password, passwordHash);
    }
}