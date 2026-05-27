export interface LocalContentItem {
    id: string;
    title: string;
    summary: string;
    content: string;
    category: string;
    readTime: string;
    publishDate: string;
    imageUrl?: string;
    keywords: string[];
}

export const localArticles: LocalContentItem[] = [
    {
        id: "balanced-plate-basics",
        title: "Building a Balanced Plate",
        summary: "A practical guide to combining vegetables, whole grains, protein, and healthy fats at everyday meals.",
        category: "Nutrition",
        readTime: "5 min read",
        publishDate: "2026-05-01",
        imageUrl: "/content-images/balanced-plate.jpg",
        keywords: ["nutrition", "healthy eating", "meal planning"],
        content: `## Why balance matters

A balanced meal gives your body steady energy, fiber, vitamins, minerals, and protein for repair. A simple model is half vegetables or fruit, one quarter whole grains, and one quarter protein.

## What to include

- Vegetables or fruit in different colors
- Whole grains such as oats, brown rice, or wholemeal bread
- Protein such as beans, eggs, fish, tofu, poultry, or lean meat
- Small amounts of healthy fats from nuts, seeds, olive oil, or avocado

## Small steps

You do not need a perfect diet to improve your health. Start with one change, such as adding a vegetable to lunch or replacing a sugary drink with water most days.`
    },
    {
        id: "sleep-routine-reset",
        title: "How to Reset Your Sleep Routine",
        summary: "Simple habits that support better sleep quality, especially when your schedule has become irregular.",
        category: "General Health",
        readTime: "4 min read",
        publishDate: "2026-04-24",
        imageUrl: "/content-images/sleep-routine.jpg",
        keywords: ["sleep", "routine", "wellbeing"],
        content: `## Keep a steady rhythm

Going to bed and waking up at similar times helps your body clock stay predictable. Even a 30-minute improvement can make mornings easier.

## Create a wind-down period

For the last 30 to 60 minutes before bed, reduce bright screens, avoid heavy meals, and choose calmer activities such as reading, light stretching, or quiet music.

## When sleep does not come

If you cannot fall asleep after a while, get out of bed briefly and do something calm in dim light. Return when you feel sleepy.`
    },
    {
        id: "stress-body-signals",
        title: "How Stress Shows Up in the Body",
        summary: "Learn common physical and emotional signs of long-term stress and what can help reduce the load.",
        category: "Mental Health",
        readTime: "6 min read",
        publishDate: "2026-04-15",
        imageUrl: "/content-images/stress-signals.jpg",
        keywords: ["stress", "mental health", "self-care"],
        content: `## Stress is not only emotional

Long-term stress can affect sleep, digestion, concentration, headaches, muscle tension, and mood. People may also feel tired but unable to relax.

## Useful responses

Short breathing exercises, regular movement, social support, and clearer boundaries can all reduce stress load. The most useful strategy is usually the one you can repeat consistently.

## When to seek help

If stress affects daily life, relationships, sleep, or safety, it is worth speaking with a health professional or counselor.`
    },
    {
        id: "blood-pressure-basics",
        title: "Understanding Blood Pressure Numbers",
        summary: "What systolic and diastolic numbers mean, and why repeated measurements matter.",
        category: "Disease Prevention",
        readTime: "5 min read",
        publishDate: "2026-03-28",
        imageUrl: "/content-images/blood-pressure.jpg",
        keywords: ["blood pressure", "heart health", "screening"],
        content: `## The two numbers

Blood pressure is written as two numbers. The top number is systolic pressure, when the heart pumps. The bottom number is diastolic pressure, when the heart rests between beats.

## One reading is not the whole story

Blood pressure changes with stress, caffeine, exercise, pain, and time of day. Doctors usually look for repeated patterns before diagnosing high blood pressure.

## What helps

Lower salt intake, regular activity, healthy weight, not smoking, limiting alcohol, and prescribed medicine can all help control blood pressure.`
    },
    {
        id: "hand-hygiene-infections",
        title: "Hand Hygiene and Infection Prevention",
        summary: "Why regular hand washing remains one of the simplest ways to reduce everyday infection risk.",
        category: "Disease Prevention",
        readTime: "3 min read",
        publishDate: "2026-03-12",
        imageUrl: "/content-images/hand-hygiene.jpg",
        keywords: ["infection prevention", "hand washing", "public health"],
        content: `## Why hands matter

Hands often carry germs from surfaces to the eyes, nose, mouth, food, and other people. Cleaning hands breaks this chain of transmission.

## When to wash

Wash before eating or preparing food, after using the toilet, after coughing or sneezing, after caring for someone sick, and after returning from public places.

## Soap or sanitizer

Soap and water are best when hands are visibly dirty. Alcohol-based sanitizer is useful when soap and water are not available.`
    },
    {
        id: "daily-movement-heart",
        title: "Daily Movement for Heart Health",
        summary: "Small movement habits that can support circulation, energy, and long-term heart health.",
        category: "General Health",
        readTime: "4 min read",
        publishDate: "2026-02-20",
        imageUrl: "/content-images/daily-movement.jpg",
        keywords: ["exercise", "heart health", "movement"],
        content: `## Movement adds up

You do not need to do all activity at once. Short walks, taking stairs, stretching breaks, and household chores can all contribute to better health.

## A realistic target

Many adults benefit from about 150 minutes of moderate activity per week. If that feels far away, start with 5 to 10 minutes and build gradually.

## Reduce sitting time

If you sit for long periods, try standing or walking briefly every 30 to 60 minutes. Small breaks can reduce stiffness and improve circulation.`
    }
];

