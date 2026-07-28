import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    
        
    
  },
    {
        timestamps: true
    }
);


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;