export interface Disease {
    id: number;
    name: string;
    overview: string;
    symptoms: string;
    causes: string;
    prevention: string;
    treatment: string;
}

export const mockDiseases: Disease[] = [
    {
        id: 1,
        name: 'Dengue Fever',
        overview:
            'A mosquito-borne viral infection common in tropical and subtropical regions. It can cause high fever, severe headache and joint pain.',
        symptoms:
            'High fever, severe headache (especially behind the eyes), muscle and joint pain, nausea, vomiting, skin rash.',
        causes:
            'Caused by dengue virus transmitted through the bite of infected Aedes mosquitoes, which breed in stagnant water.',
        prevention:
            'Avoid mosquito bites, use mosquito repellent, wear long sleeves, remove standing water around the home, use window screens.',
        treatment:
            'There is no specific antiviral treatment. Rest, fluids, and paracetamol for fever and pain. Avoid aspirin/ibuprofen unless advised by a doctor. Severe cases need hospital care.',
    },
    {
        id: 2,
        name: 'Type 2 Diabetes',
        overview:
            'A long-term condition where the body does not use insulin properly, causing blood sugar levels to stay too high.',
        symptoms:
            'Increased thirst, frequent urination, fatigue, blurred vision, slow-healing wounds, frequent infections.',
        causes:
            'Combination of lifestyle factors (diet, inactivity), overweight, family history, and age. The body becomes resistant to insulin.',
        prevention:
            'Maintain healthy weight, regular exercise, balanced diet low in added sugar, avoid smoking, regular health screening.',
        treatment:
            'Lifestyle changes (diet, activity), oral medications, and sometimes insulin. Regular monitoring of blood sugar and doctor follow-up.',
    },
    {
        id: 3,
        name: 'Hypertension (High Blood Pressure)',
        overview:
            'A condition where the force of blood against artery walls is consistently too high, increasing risk of heart disease and stroke.',
        symptoms:
            'Often no obvious symptoms. In severe cases: headaches, shortness of breath, nosebleeds, but these are not specific.',
        causes:
            'Unhealthy diet (high salt), lack of physical activity, obesity, stress, smoking, genetics, kidney disease.',
        prevention:
            'Limit salt intake, regular exercise, maintain healthy weight, avoid smoking, moderate alcohol, manage stress.',
        treatment:
            'Lifestyle changes plus medications such as ACE inhibitors, beta blockers, or calcium channel blockers as prescribed by a doctor.',
    },
    {
        id: 4,
        name: 'Influenza (Flu)',
        overview:
            'A common viral infection that attacks the nose, throat and lungs, usually more intense than a normal cold.',
        symptoms:
            'Sudden fever, chills, cough, sore throat, runny or stuffy nose, muscle aches, fatigue, headache.',
        causes:
            'Caused by influenza viruses spread by droplets when infected people cough, sneeze or talk.',
        prevention:
            'Yearly flu vaccination, hand washing, wearing masks in crowded places, staying home when sick.',
        treatment:
            'Rest, fluids, fever-reducing medicine. Antiviral drugs may be used in high-risk patients if started early.',
    },
];
