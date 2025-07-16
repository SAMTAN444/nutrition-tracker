# Wellife: Personal Nutrition Tracker

Wellife is a full-stack nutrition tracking web application designed to help users monitor their daily food intake, visualize macro and calorie trends, calculate BMI, and receive AI-generated feedback on dietary habits. Built using React, Tailwind CSS, Express, MongoDB, and Nutritionix + Gemini AI APIs.

---

## Features

* **Daily Food Logging**: Input food by name, retrieve macros via Nutritionix, and save entries by date
* **Macro Summaries**: Displays protein, fat, sodium, and calorie totals for each day
* **Calorie Chart**: 14-day calorie trend line chart to visualize intake over time
* **BMI Calculator**: Animated BMI gauge with category labeling (e.g., underweight, normal, overweight)
* **AI Nutrition Analyzer**: Analyze your diet with personalized recommendations based on your goals, activity level, and macros using Gemini AI
* **Editable Food Entries**: Edit or delete saved entries directly from the dashboard
* **Secure Auth**: User registration and login with hashed passwords and JWT authentication

---

## Tech Stack

### Frontend

* React
* Tailwind CSS
* React Router DOM
* Axios
* Lucide React Icons
* SweetAlert2 for modal alerts

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT for authentication
* Nutritionix API for food data
* Gemini/OpenAI API for analysis

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wellife-nutrition-tracker.git
cd wellife-nutrition-tracker
```

### 2. Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Environment variables

Create a `.env` file in the `/backend` directory:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
NUTRITIONIX_APP_ID=your_nutritionix_app_id
NUTRITIONIX_API_KEY=your_nutritionix_api_key
OPENAI_API_KEY=your_openai_or_gemini_key
```

### 4. Run the project

```bash
# In one terminal
cd backend
npm run dev

# In another terminal
cd frontend
npm run dev
```

---

## Project Structure

```
frontend/
  components/
    Navbar.jsx
    FoodSummary.jsx
    BMICard.jsx
    CalorieChart.jsx
    FoodPreviewCard.jsx
    NutritionAnalyzer.jsx
  pages/
    Dashboard.jsx
  utils/
    axios.js

backend/
  models/
    FoodEntry.js
  routes/
    nutrition.js
    auth.js
    analyze.js
  middleware/
    authMiddleware.js
  index.js
```

---

## API Endpoints

### Nutrition

* `POST /api/nutrition` – Add food
* `GET /api/nutrition` – Get foods by date
* `PATCH /api/nutrition/:id` – Edit food
* `DELETE /api/nutrition/:id` – Delete food

### Analyze

* `POST /api/analyze` – Submit daily macros for AI analysis

### Auth

* `POST /api/auth/register` – Create account
* `POST /api/auth/login` – Login and receive token

---

## Author

Built by SAMTAN444.
Feel free to fork, clone, and improve!
