const User = require("../models/user");
const lib = require("../lib/user");
const Candidate = require("../models/candidates");

// Handle user signup
const handleSignup = async (req, res) => {
  const safeParseResult = lib.validateUserSignup(req.body);

  if (safeParseResult.error) {
    return res
      .status(400)
      .json({ status: "error", error: safeParseResult.error });
  }

  // Extract user data from the request body
  const { firstName, lastName, email, password } = safeParseResult.data;
  
  // Generate a hash and salt for the password
  try {
    const { hash: hashedPassword, salt } = lib.generatehash(password);

    const createUserResult = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    });

// Generate a JWT token for the user
    const token = lib.generateUserToken({
      _id: createUserResult._id.toString(),
      role: createUserResult.role,
    });

    return res.json({
      status: "success",
      data: { _id: createUserResult._id, token: token },
    });
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(400)
        .json({ message: `user with email ${email} already exists!` });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Handle user signin
const handleSignin = async (req, res) => {
  const safeParseResult = lib.validateUserSignin(req.body);

  if (safeParseResult.error) {
    return res
      .status(400)
      .json({ status: "error", error: safeParseResult.error });
  }
// Extract user data from the request body
  const { email, password } = safeParseResult.data;

  const userInDb = await User.findOne({ email });

// Check if the user exists
  if (!userInDb)
    return res
      .status(404)
      .json({ error: `user with email ${email} does not exist!` });

// Compare the password with the hashed password in the database
  const salt = userInDb.salt;
  const hashedPasswordDb = userInDb.password;

// Generate a hash for the password
  const { hash } = lib.generatehash(password, salt);

// Compare the hashed password with the hashed password in the database
  if (hash !== hashedPasswordDb)
    return res.status(400).json({ error: `Incorrect password` });

// Generate a JWT token for the user
  const token = lib.generateUserToken({
    _id: userInDb._id.toString(),
    role: userInDb.role,
  });

  return res.json({ status: "success", data: { token: token } });
};

// Handle candidate data
const handleCandidate = async (req, res) => {
  const safeParseResult = lib.validateCandidate(req.body);

  // Check if the request body is valid
  if (safeParseResult.error) {
    return res
      .status(400)
      .json({ status: "error", error: safeParseResult.error });
  }

  const {
    jobName,
    location,
    minSalary,
    maxSalary,
    minExperience,
    maxExperience,
  } = safeParseResult.data;

  // Create a new candidate
  try {
    const createCandidateResult = await Candidate.create({
      jobName,
      location,
      minSalary,
      maxSalary,
      minExperience,
      maxExperience,
    });

    // Return the created candidate
    return res.json({ status: "success", data: createCandidateResult });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all candidates
const getCandidates = async (req, res) => {
  try {
    // Fetch all candidates from the database
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get user profile data
const handleUserProfile = async (req, res) => {
  const user = req.user;
  if(!user){
      return res.status(401).json({message: 'Unauthorized'})
  }
  const userInDb = await User.findById(user._id);
  return res.json({
   profile:{
       firstName: userInDb.firstName,
       lastName: userInDb.lastName,
       email: userInDb.email,
       role: userInDb.role
   }
  })
}

module.exports = {
  handleSignup,
  handleSignin,
  handleCandidate,
  getCandidates,
  handleUserProfile,
};
