import mongoose from "mongoose";
import { Password } from "../services/password";

interface userAttrs {
    email: string,
    password: string
};

// create document
interface UserDoc extends mongoose.Document {
    email: string,
    password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: userAttrs): UserDoc
};


const usersSchema = new mongoose.Schema({
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

usersSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password') as string);
        this.set('password', hashed)
    };

    done();
});


usersSchema.statics.build = (attr: userAttrs) => {
    return new Users(attr);
}

const Users = mongoose.model<UserDoc, UserModel>('Users', usersSchema);

export { Users };
