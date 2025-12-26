export interface Article {
    id: number;
    title: string;
    summary: string;
    content: string[]; // 每个元素是一段话
    category: string;
    readingTime: string;
    featured: boolean; // 是否用在上面那排大卡片
}

export const mockArticles: Article[] = [
    {
        id: 1,
        title: 'Eat a balanced, colorful diet',
        summary:
            'How to fill your plate with fruits, vegetables, whole grains and lean protein every day.',
        content: [
            'A balanced plate usually includes half vegetables or fruit, one quarter whole grains like brown rice or wholemeal bread, and one quarter protein such as fish, beans or lean meat. This mix provides energy, fibre and important vitamins.',
            'Try to “eat the rainbow” across the week. Different colors often mean different nutrients. For example, orange foods like carrots contain beta-carotene, while dark green vegetables provide iron and folate.',
            'Limit ultra-processed foods that are high in added sugar, salt and saturated fats. You do not need a perfect diet every day – focus on small changes that you can keep doing in daily life.',
        ],
        category: 'Nutrition',
        readingTime: '5 min read',
        featured: true,
    },
    {
        id: 2,
        title: 'Build healthy sleep habits',
        summary:
            'Simple steps to fall asleep easier and wake up rested, even on busy days.',
        content: [
            'Most adults need around 7–9 hours of sleep each night. Going to bed and waking up at roughly the same time, even on weekends, helps your body clock stay steady.',
            'Create a short wind-down routine 30–60 minutes before bed: dim the lights, avoid bright screens, read something relaxing or stretch gently. Caffeine, heavy meals and intense exercise close to bedtime can make it harder to fall asleep.',
            'If you cannot sleep, lying in bed and worrying often makes things worse. Get up for a few minutes, do something calming in low light, then return to bed when you feel sleepy again.',
        ],
        category: 'Sleep',
        readingTime: '4 min read',
        featured: true,
    },
    {
        id: 3,
        title: 'Move more in your daily routine',
        summary:
            'Ideas to add light activity and stretching throughout the day to protect your heart.',
        content: [
            'You do not need a gym membership to protect your heart. Short “movement snacks” during the day – like walking while talking on the phone, taking the stairs, or doing simple stretches – all add up.',
            'Aim for at least 150 minutes of moderate activity per week, such as brisk walking or cycling. If this sounds too much, start with 5–10 minutes at a time and slowly increase.',
            'If you sit for long periods, try to stand up and move every 30–60 minutes. Even 1–2 minutes of walking can reduce stiffness and improve blood flow.',
        ],
        category: 'Heart health',
        readingTime: '4 min read',
        featured: true,
    },
    {
        id: 4,
        title: 'Understanding your blood test results in simple terms',
        summary:
            'What common markers like cholesterol, blood sugar and liver enzymes usually mean for your health.',
        content: [
            'Blood tests measure substances in your blood such as glucose, cholesterol and different enzymes. The report usually shows a number and a “reference range”. Being slightly outside the range does not always mean something is wrong – your doctor looks at the whole picture.',
            'For example, high LDL (“bad”) cholesterol and low HDL (“good”) cholesterol can increase your risk of heart disease. High fasting blood sugar may suggest pre-diabetes or diabetes, especially if repeated tests show the same pattern.',
            'If you do not understand your report, you can ask your doctor or nurse to explain each important result in simple language. It can help to write down your questions before the appointment.',
        ],
        category: 'Lab results',
        readingTime: '6 min read',
        featured: false,
    },
    {
        id: 5,
        title: '5 daily habits to protect your heart',
        summary:
            'Small changes in movement, diet and stress management that lower your heart disease risk.',
        content: [
            'Heart-protecting habits include not smoking, moving more, eating less salt, choosing healthier fats and managing stress. You do not need to change everything at once.',
            'Start with one or two realistic goals, such as walking 15 minutes a day or cooking at home three nights per week. Once these feel easier, you can add another habit.',
            'Regular blood pressure and cholesterol checks help you see how lifestyle changes and medicines are working together to protect your heart in the long term.',
        ],
        category: 'Heart health',
        readingTime: '5 min read',
        featured: false,
    },
    {
        id: 6,
        title: 'How stress affects your body and mind',
        summary:
            'Why long-term stress can change sleep, digestion, memory and mood, and what you can do about it.',
        content: [
            'Short bursts of stress can be useful – they help you focus and react quickly. But when stress continues for weeks or months, it can disturb sleep, digestion, blood pressure and mood.',
            'Common signs of long-term stress include feeling tired but wired, difficulty concentrating, headaches, stomach problems and being more irritable than usual.',
            'Simple steps such as regular movement, slow breathing, talking to someone you trust and setting small boundaries (like not checking work messages late at night) can all reduce stress load over time.',
        ],
        category: 'Mental health',
        readingTime: '6 min read',
        featured: false,
    },
];
