import OpenAI from "openai";
import Resolver from '@forge/resolver';

const openai = new OpenAI({
    apiKey: 'sk-proj-bbBlXCgqSi9d0NmAmFhPT3BlbkFJP87tEphdO03MFBPNUgcX' // Make sure to replace with your actual API key
});

const resolver = new Resolver();

resolver.define('getText', async (req) => {
    const inputDescription = req.payload.inputDescription;
    const prompt = `
    Given the following charities and their descriptions:

    1. The American India Foundation (AIF) is committed to improving the lives of India's underprivileged, with a special focus on women, children and youth.
    2. The British Asian Trust wants to see a South Asia that is prospering and fair for all.
    3. CareerVillage is a community where students can get free personalized career advice from real-life professionals.
    4. Code.org aims to allow hundreds of millions of students to learn computer science worldwide.
    5. Co-Impact is a global philanthropic collaborative for large-scale systems change that brings funders together to support locally-rooted coalitions working to transform health, education, and economic systems for millions of people across the Global South.
    6. Educate! prepares young people in Africa with the skills to succeed in today's economy.
    7. Education Outcomes Fund: Focuses on sustainable agricultural practices.
    8. FORTE stands for Financing Of Return To Employment.
    9. Humanitix disrupts the global ticketing industry with a platform that redirects ticket fees to donate 100% of profit to education programs.
    10. The Raspberry Pi Foundation works to put the power of computing and digital creation into the hands of young people all over the world.
    11. Room to Read is creating a world free from illiteracy and gender inequality.
    12. Ruangguru provides equal access to quality, technology-enabled education to all learners in Indonesia.
    13. Schools2030 is a 10-year participatory learning improvement program based in 1,000 government schools across 10 countries.
    14. Teach For All is a global network with locally-led partner organizations that recruits and develops future leaders to teach in their nation's under-resourced schools.
    15. The Education Commission is helping to create a pathway for reform and increased investment in education by mobilizing strong evidence and analysis while engaging with world leaders, policymakers, and researchers.
    16. UPchieve provides students from low-income communities access to academic support with free tutoring and college counseling on their online platform.

    Which charity's description best matches the following input description?

    Input Description: "${inputDescription}"

    Please provide the index of the best matching charity.
    `;

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4",
    });


    let out = completion.choices[0].message.content
    console.log(out);
    return out;
});

export const handler = resolver.getDefinitions();
