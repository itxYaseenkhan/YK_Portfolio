
import { User } from "../../models/UserSchema.js";

export const createDefault= async () => {
  try {
    const email = "yaseenraheemgul@gmail.com";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Default user already exists");
      return;
    }

    await User.create({
      fullName: "YaseenKhan",
      email,
      Phone: "03000000000",
      AboutMe: "Full Stack Developer",
      Password: "19July2004@",

      portfolioURL: "https://example.com",

      typewriterText: [
        "Full Stack Developer",
        "Web Developer",
      ],

      avatar: {
        public_id: "default_avatar",
        url: "https://placehold.co/200x200",
      },

      resume: {
        public_id: "default_resume",
        url: "https://example.com/resume.pdf",
      },
    });

    console.log("Default user created successfully");

  } catch (error) {
    console.error("Default user error:", error.message);
  }
};