export const localDiseases: LocalContentItem[] = [
    {
        id: "dengue-fever",
        title: "Dengue Fever",
        summary: "A mosquito-borne viral infection that can cause high fever, severe aches, rash, and in some cases serious complications.",
        category: "Infectious Diseases",
        readTime: "6 min read",
        publishDate: "2026-05-03",
        imageUrl: "/content-images/dengue-fever.jpg",
        keywords: ["dengue", "mosquito", "fever"],
        content: `## Overview

Dengue fever is caused by dengue viruses spread mainly by infected Aedes mosquitoes. It is more common in tropical and subtropical regions.

## Common symptoms

Symptoms may include high fever, severe headache, pain behind the eyes, muscle and joint pain, nausea, vomiting, swollen glands, and rash.

## Prevention

Reduce mosquito bites by using repellent, wearing long sleeves, installing screens, and removing standing water where mosquitoes breed.

## Care

There is no specific antiviral treatment for most cases. Rest, fluids, and medical monitoring are important. Avoid aspirin or ibuprofen unless a clinician says they are safe.`
    },
    {
        id: "type-2-diabetes",
        title: "Type 2 Diabetes",
        summary: "A long-term condition where the body has difficulty using insulin effectively, leading to high blood sugar.",
        category: "Chronic Conditions",
        readTime: "7 min read",
        publishDate: "2026-04-22",
        imageUrl: "/content-images/type-2-diabetes.jpg",
        keywords: ["diabetes", "blood sugar", "chronic disease"],
        content: `## Overview

Type 2 diabetes happens when the body becomes resistant to insulin or does not make enough insulin to keep blood sugar in a healthy range.

## Possible symptoms

Some people have no symptoms at first. Others may notice frequent urination, increased thirst, fatigue, blurred vision, slow-healing wounds, or frequent infections.

## Prevention and management

Healthy eating, regular movement, weight management, sleep, and not smoking can reduce risk and support control. Many people also need medication.

## Follow-up

Regular checks for blood sugar, blood pressure, cholesterol, eyes, kidneys, and feet help prevent complications.`
    },
    {
        id: "hypertension",
        title: "Hypertension",
        summary: "High blood pressure often has no symptoms but increases the risk of heart disease, stroke, and kidney problems.",
        category: "Chronic Conditions",
        readTime: "5 min read",
        publishDate: "2026-04-08",
        imageUrl: "/content-images/blood-pressure.jpg",
        keywords: ["hypertension", "blood pressure", "heart health"],
        content: `## Overview

Hypertension means blood pressure stays higher than expected over time. Many people feel normal, which is why screening matters.

## Risk factors

High salt intake, low physical activity, excess weight, smoking, alcohol, stress, age, family history, and kidney disease can all contribute.

## Prevention

Helpful habits include reducing salt, increasing activity, eating more fruits and vegetables, limiting alcohol, and avoiding tobacco.

## Treatment

Some people need medicines as well as lifestyle changes. Treatment decisions should be made with a qualified clinician.`
    },
    {
        id: "influenza",
        title: "Influenza",
        summary: "A contagious respiratory infection that often causes sudden fever, cough, body aches, and fatigue.",
        category: "Viral Infections",
        readTime: "4 min read",
        publishDate: "2026-03-25",
        imageUrl: "/content-images/influenza.png",
        keywords: ["flu", "influenza", "respiratory infection"],
        content: `## Overview

Influenza is caused by flu viruses that infect the nose, throat, and sometimes lungs. It can be more severe than a common cold.

## Symptoms

Flu often begins suddenly with fever, chills, cough, sore throat, runny nose, muscle aches, headache, and tiredness.

## Prevention

Annual flu vaccination, hand hygiene, masks in crowded settings, and staying home when sick can reduce spread.

## Care

Most people recover with rest and fluids. Antiviral medicines may help some high-risk patients if started early.`
    },
    {
        id: "asthma",
        title: "Asthma",
        summary: "A chronic airway condition that can cause wheezing, coughing, chest tightness, and shortness of breath.",
        category: "Chronic Conditions",
        readTime: "6 min read",
        publishDate: "2026-03-10",
        imageUrl: "/content-images/asthma.jpg",
        keywords: ["asthma", "breathing", "airways"],
        content: `## Overview

Asthma causes the airways to become inflamed and narrow, making breathing harder during flare-ups.

## Triggers

Common triggers include respiratory infections, dust, smoke, pollen, exercise, cold air, and some workplace exposures.

## Management

Asthma plans often include avoiding triggers, using reliever inhalers, and sometimes using daily controller medicine.

## Urgent signs

Seek urgent help if breathing is very difficult, lips or face look blue, speaking is hard, or reliever medicine is not helping.`
    },
    {
        id: "measles",
        title: "Measles",
        summary: "A highly contagious viral infection that can cause fever, cough, rash, and serious complications.",
        category: "Viral Infections",
        readTime: "5 min read",
        publishDate: "2026-02-18",
        imageUrl: "/content-images/measles.jpg",
        keywords: ["measles", "vaccination", "rash"],
        content: `## Overview

Measles spreads very easily through the air when an infected person coughs or sneezes.

## Symptoms

Early symptoms include fever, cough, runny nose, and red eyes, followed by a widespread rash.

## Prevention

Vaccination is the most effective prevention. High community vaccination coverage helps protect people who cannot be vaccinated.

## Complications

Measles can lead to ear infection, pneumonia, diarrhea, and rare but serious brain inflammation. Medical advice is important if measles is suspected.`
    }
];

export const findLocalContent = (collectionName: string, id: string) => {
    const source = collectionName === "Disease_Information" ? localDiseases : localArticles;
    return source.find((item) => item.id === id) || null;
};
