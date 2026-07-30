import mongoose from "mongoose";

const mangaListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    mangaCompletado: [{
        mangaid: {
            type: Number,
            required: true
        },
        mangaTitle: {
            type: String,
            required: true
        },
        mangaCoverImage: {
            type: String,
            required: true
        },    
    }],
    mangaEnProgreso: [{
        mangaid: {
            type: Number,
            required: true
        },
        mangaTitle: {
            type: String,
            required: true
        },
        mangaCoverImage: {
            type: String,
            required: true
        },    
    }],
    mangaPlanToRead: [{
        mangaid: {
            type: Number,
            required: true
        },
        mangaTitle: {
            type: String,
            required: true
        },
        mangaCoverImage: {
            type: String,
            required: true
        },    
    }],
    mangaDropped: [{
        mangaid: {
            type: Number,
            required: true
        },
        mangaTitle: {
            type: String,
            required: true
        },
        mangaCoverImage: {
            type: String,
            required: true
        },    
    }],

});     
export const MangaList = mongoose.model('MangaList', mangaListSchema);