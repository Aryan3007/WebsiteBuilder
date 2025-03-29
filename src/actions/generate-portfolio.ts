import { generateHTML } from "./generate-html";

export async function generatePortfolio(resumeText: string)  {

  try {
    if (!resumeText) {
      return { error: "Resume text is required." };
    }

    console.log("Generating portfolio for received resume text...");

    const portfolioHTML = await generateHTML(resumeText);

    return {
      success: true,
      portfolio: portfolioHTML,
    }
  } catch (error) {
    console.log(error);
    return { error: "Failed to generate portfolio." };
  }

}