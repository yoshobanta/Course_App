const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db")
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    //Check if a user with this username already exists(here we are assuming no duplicate users)

    //If the variable names are the same as the property names, you can use shorthand syntax i.e instead of username = username, only username.
    await Admin.create({
        username,
        password
    })
    res.json({
        message :'Admin created successfully'
    })

    

});
router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // Can Use zod for input validation
    
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        message : 'Course created successfully',
        courseId : newCourse._id
    })

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})
    res.json({
        courses : response
    })
});

module.exports = router;