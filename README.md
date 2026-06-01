# 👨‍👩‍👧‍👦 Family Tracker (In Progress)

Welcome! This is a **small family tracker website** currently under active development. The goal of this application is to track and visualize the countries visited by family members on an interactive map.

---

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (`pg` database client)
* **Frontend:** EJS (Embedded JavaScript), CSS
* **Security:** `dotenv` for securing credentials

---

## 🚀 Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone <your-repository-url>
   cd family-tracker
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Your Environment Variables:**
   * Copy the template file:
     ```bash
     cp .env.example .env
     ```
   * Open the new `.env` file and replace the placeholders with your local PostgreSQL username, password, port, and database name.

4. **Prepare the Database:**
   * Create a PostgreSQL database called `world`.
   * Create a table called `visited_countries`:
     ```sql
     CREATE TABLE visited_countries (
       id SERIAL PRIMARY KEY,
       country_code CHAR(2) NOT NULL UNIQUE
     );
     ```

5. **Start the Development Server:**
   ```bash
   node index.js
   ```
   Open `http://localhost:3000` in your web browser.

---

## 🔄 Current Project Status
* [x] Express & EJS engine setup
* [x] Secure environment configuration (`.env` integration)
* [x] Basic home page map rendering from DB
* [ ] Family user switching functionality (In Progress 🚧)
* [ ] Ability to dynamically add new visited countries (In Progress 🚧)
