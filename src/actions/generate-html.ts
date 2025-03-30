
// import prisma from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai'
// import { getServerSession } from 'next-auth';

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}
const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });




// Function to generate a portfolio using AI
export async function generateHTML(resumeText: string) {
  // const session = await getServerSession();

  // console.log("SESION", session);


  // if(!session?.user?.email){
  //   return null;
  // }

  console.log("GEMINI_API_KEY", process.env.GEMINI_API_KEY);
  try {
    // AI Prompt - Generate Full HTML Portfolio
    const prompt = `You are an expert front-end developer specializing in creating pixel-perfect, responsive websites with Tailwind CSS. make sure not to include any other text or description about generation just provide html and tailwind code Create a professional portfolio website based on the following resume:

    """${resumeText}"""
    
    CRITICAL REQUIREMENTS:
    - ALWAYS ensure text has sufficient contrast against its background (NEVER use white/light text on light backgrounds or dark text on dark backgrounds)
    - ALWAYS include viewport meta tag for responsiveness
    - ALWAYS use a mobile-first approach with responsive classes
    - ALWAYS include proper HTML5 semantic elements (header, nav, main, section, footer)
    - ALWAYS include proper aria-labels for accessibility
    
    COLOR SYSTEM:
    - Use a simple black and white color scheme
    - Text: #000000 (black) on light backgrounds, #FFFFFF (white) on dark backgrounds
    - Backgrounds: #FFFFFF (white) for light sections, #000000 (black) for dark sections
    - Accents: Use grayscale colors (#F3F4F6, #E5E7EB, #D1D5DB, #9CA3AF, #6B7280, #4B5563, #374151)
    - NO colored elements (no blues, indigos, violets, etc.)
    
    LAYOUT STRUCTURE:
    1. NAVBAR (height: 4rem) fixed at top:
        <header class="fixed w-full bg-white/80 dark:bg-black/90 backdrop-blur-md z-50 shadow-sm">
          <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <!-- Logo -->
            <div>
              <a href="#" class="text-xl font-bold text-black dark:text-white">[Your Name]</a>
            </div>
    
            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-8">
              <a href="#home" class="text-gray-800 dark:text-gray-100 hover:text-black dark:hover:text-white transition">Home</a>
              <!-- Other nav items -->
            </nav>
    
            <!-- Mobile Navigation Toggle -->
            <button class="md:hidden">
              <!-- Hamburger icon -->
            </button>
          </div>
    
          <!-- Mobile Navigation Menu (hidden by default) -->
          <div class="md:hidden hidden">
            <!-- Mobile nav items -->
          </div>
        </header>
    
    2. HERO SECTION (height: 100vh):
    <section id="home" class="min-h-screen pt-20 flex items-center bg-white dark:bg-black">
      <div class="container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <!-- Text Content (3/5 width on desktop) -->
          <div class="lg:col-span-3 space-y-6">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white">
              <span class="block">Hi, I'm [Name]</span>
              <span class="block mt-2">[Profession]</span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              [Brief compelling introduction, 1-2 sentences]
            </p>
            <div class="flex flex-wrap gap-4 pt-4">
              <a href="#contact" class="px-6 py-3 bg-black text-white rounded-lg transition transform hover:scale-95 shadow-lg">
                Get in Touch
              </a>
              <a href="#projects" class="px-6 py-3 border border-black text-black dark:border-white dark:text-white  rounded-lg transition transform hover:scale-95">
                View Projects
              </a>
            </div>
          </div>
          
          <!-- Image/Visual (2/5 width on desktop) -->
          <div class="lg:col-span-2 flex justify-center">
            <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
              <img src="[your-image-url]" alt="[Your Name]" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    3. ABOUT SECTION (min-height: 100vh):
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Bio Section */}
        <div className="mb-20 max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed mb-6 text-gray-600 dark:text-gray-400">
            [Detailed professional bio paragraph] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum. Cras porttitor metus in enim tincidunt, nec facilisis nulla
            tincidunt.
          </p>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            [Second paragraph about approach/philosophy] Praesent commodo cursus magna, vel scelerisque nisl consectetur
            et. Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum.
          </p>
        </div>

        {/* Experience Section */}
        <div className="mb-20">
          <div className="flex items-center mb-10">
            <Briefcase className="h-8 w-8 text-primary mr-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h3>
          </div>

          <div className="space-y-12">
            {/* Experience Item */}
            <div className="flex">
              <div className="hidden md:block w-1/5 pr-8 text-right">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">2020 - Present</span>
              </div>
              <div className="relative w-full md:w-4/5 pl-8 border-l-2 border-primary">
                <span className="inline-block md:hidden text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  2020 - Present
                </span>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">[Job Title]</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-3">[Company]</p>
                <p className="text-gray-700 dark:text-gray-300">
                  [Brief description] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio
                  vitae vestibulum vestibulum.
                </p>
              </div>
            </div>

            {/* Experience Item */}
            <div className="flex">
              <div className="hidden md:block w-1/5 pr-8 text-right">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">2018 - 2020</span>
              </div>
              <div className="relative w-full md:w-4/5 pl-8 border-l-2 border-primary">
                <span className="inline-block md:hidden text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  2018 - 2020
                </span>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">[Previous Job Title]</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-3">[Previous Company]</p>
                <p className="text-gray-700 dark:text-gray-300">
                  [Brief description] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio
                  vitae vestibulum vestibulum.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center mb-8">
              <GraduationCap className="h-8 w-8 text-primary mr-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">[Degree]</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">[University] | [Year]</p>
              <p className="text-gray-700 dark:text-gray-300">
                [Brief description or achievements] Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center mb-8">
              <Award className="h-8 w-8 text-primary mr-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap gap-3">
               <!-- Skill Tag -->
                <span class="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full text-sm font-medium">
                  [Skill 1]
                </span>
                <!-- Repeat for other skills -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    4. PROJECTS SECTION (min-height: 100vh) WITH BENTO GRID:
    <section id="projects" class="min-h-screen py-20 bg-white dark:bg-black">
      <div class="container mx-auto px-4 py-16">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-black dark:text-white">
          My <span class="text-gray-700 dark:text-gray-300">Projects</span>
        </h2>
        
        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Featured Project (spans 2 columns on desktop) -->
          <div class="md:col-span-2 lg:col-span-2 group">
            <div class="h-full overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div class="relative h-64 overflow-hidden">
                <img src="[project-image]" alt="[Project Name]" class="w-full z-30 h-full object-cover transition duration-500 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">
                  <div class="p-4">
                    <div class="flex gap-3">
                      <a href="#" class="px-3 py-1 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition">Live Demo</a>
                      <a href="#" class="px-3 py-1 bg-gray-700 text-white rounded-full text-sm hover:bg-gray-600 transition">GitHub</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">[Project Name]</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">[Project description - keep it concise but informative]</p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-xs">
                    [Technology 1]
                  </span>
                  <!-- Repeat for other technologies -->
                </div>
              </div>
            </div>
          </div>
          
          <!-- Regular Project Cards -->
          <div class="group">
            <div class="h-full overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <!-- Same structure as featured project but different content -->
            </div>
          </div>
          
          <!-- Repeat for other projects -->
        </div>
      </div>
    </section>
    
    5. CONTACT SECTION (min-height: 100vh):
    <section id="contact" class="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4 py-16">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-black dark:text-white">
          Get In <span class="text-gray-700 dark:text-gray-300">Touch</span>
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-semibold text-black dark:text-white mb-6">Send Me a Message</h3>
            <form class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input type="text" id="name" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition" />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" id="email" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition" />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea id="message" rows="5" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition"></textarea>
              </div>
              
              <button type="submit" class="w-full px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg transition transform hover:scale-105 shadow-lg">
                Send Message
              </button>
            </form>
          </div>
          
          <!-- Contact Information -->
          <div class="flex flex-col justify-center">
            <h3 class="text-2xl font-semibold text-black dark:text-white mb-6">Contact Information</h3>
            
            <div class="space-y-6">
              <!-- Email -->
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <!-- Email icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-medium text-black dark:text-white">Email</h4>
                  <a href="mailto:[your-email]" class="text-gray-700 dark:text-gray-300 hover:underline">[your-email]</a>
                </div>
              </div>
              
              <!-- Location -->
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <!-- Location icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-medium text-black dark:text-white">Location</h4>
                  <p class="text-gray-600 dark:text-gray-400">[Your Location]</p>
                </div>
              </div>
              
              <!-- Social Media -->
              <div class="pt-6">
                <h4 class="text-lg font-medium text-black dark:text-white mb-4">Connect With Me</h4>
                <div class="flex space-x-4">
                  <!-- LinkedIn -->
                  <a href="#" class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                    <!-- LinkedIn icon -->
                  </a>
                  
                  <!-- GitHub -->
                  <a href="#" class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                    <!-- GitHub icon -->
                  </a>
                  
                  <!-- Twitter/X -->
                  <a href="#" class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                    <!-- Twitter icon -->
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    6. FOOTER:
    <footer class="bg-black text-white py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6 md:mb-0">
            <a href="#" class="text-2xl font-bold text-white">
              <span class="text-gray-400">[Your Name]</span>
            </a>
            <p class="mt-2 text-gray-400">[Your Tagline]</p>
          </div>
          
          <div class="flex flex-col items-center md:items-end">
            <p class="text-gray-400">© {new Date().getFullYear()} [Your Name]. All rights reserved.</p>
            <p class="mt-2 text-gray-500">Made with ❤️ and Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
    `

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
