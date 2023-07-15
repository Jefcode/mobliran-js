import mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
});

const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel;
