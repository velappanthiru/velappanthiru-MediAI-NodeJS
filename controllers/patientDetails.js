const multer = require('multer');
const axios = require('axios');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided.' });
        }
        const pythonApiUrl = 'PYTHON_URI';
        const formData = new FormData();
        formData.append('image', Buffer.from(req.file.buffer), req.file.originalname);

        const response = await axios.post(pythonApiUrl, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
        });

        res.json({ text: response.data.text });
    } catch (error) {
        console.error('Error sending image to Python:', error);
        res.status(500).json({ error: 'Failed to process image.' });
    }
};

module.exports = {
    handleImageUpload
};