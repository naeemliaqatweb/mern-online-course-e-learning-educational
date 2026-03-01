import Contact from "../../models/Contact.js";

export const getContact = async (req , res) => {
    try {
        const contact = await Contact.findOne();
        res.json(contact);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
} 


export const saveContact = async (req, res ) => {
    try {
        const {email, phone , address , socialLinks} = req.body;
        let contact = await Contact.findOne();

        if(contact){
            //update contact
            contact.email = email;
            contact.phone = phone;
            contact.address = address;
            contact.socialLinks = socialLinks;
            await contact.save();
        }else{
            contact = new Contact({email, phone , address , socialLinks});
            await contact.save();
        }

        res.json({message: "Contact information saved successfully!", contact});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}