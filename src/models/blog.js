import mongoose from "mongoose";
const { schema } = mongoose;

const blogSchema = new schema({
    title: {
        type: 'string',
        required: true,
    },
    content: {
        type: 'string',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
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
    tags: [
        {
            type: String,
        },
    ],
    views: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
}, {timestamps: true});


export default mongoose.model('blog', blogSchema);