const mongoose = require('mongoose');
const NoteSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		ticket: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Ticket',
		},
		text: {
			type: String,
			required: [true, 'Please add a note'],
		},
		isStaff: {
			type: Boolean,
			default: false,
		},
		staffId: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('Note', NoteSchema);
