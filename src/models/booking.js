import mongoose from "mongoose";
const { schema } = mongoose;

const bookingSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    totalDays: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
    cancellationReason: {
        type: String,
    },
    cancellationDate: {
        type: Date,
    },
}, {timestamps: true});

export default mongoose.model('booking', bookingSchema);