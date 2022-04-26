const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const Note = require('../models/NoteModal');
const Ticket = require('../models/TicketModel');

// @desc Get notes for ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
	// get user using id && JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status('401');
		throw new Error('User not found');
	}
	// find all tickets that belong to  current logged in user
	const ticket = await Ticket.findById(req.params.ticketId);
	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User Not Authorized');
	}
	// fetch notes related to it's user
	const notes = await Note.find({
		ticket: req.params.ticketId,
	});
	res.status(200).json(notes);
});

// @desc Create Ticket Notes
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
	// get user using id && JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status('401');
		throw new Error('User not found');
	}
	// find all tickets that belong to  current logged in user
	const ticket = await Ticket.findById(req.params.ticketId);
	// make sure user owns the current ticket
	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User Not Authorized');
	}
	// fetch notes related to it's user
	const note = await Note.create({
		ticket: req.params.ticketId,
		text: req.body.text,
		isStaff: false,
		user: req.user.id,
	});
	res.status(200).json(note);
});

module.exports = {
	getNotes,
	addNote,
};
