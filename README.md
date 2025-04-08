
---

# 🌤️ Weather App

Live Demo: [https://bitweather-rz0n.onrender.com](https://bitweather-rz0n.onrender.com)

A Node.js-based web application that displays real-time weather information using a third-party weather API. It also includes features like user authentication and database integration.

---

## 📦 Features

- Real-time weather updates by location
- User registration & authentication (JWT-based)
- Session management
- MongoDB integration
- Email notifications (if configured)
- Responsive UI for various screen sizes

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, Express Session
- **Templating**: EJS / Handlebars (depending on your setup)
- **API**: OpenWeatherMap or any weather API

---

## 🔧 Configuration

Create a `.env` file in the root directory and configure the following environment variables:

```env
API_KEY=your_weather_api_key_here
MONGO_URI=mongodb://localhost:27017/weatherDB
JWT_SECRET=your_secure_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
SESSION_SECRET=your_secure_session_secret
```

---

## 📥 Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/SabarishCodeWizard/whetherApp-nodeJS.git
   ```

2. **Navigate to the project directory**  
   ```bash
   cd whetherApp-nodeJS
   ```

3. **Install dependencies**  
   ```bash
   npm install
   ```

4. **Run the application**  
   ```bash
   npm start
   ```

5. **View in browser**  
   Open `http://localhost:3000` in your web browser.

---

## 📂 Folder Structure

```
weather-app/
│
├── models/             # Mongoose models
├── views/              # EJS templates or frontend files
├── public/             # Static assets (CSS, JS, images)
├── .env                # Environment variables
├── app.js              # Main application entry point
└── package.json        # Project metadata and dependencies
```

---

## 🛠️ Scripts

- `npm start`: Starts the server using Node
- `npm run dev`: Starts the server with nodemon (if configured)

---

## 🤝 Contributing

Contributions are welcome!  
To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request


---

## 📬 Contact

Developed by **Sabarish**  
GitHub: [@SabarishCodeWizard](https://github.com/SabarishCodeWizard)

