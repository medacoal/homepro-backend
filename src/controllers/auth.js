import User from "../models/user.js";
import { hashPassword } from "../helpers/index.js";
import jwt from "jsonwebtoken"; // for token generation
import { comparePassword } from "../helpers/index.js";


export const register = async (req, res) => {
    try{
        const { firstName, lastName, userName, email, password, } = req.body;
        // console.log(req.body);
        
//handle validation
if(!firstName){
    return res.status(400).json({ success: false, message: 'First name is required'});
}
if(!lastName){
    return res.status(400).json({ success: false, message: 'Last name is required'});
}
if(!userName){
    return res.status(400).json({ success: false, message: 'User name is required'});
}
//check if user already exists
const userNameTaken = await User.findOne({ userName });
if(userNameTaken) {
    return res.status(400).json({ success: false, message: `Username "${userName}" already exists`});
}

//create new user
if(!email){
    return res.status(400).json({ success: false, message: 'email is required'});
}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    return res.status(400).json({ success: false, message: 'Invalid email format'});
}
if(!password) {
    return res.status(400).json({ success: false, message: 'password is required'});
}
if(password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password should be at least 6 characters long'});
}

//check if email already exists
const userExists = await User.findOne({ email });
if(userExists) {
    return res.status(400).json({ success: false, message: 'Email already exists'});
}

//create new user

if(!firstName || !lastName || !email || !password){
    return res.status(400).json({ success: false, message: 'All fields are required'} )
}
    



// hashing user's password
const hashedPassword = await hashPassword(password);


//create a new user
const user = new User({
    firstName, 
    lastName,
     userName,
      email, 
      password: hashedPassword,
    });


//save the user to the database
await user.save();

// Generate a token
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

// send response

       // Send response
    return res.json({ success: true, message: "Registration successful", user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.userName,
        email: user.email,
        role: user.role,
        token
    }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Registration failed", error: err });
  }
};




// Login

export const login = async (req, res) => {
    try { 
        const { userName, password } = req.body;

        // Check if username is provided
        if (!userName) {
            return res.status(400).json({ success: false, message: 'Username is required' });
        }

        // Check if password is provided
        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        // Find user by username
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        

        // Now, use your imported comparePassword function to verify the password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send response with user details and token
        return res.json({
            success: true,
            message: "Login successful",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.userName,
                email: user.email,
                role: user.role,
                token
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Login failed', error: err });
    }
};

// forgetpasssword
// reset password
// socialAuth e.g googleAuth

// export const login = async (req, res) => {
//     try{
//         const { userName, password, } = req.body;
//         // console.log(req.body);
//         if(!userName){
//             return res.status(400).json({ success: false, message: 'User name is required'});
//         }
//         //check if user already exists
//         const userNameTaken = await User.findOne({ userName });
//         if(userNameTaken) {
//             return res.status(400).json({ success: false, message: `Username "$ {username}" already exists`});
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: "Login failed", error: err });
//       }
//     };
    


// export const login = async (req, res) => {
//     try{
//         return res.json({success: true, message: 'login successful'});   
//     } catch(err){
//     res.staus (500).json({ success: false, message: "server error"});   
// }
// };




