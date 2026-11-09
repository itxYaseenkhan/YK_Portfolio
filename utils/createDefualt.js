import { User } from "../models/UserSchema.js";

const createDefault = async () => {
  try {
    const email = "gul494419@gmail.com";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Default User Already Exists!");
      return;
    }

    await User.create({
      fullName: "Yaseen Khan",
      email: email,
      Phone: "03000000000",
      AboutMe: "Full Stack Developer",
      Password: "123456789@",

      portfolioURL: "https://example.com",
      githubUrl: "",
      instagramURL: "",
      linkedInURL: "",
      facebookURL: "",

      typewriterText: [
        "Full Stack Developer",
        "React Developer",
        "Node.js Developer"
      ],

      avatar: {
        public_id: "",
        url: ""
      },

      resume: {
        public_id: "",
        url: ""
      }
    });

    console.log("Default User Created Successfully!");

  } catch (error) {
    console.log("Default User Error:", error.message);
  }
};

export default createDefault;