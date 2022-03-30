const { model, Schema } = require("mongoose");

const bookingSchema = new Schema({
	user: { type: Schema.Types.ObjectId, required: true },
	cleaner: { type: Schema.Types.ObjectId, required: true },
	time: { type: number, required: true, default: Date.now },
	type: {
		type: String,
		required: true,
		enum: [
			"Basic Städning",
			"Topp Städning",
			"Diamant Städning",
			"Fönstertvätt",
		],
	},
	status: {
		type: String,
		required: true,
		enum: ["Inte Utförd", "Utförd", "Godkänd", "Inte Godkänd"],
	},
});
const BookingModel = model("bookings", bookingSchema);

module.exports = BookingModel;
