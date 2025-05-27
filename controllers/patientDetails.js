const multer = require('multer');
const axios = require('axios');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleImageUpload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No image files provided.' });
        }

        const pythonApiUrl = 'PYTHON_URI';
        const formData = new FormData();

        req.files.forEach(file => {
            formData.append('images', Buffer.from(file.buffer), file.originalname);
        });

        const response = await axios.post(pythonApiUrl, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
        });

        res.json({ text: response.data.text });
    } catch (error) {
        console.error('Error sending images to Python:', error);
        res.status(500).json({ error: 'Failed to process images.' });
    }
};

module.exports = {
    handleImageUpload
};
