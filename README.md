# Guardians of Health 🛡️

**Guardians of Health** is a comprehensive, modern web application designed to provide accessible health education, disease information, and AI-powered assistance. Built with React, TypeScript, and Firebase, it serves as a reliable hub for medical knowledge and data visualization.

## 🌟 Key Features

### 1. 🧠 AI Health Assistant
- An intelligent chatbot interface that provides immediate responses to health-related queries.
- Powered by advanced AI models to assist users with general health advice.

### 2. 📚 Health Knowledge Central
- A curated collection of expert-reviewed articles.
- **Filtering System:** Users can filter articles by categories (General Health, Disease Prevention, Mental Health, Nutrition).
- **Responsive Grid Layout:** Beautiful card-based design with "Hero" images.

### 3. 🦠 Disease Information Encyclopedia
- **Comprehensive Database:** Detailed information on Infectious Diseases, Chronic Conditions, Genetic Disorders, Viral Infections, and more.
- **Smart Search & Filter:** Users can search by keywords or filter by specific medical categories using capsule-style buttons.
- **Rich Content Display:** Supports full-width images (infographics) and Markdown rendering for detailed medical explanations without cropping.

### 4. 📊 Data Visualization
- Interactive charts and graphs to visualize health trends and statistics.
- Helps users understand complex health data at a glance.

### 5. 🔐 User Authentication & Profile
- Secure Login and Registration system using Firebase Auth.
- Personalized Profile page for managing user data.

## 🛠️ Tech Stack

* **Frontend:** React 18, TypeScript, Vite
* **Styling:** CSS Modules / Standard CSS, Responsive Design (Mobile-first approach)
* **Routing:** React Router DOM v6
* **Backend / Database:** Firebase (Firestore, Authentication)
* **Rendering:** React Markdown (for rich text content in articles)
* **State Management:** React Hooks (useState, useEffect, useContext)

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
    * Add your Firebase configuration keys (make sure not to commit sensitive keys to public repos):
    ```typescript
    // src/firebase/config.ts example
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      // ... other config keys
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

```text
GOH-frontend/
├── public/                  # Static assets (favicon, manifest, etc.)
├── src/
│   ├── assets/              # Global images and styles
│   ├── components/          # Reusable UI components
│   │   ├── layout/          # Navbar, Footer
│   │   └── ...
│   ├── firebase/            # Firebase configuration (config.ts)
│   ├── pages/               # Application Routes/Pages
│   │   ├── AIAssistantPage.tsx    # AI Chatbot interface
│   │   ├── ArticleDetailPage.tsx  # Shared detail view for articles
│   │   ├── AuthPage.tsx           # Login/Register logic
│   │   ├── CreateArticlePage.tsx  # Admin content creation
│   │   ├── DataVizPage.tsx        # Data visualization charts
│   │   ├── DiseaseDetailPage.tsx  # Specific disease details
│   │   ├── DiseaseSearchPage.tsx  # Disease list & filters
│   │   ├── FeedbackPage.tsx       # User feedback form
│   │   ├── HealthSciencePage.tsx  # Health articles list
│   │   ├── HomePage.tsx           # Landing page
│   │   ├── LegalPage.tsx          # Legal notices
│   │   ├── NotFoundPage.tsx       # 404 Error page
│   │   ├── PrivacyPage.tsx        # Privacy policy
│   │   ├── ProfilePage.tsx        # User profile settings
│   │   └── ...
│   ├── App.tsx              # Main Routing configuration
│   ├── main.tsx             # Entry point
│   └── index.css            # Global CSS
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

Distributed under the MIT License.
