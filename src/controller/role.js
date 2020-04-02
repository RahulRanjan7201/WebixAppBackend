const router = require('express').Router();
const logger = require('../config/logger')
const roles = [];
let roleCount = 1;
router.get('/', async (req, res) => {
    try {
        logger.info('Incoming request to load role');
        res.json({message:"Roles loaded Successfully", data:roles})
    } catch (err) {
      logger.error('Failed to load roles');
      res.status(422).json({
        message: 'Failed to load roles'
      });
    }
  });
  
  const Validate = (req,res, next) => {
    const isPresent = roles.find(item => item.value === req.body.value);
    if(isPresent) {
    throw "Role Already Present";
    }
    next();
}
  router.post('/', Validate, async (req, res) => {
    try {
      logger.info('Incoming request to add role');
      req.body.id = roleCount;
      roles.push(req.body);
      roleCount ++;
      res.json({message:"Role added Successfully."})
    } catch (err) {
      logger.error('Failed to add role');
      res.status(422).json({
        message: 'Failed to add role' + err
      });
    }
  });
  router.delete("/", async (req, res) => {
    try {
      logger.info("Incoming request to del role");
      const index = roles.findIndex(obj => obj.id === req.body.id);
      roles.splice(index,1);
      res.json({message:"Role deleted Successfully"})
    } catch (err) {
      logger.error("Failed to delete Role");
      res.status(422).json({
        message: "Failed to delete Role"
      });
    }
  });
module.exports = router