import express from "express";
import cors from "cors"; 
import mongoose from "mongoose"; 

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/TechTics_Club", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Define the Partner schema
const PartnerSchema = new mongoose.Schema({
    name: String,
    description: String,
    logo: String,  // Store image URL or path
    website: String
});

const Partner = mongoose.model("Partner", PartnerSchema);

// Define the Contact schema
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

const Contact = mongoose.model("Contact", ContactSchema);

// Route to add a new partner
app.post("/partners/add", async (req, res) => {
    try {
        const { name, description, logo, website } = req.body;
        const newPartner = new Partner({ name, description, logo, website });
        await newPartner.save();
        res.status(201).json({ message: "Partner added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all partners
app.get("/partners/all", async (req, res) => {
    try {
        const partners = await Partner.find();
        res.json(partners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to handle contact form submissions
app.post("/contact/submit", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));