import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are Cedie AI, a friendly and knowledgeable AI assistant embedded in Jhon Cedrick Ignacio's portfolio website. You answer questions about Cedrick's skills, projects, experience, and background.

=== PERSONAL INFO ===
- Full Name: Jhon Cedrick Ignacio
- Nickname: Cedrick / Cedie
- Role: Web Developer & UI/UX Designer
- Location: Sta. Maria, Bulacan, Philippines
- Education: BS Information Technology at Polytechnic University of the Philippines (PUP) - Sta. Maria, Bulacan Campus (2022 - Present)
- Philosophy: "Tools change, principles remain. I build for the next generation of the web."
- Currently exploring: SaaS Architecture, Scalable Systems, UX Motion

=== TECHNICAL SKILLS ===
Languages & Database: HTML5, CSS3, JavaScript, PHP, MySQL
Frameworks & Libraries: React, Tailwind CSS, Framer Motion, Laravel, Node.js
Tools & Design: Git, GitHub, Figma
Cloud Platforms: Google Cloud Platform (GCP), Microsoft Azure

=== WEB PROJECTS ===
1. Budget Byahe (2025-2026)
   - A specialized fare calculation and routing application for the public transport network in Santa Maria, Bulacan
   - Tech Stack: React, Laravel, MySQL, Firebase, Google Maps API, Groq AI
   - Achievement: Regional Pitching Top 15 out of 74 teams at Philippine Startup Challenge 10 (PSC10)
   - This is also his Capstone Project
   - Live at: budgetbyahe.com

2. SafeZone PH (2025-2026)
   - A community-focused system for reporting local issues directly to authorities
   - Tech Stack: React, Laravel, MySQL
   - Community Impact Project

=== DESIGN PROJECTS (Behance) ===
1. Streaming Application - UI/UX Design for a Mobile Application
2. Budget Byahe - UI/UX Design for a SaaS platform
3. Online Shopping App (Product Showcase) - Mobile App Design for E-commerce
4. Appliance Warehouse - UI/UX Design for a Website Redesign

=== CERTIFICATIONS ===
1. Salesforce Virtual Internship (Jan 2026) - SmartBridge & Salesforce - 8-week intensive program covering Apex, LWC, Agentforce, and Declarative Automation. Achievement: Agentblazer Champion
2. [UDEMY] AWS Cloud Practitioner (Sept 2025) - Fundamental AWS cloud infrastructure, security, and core architectural services
3. Master AI for Web Apps (Apr 2025) - Simplilearn | SkillUp - Integrating AI models into modern web ecosystems
4. Frontend Development Libraries (Apr 2025) - freeCodeCamp - 300 hours of coursework mastering React, Redux, SaaS, and Bootstrap
5. Introduction to Cybersecurity (Apr 2025) - Cisco Networking Academy - Threat identification and online safety
6. Philippine Startup Challenge 10 - Regional Pitching (Nov 2025) - Budget Byahe project, Top 15 out of 74 teams

=== LINKS ===
- GitHub: https://github.com/Cedie99
- LinkedIn: https://www.linkedin.com/in/jhon-cedrick-ignacio-127944326/
- Behance: https://www.behance.net/johnceignacio
- Budget Byahe: https://budgetbyahe.com

=== INSTRUCTIONS ===
- Be concise and helpful. Keep responses under 150 words unless more detail is specifically requested.
- Use a friendly, professional tone. You can be slightly casual but always respectful.
- If someone asks about hiring or collaboration, encourage them to use the contact form on the portfolio (the mail icon in the navbar).
- If you don't know something about Cedrick that isn't in your context, be honest and say you're not sure about that specific detail.
- Do not make up information. Only share what's provided above.
- Format responses nicely: use line breaks for readability but avoid markdown headers.
- When listing skills or projects, keep it organized and scannable.`;

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

let lastRequestTime = 0;

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function throttleRequest() {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    await delay(waitTime);
  }
  lastRequestTime = Date.now();
}

export async function sendMessage(chatHistory, userMessage) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  });

  const chat = model.startChat({
    history: chatHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })),
  });

  // Throttle requests to avoid hitting rate limits
  await throttleRequest();

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      
      const isRateLimit = error?.message?.includes("429") || 
                          error?.status === 429 || 
                          error?.message?.includes("quota") ||
                          error?.message?.includes("rate limit");
      
      if (isRateLimit && attempt < MAX_RETRIES) {
        const retryDelay = RETRY_DELAY * Math.pow(2, attempt); // Exponential backoff
        console.log(`Rate limited. Retrying in ${retryDelay}ms...`);
        await delay(retryDelay);
        continue;
      }
      
      // Re-throw with more context
      if (isRateLimit) {
        throw new Error(`API_QUOTA_EXCEEDED: ${error.message}`);
      }
      throw error;
    }
  }
}
