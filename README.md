# Task Organizer

## Demo
Please watch the demo video on the DevinciLearning deposit (too big to be uploaded here)

## Overview

Work Organizer is a simple and intuitive web application designed to help users manage their daily tasks effectively. It provides users with the tools to create, track, and organize their tasks in a user-friendly dashboard. The application includes a login system, a task management interface, a calendar for dated tasks, and a pie chart for task status visualization.

---

## Features

### 1. User Authentication
- **Login Page**: Allows registered users to log in to the application securely.
- **Signup Page**: Enables new users to create an account by filling in their details.

### 2. Dashboard
The dashboard is the central interface for managing tasks and personal information. It includes:
- **Nav Bar**:
  - A logout button to securely exit the session.
  - A button to access the **Profile Settings** page, where users can update their personal information.
  - A button to access the **Shared Tasks** page, where users can share specific task with collaborators.
- **Task Management**:
  - A form to create dated tasks (with a title, and due date).
  - All tasks are displayed below the form in a list view.
  - Each task comes with buttons to update its status: `To Do`, `In Progress`, or `Done`.
- **Calendar**:
  - Displays all tasks based on their due dates for a clear overview of deadlines.
- **Pie Chart**:
  - A dynamic pie chart visualizes the distribution of tasks based on their status (`To Do`, `In Progress`, or `Done`).

---

## Screenshots

### 1. Login Page
- A simple interface where users can enter their credentials to access their accounts.
![Sign-in](https://github.com/user-attachments/assets/815518c3-097e-4738-bcf1-53cc023e5d3d)

### 2. Signup Page
![Sign-up](https://github.com/user-attachments/assets/ec31a6d2-de8c-48f1-89eb-3364fd634726)

- A form for new users to create an account with fields such as username, email, and password.

### 3. Dashboard
![dashboard](https://github.com/user-attachments/assets/a9b48a0f-af3a-472a-b284-4625fcf93534)
- The main hub for managing tasks and personal settings.


#### Share Task
![ShareTasks](https://github.com/user-attachments/assets/c875c26e-0f69-4a25-ab1a-339dc5f893b8)
- A page where users can share tasks with collaborators

#### Task Management Section
![Task-Management](https://github.com/user-attachments/assets/6cbff2e3-c882-445b-b0f8-0b369d5278c0)

- A task creation form and a list of tasks with status options.

#### Calendar
![Calendar](https://github.com/user-attachments/assets/e0ba38be-4500-4675-8895-83c62735dd27)

- A calendar view highlighting all dated tasks.

#### Pie Chart
![Pie](https://github.com/user-attachments/assets/d116bfd5-112f-4454-8f8b-d869c78577b0)

- A graphical representation of task distribution by status.

#### Profile Settings
![Update-info](https://github.com/user-attachments/assets/07ba6ba5-900a-474d-9bac-81d8da65c986)

- A page where users can edit their personal details.

---

## User Guide

### 1. Getting Started
1. **Sign Up**:
   - Navigate to the Signup Page.
   - Fill in the required fields and click "Sign Up".
2. **Log In**:
   - Enter your credentials on the Login Page.
   - Click "Login" to access your Dashboard.

### 2. Using the Dashboard
- **Create a Task**:
  - Enter the task title, and due date in the task creation form.
  - Click "Add Task" to save it.
- **Update Task Status**:
  - Use the provided buttons (`To Do`, `In Progress`, or `Done`) to change the status of a task.
- **View Tasks on Calendar**:
  - Check the calendar for an overview of tasks based on their due dates.
- **Visualize Task Progress**:
  - Refer to the pie chart to see the proportion of tasks in each status category.

### 3. Managing Personal Information
- Click on the "Profile Settings" button in the nav bar.
- Update your details and save the changes.

### 4. Sharing Tasks
- Click on the Shared Tasks button in the nav bar.
- Fill the email and task fields.

### 5. Logging Out
- Use the "Logout" button in the nav bar to securely end your session.

---

## Technology Stack
- **Frontend**: [React.js, HTML, CSS, Bootsrap, Ts]
- **Backend**: [Node.js, Express.js]
- **Database**: [PostGreSql]
- **Libraries**: [Chart.js for the pie chart, FullCalendar for the calendar]

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) Installed on your system.
- [PostgreSQL](https://www.postgresql.org/download/) Installed and running.


### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/heloisermo/Work_Organizer
   cd Work_Organizer
   ```

2. **Install BackEnd dependencies:**
   ```bash
   cd Back
   npm install
   ```

3. **Configure the Database:**
   Here are the guidelines for PostgreSQL and PgAdmin4:
   - Create a database in PgAdmin4 and name it `work_organizer`.
   - Right-click on the database and select "Restore."
   - Select the file `work_organizer_backup` located in the root folder.
   - Make sure your database configuration matches the following:
     ```javascript
     user: 'postgres',
     password: '123',
     host: 'localhost',
     port: 5432,
     database: 'work_organizer'
     ```

4. **Run the BackEnd:**
   ```bash
   cd Back
   npm start
   ```

5. **Install FrontEnd dependencies:**
   ```bash
   cd ../Front
   npm install
   ```

6. **Run the FrontEnd:**
   ```bash
   npm start
   ```

7. **Navigate to localhost:**
   Open your browser and navigate to:
   [http://localhost:4200](http://localhost:4200)

