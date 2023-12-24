import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// User Interface
interface IUser extends Document {
    email: string;
    password: string;
}

// User Model Interface including static methods
interface IUserModel extends Model<IUser> {
    login(email: string, password: string): Promise<IUser>;
}

// User Schema
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
});

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Static login method
userSchema.statics.login = async function (email: string, password: string) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

// User Model
const User = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;
