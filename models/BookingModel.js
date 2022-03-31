const { model, Schema } = require("mongoose");

const bookingSchema = new Schema({
	user: { type: Schema.Types.ObjectId, required: true },
	cleaner: { type: Schema.Types.ObjectId, required: true },
	time: { type: Number, required: true, default: Date.now },
	address: { type: String, required: true },
	county: { type: String, required: true },
	type: {
		type: String,
		required: true,
		enum: ["Basic", "Toppklass", "Diamant", "Fönstertvätt"],
	},
	status: {
		type: String,
		required: true,
		enum: ["Ej Utförd", "Utförd", "Godkänd", "Ej Godkänd"],
	},
});
const BookingModel = model("bookings", bookingSchema);

module.exports = BookingModel;
