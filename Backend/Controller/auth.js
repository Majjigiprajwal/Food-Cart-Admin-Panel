const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;


exports.register = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password , address , phone, role} = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists,Please login' });
    }
    console.log(name,email,password,address,role,phone)
    user = new User({ name, email, password,address , phone, role});


    const salt = await bcrypt.genSalt(10);
   
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ success: true, message : 'User registered successfully' });

  } catch (err) {
    console.error('error',err.message);
    res.status(500).json({ success: false, message : 'Server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'No User Found,Please Register' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message : 'Enter Correct Password' });
    }
    
    const payload = { user: { id: user.id ,role:user.role } };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({ success: true, token : token, message : 'Logged in successfully' });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message : 'Server error' });
  }
};


