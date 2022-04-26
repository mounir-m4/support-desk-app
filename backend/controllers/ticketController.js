const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const Ticket = require('../models/TicketModel');

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
	// get user using id && JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status('401');
		throw new Error('User not found');
	}
	// find all tickets that belong to  current logged in user
	const tickets = await Ticket.find({ user: req.user.id });
	res.status(200).json(tickets);
});

// @desc Get user ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
	// get user using id && JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status('401');
		throw new Error('User not found');
	}
	// find single ticket with given id (url)
	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		res.status('404');
		throw new Error('Ticket not found');
	}
	//show ticket only to current user
	if (ticket.user.toString() !== req.user.id) {
		throw new Error('Not Authorized');
	}
	res.status(200).json(ticket);
});

// @desc Create new tickets
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
	const { product, description } = req.body;
	if (!product || !description) {
		res.status('400');
		throw new Error('Please add a product and description');
	}
	// get user using id && JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status('401');
		throw new Error('User not found');
	}
	// find all tickets that belong to  current logged in user
	const ticket = await Ticket.create({
		product,
		description,
		user: req.user.id,
		status: 'new',
	});
	res.status(201).json(ticket);
});

// @desc Update  ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
	// get user using id && JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status('401');
		throw new Error('User not found');
	}
	// find single ticket with given id (url)
	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		res.status('404');
		throw new Error('Ticket not found');
	}
	//show ticket only to current user
	if (ticket.user.toString() !== req.user.id) {
		throw new Error('Not Authorized');
	}
	const updatedTicket = await Ticket.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	res.status(200).json(updatedTicket);
});

// @desc Delete  ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
	// get user using id && JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status('401');
		throw new Error('User not found');
	}
	// find single ticket with given id (url)
	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		res.status('404');
		throw new Error('Ticket not found');
	}
	//show ticket only to current user
	if (ticket.user.toString() !== req.user.id) {
		throw new Error('Not Authorized');
	}
	await ticket.remove();
	res.status(200).json({ success: true });
});

module.exports = {
	getTickets,
	getTicket,
	createTicket,
	updateTicket,
	deleteTicket,
};
