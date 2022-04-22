const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getMe,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

//register route
router.post('/', registerUser);
// login route
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
