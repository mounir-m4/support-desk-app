const mongoose = require('mongoose');

//connect to db func
const connect = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(
			`mongo db connected to: ${conn.connection.host}`.cyan.underline
		);
	} catch (error) {
		console.log(`Error: ${error.message}`.red.underline.bold);
		process.exit(1);
	}
};
module.exports = connect;
