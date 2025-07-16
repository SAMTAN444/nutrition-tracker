# Wellife: Personal Nutrition Tracker

Wellife is a full-stack nutrition tracking web app that empowers users to monitor their daily food intake, visualize macro and calorie trends, calculate BMI, and receive AI-generated dietary feedback. Built with React, Tailwind CSS, Express.js, MongoDB, and Nutritionix + Gemini AI APIs.

---

##  Features

- **Daily Food Logging**: Enter food by name and retrieve nutrition data using Nutritionix API.
- **Macro Summaries**: See daily totals for protein, fat, sodium, and calories.
- **Calorie Chart**: 14-day calorie trend visualization.
- **BMI Calculator**: Animated gauge showing real-time BMI with category labels.
- **AI Nutrition Analyzer**: Get personalized dietary analysis using Gemini AI.
- **Editable Entries**: Modify or delete saved food items.
- **Secure Auth**: Register/login with hashed passwords and JWT-based authentication.

---

## What I Learned

Throughout building this project, I learned how to:

- Structure a full-stack app using the **MERN** stack.
- Use **forward refs** and `useImperativeHandle()` in React to trigger child methods from the parent.
- Work with **external APIs** (Nutritionix, Gemini) and handle errors gracefully.
- Animate SVGs and build **interactive components** like the BMI gauge.
- Protect routes with **JWT authentication** and set up secure login flows.
- Improve user experience using **SweetAlert2 modals**.

---

## 📸 Screenshots

### Login & Register
| Login | Register |
|-------|----------|
| ![Login](./screenshots/login.png) | ![Register](./screenshots/register.png) |

### Dashboard Overview
| Top Section (Chart + Summary) | Bottom Section (BMI + AI) |
|-------------------------------|----------------------------|
| ![Dashboard](./screenshots/dashboard.png) | ![Dashboard2](./screenshots/dashboard2.png) |

### After Analysis / Interaction
| After BMI, Food Add & AI Analysis |
|----------------------------------|
| ![Function](./screenshots/function.png) |

---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- React Router DOM
- SweetAlert2
- Lucide React Icons

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- Nutritionix API
- Gemini / OpenAI API

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wellife-nutrition-tracker.git
cd wellife-nutrition-tracker

