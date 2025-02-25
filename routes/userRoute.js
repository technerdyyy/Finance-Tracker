const express = require("express");
const { loginController, registerController } = require("../controllers/usercontroller");

const router = express.Router();
// GET route to check if users route is working
router.get("/", (req, res) => {
    res.json({ message: "Users route is working!" });
});

router.post("/login", loginController)

router.post("/register", registerController)

module.exports = router;