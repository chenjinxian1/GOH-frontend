# Guardians of Health 🛡️

**Guardians of Health** is a comprehensive, modern web application designed to provide accessible health education, disease information, and AI-powered assistance. Built with React, TypeScript, and Firebase, it serves as a reliable hub for medical knowledge and data visualization.

![Project Banner](public/banner-placeholder.png) 
## 🌟 Key Features

### 1. 🧠 AI Health Assistant
- An intelligent chatbot interface that provides immediate responses to health-related queries.
- Powered by advanced AI models to assist users with general health advice.

### 2. 📚 Health Knowledge Central
- A curated collection of expert-reviewed articles.
- **Filtering System:** Users can filter articles by categories (General Health, Disease Prevention, Mental Health, Nutrition).
- **Responsive Grid Layout:** Beautiful card-based design with "Hero" images.

### 3. 🦠 Disease Information Encyclopedia
- **Comprehensive Database:** Detailed information on Infectious Diseases, Chronic Conditions, Genetic Disorders, and Viral Infections.
- **Smart Search & Filter:** Users can search by keywords or filter by specific medical categories.
- **Rich Content Display:** Full-width infographic support and Markdown rendering for detailed medical explanations.
- **Categorized Insights:** Distinct sections for symptoms, prevention, and treatment.

### 4. 📊 Data Visualization
- Interactive charts and graphs to visualize health trends and statistics.
- Helps users understand complex health data at a glance.

### 5. 🔐 User Authentication & Profile
- Secure Login and Registration system using Firebase Auth.
- Personalized Profile page for managing user data.

## 🛠️ Tech Stack

* **Frontend:** React 18, TypeScript, Vite
* **Styling:** CSS Modules, Responsive Design (Mobile-first approach)
* **Routing:** React Router DOM v6
* **Backend / Database:** Firebase (Firestore, Authentication)
* **Rendering:** React Markdown (for rich text content)
* **Icons & Assets:** SVG Icons, Custom Infographics

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/chenjinxian1/GOH-frontend.git](https://github.com/chenjinxian1/GOH-frontend.git)
    cd GOH-frontend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Firebase**
    * Create a file named `config.ts` (or `.env`) in your `src/firebase` folder.
    * Add your Firebase configuration keys:
    ```typescript
    // src/firebase/config.ts
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    export default firebaseConfig;
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open in Browser**
    Visit `http://localhost:5173` to view the app.

## 📂 Project Structure
