const router = require("express").Router();
const Contact = require("../models/Contact");
const Post = require("../models/Contact");


//Create Contact//

router.post("/", async (req, res) => {
    const newContact = new Contact(req.body);
    try {
        const contact = await newContact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get contact///
router.get("/:id", async (req, res) => {
    const contact =await Contact.findById(req.params.id);
    try {
       
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;