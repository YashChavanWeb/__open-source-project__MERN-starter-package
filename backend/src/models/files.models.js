import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true },
});

const File = mongoose.model('File', fileSchema);

export default File;