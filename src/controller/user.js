const router = require("express").Router();
const logger = require("../config/logger");
const userData = [];
let userCount = 1;
router.get("/", async (req, res) => {
  try {
    logger.info("Incoming request to load users");
    res.json({message:"Users loaded Successfully", data:userData})
  } catch (err) {
    logger.error("Failed to load user");
    res.status(422).json({
      message: "Failed to load user"
    });
  }
});
router.get("/:id", async (req, res) => {
    try {
      logger.info("Incoming request to load user");
      const user = userData.find(item => item.id === Number(req.params.id));
      res.json({message:"User details loaded", data:user || []})
    } catch (err) {
      logger.error("Failed to load user");
      res.status(422).json({
        message: "Failed to load user"
      });
    }
  });
router.put("/:id", async (req, res) => {
  try {
    logger.info("Incoming request to update user");
    const foundIndex = userData.findIndex(element => element.id === Number(req.body.id))
    userData.splice(foundIndex, 1, req.body)
    res.json({ message: "User updated Successfully" });
  } catch (err) {
    logger.error("Failed to update user");
    res.status(422).json({
      message: "Failed to update user"
    });
  }
});
router.post("/",async (req, res) => {
  try {
    logger.info("Incoming request to add user");
    req.body.id = userCount;
    userData.push(req.body);
    userCount++;
    logger.info("Incoming request to add user");
    res.json({ message: "User added Successfully" });
  } catch (err) {
    logger.error("Failed to add user");
    res.status(422).json({
      message: "Failed to add user"
    });
  }
});
router.delete("/", async (req, res) => {
    try {
      logger.info("Incoming request to del user");
      console.log(userData)
      const index = userData.findIndex(obj => obj.id === req.body.id);
      userData.splice(index,1);
      res.json({message:"Users deleted Successfully"})
    } catch (err) {
      logger.error("Failed to delete user");
      res.status(422).json({
        message: "Failed to delete user"
      });
    }
  });
module.exports = router;
