import mongoose from "mongoose";

const animeListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    animeCompletado: [{
        animeid: {
            type: Number,
            required: true
        },
        animeTitle: {
            type: String,
            required: true
        },
        animeCoverImage: {
            type: String,
            required: true
        },    
    }],
    animeEnProgreso: [{
        animeid: {
            type: Number,
            required: true
        },
        animeTitle: {
            type: String,
            required: true
        },
        animeCoverImage: {
            type: String,
            required: true
        },    
    }],
    animePlanToWatch: [{
        animeid: {
            type: Number,
            required: true
        },
        animeTitle: {
            type: String,
            required: true
        },
        animeCoverImage: {
            type: String,
            required: true
        },    
    }],
    animeDropped: [{
        animeid: {
            type: Number,
            required: true
        },
        animeTitle: {
            type: String,
            required: true
        },
        animeCoverImage: {
            type: String,
            required: true
        },    
    }],

});     
export const AnimeList = mongoose.model('AnimeList', animeListSchema);