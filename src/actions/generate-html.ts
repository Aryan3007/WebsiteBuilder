
import prisma from '@/lib/prisma';
import {GoogleGenerativeAI} from '@google/generative-ai'
import { getServerSession } from 'next-auth';

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}
const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });




// Function to generate a portfolio using AI
export async function generateHTML(resumeText : string) {
  // const session = await getServerSession();

  // console.log("SESION", session);
  

  // if(!session?.user?.email){
  //   return null;
  // }

  console.log("GEMINI_API_KEY",process.env.GEMINI_API_KEY);
  try {
    // AI Prompt - Generate Full HTML Portfolio
    const prompt = `You are an AI web developer. Your task is to create a complete HTML5 + Tailwind CSS portfolio page based on the following resume details.
    Also, generate content if required (e.g., About section).

    Resume Content:
    """${resumeText}"""

    Requirements:
    - Create a professional, modern HTML + Tailwind CSS portfolio page.
    - Include a navbar with links (Home, About, Projects, Contact).
    - The hero section should have the user's name, profession, and a brief bio.
    - The projects section should list notable projects with descriptions and links.
    - Include a skills section listing relevant technical skills.
    - Add a contact section with email and LinkedIn/GitHub links.
    - Ensure mobile responsiveness and good UI/UX.
    - Use well-structured HTML and modern CSS.
    - Do NOT include JavaScript. Keep it simple.
    
    Return only the full HTML + Tailwind CSS code, without any extra explanations.`;

    console.log('Calling Gemini API...');

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text(); // Extract AI-generated HTML
    console.log("RESPONSED text", text);


    // const existinguser = await prisma.user.findUnique({
    //   where:{
    //     email: session?.user?.email
    //   }
    // })

    // if(!existinguser){
    //   return { message: "User not found"};
    // }

    // const html = await prisma.htmlFile.create({
    //   data: {
    //     file: text,
    //     user: { connect: { id: existinguser?.id } }
    //   }
    // })

    return text;
    
  } catch (error) {
    console.error("Error generating portfolio:", error);
    throw new Error("Failed to generate portfolio.");
  }
}

// API Route to generate portfolio
// app.post("/generate-portfolio", async (req, res) => {
//   try {
//     const { resumeText } = req.body;

//     if (!resumeText) {
//       return res.status(400).json({ error: "Resume text is required." });
//     }

//     console.log("Generating portfolio for received resume text...");

//     const portfolioHTML = await generatePortfolio(resumeText);

//     res.json({
//       success: true,
//       portfolio: portfolioHTML,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate portfolio." });
//   }
// });
