import mongoose from "mongoose";
const { schema } = mongoose;
const { ObjectId } = schema;

const propertySchema = new schema({
    title: {
        type: 'string',
        required: true,
    },
    location: {
        type: 'string',
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    images: [
        {
            type: String,
        },
    ],
    description: {
        type: String,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
    },
    size: {
        type: Number,
        required: true,
    },
    propertyType: {
        type: String,
        default: "apartment",
        enum: ['office', 'house', 'villa','land'],
    },
    status: {
        type: String,
    },
    
}, {timestamps: true});

export default mongoose.model('property', propertySchema);