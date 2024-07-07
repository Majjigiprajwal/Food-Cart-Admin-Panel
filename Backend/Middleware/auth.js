const jwt = require('jsonwebtoken');
const User = require('../Models/user');

exports.protectCustomer = async (req, res, next) => {
  try {
    
    const token = req.header('Authorization')?.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

   

    if (user.role !== 'customer') {
      return res.status(401).json({ message: 'Please authenticate as a customer' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

exports.protectAdmin = async (req, res, next) => {
  try {

    const token = req.header('Authorization')?.replace('Bearer ', '');
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
  
    const user = await User.findById(decoded.user.id);
  
    if (user.role !== 'admin') {
      
      return res.status(401).json({ message: 'Please authenticate as an admin' });
    }

    req.user = user;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};
