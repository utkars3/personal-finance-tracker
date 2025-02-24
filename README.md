# Next.js Budget Tracker

## Overview
This project is a **transaction tracking and budgeting application** built with **Next.js, React, shadcn/ui, Recharts, and MongoDB**. It allows users to track their expenses, categorize transactions, visualize spending with charts, and set budgets.

## Features

### **Common Features**
✅ Built with **Next.js, React, shadcn/ui, Recharts, and MongoDB**  
✅ Responsive design with proper error handling and validation  
✅ Interactive and dynamic UI for a seamless experience  

---

### **Stage 1: Basic Transaction Tracking**
✔ Add, Edit, and Delete transactions (amount, date, description)  
✔ View a list of transactions  
✔ Monthly expenses bar chart using **Recharts**  
✔ Form validation for required fields  

---

### **Stage 2: Categories**
✔ **All Stage 1 features** +  
✔ Predefined **categories** for transactions (Food, Transport, Shopping, etc.)  
✔ **Category-wise pie chart** for better visualization  
✔ **Dashboard with summary cards**:
   - Total expenses
   - Category breakdown
   - Most recent transactions

---

### **Stage 3: Budgeting**
✔ **All Stage 2 features** +  
✔ Ability to **set monthly category budgets**  
✔ **Budget vs Actual comparison chart** to track overspending  
✔ Simple spending insights for financial awareness  

---

## **Tech Stack**
- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
- **Charts & UI:** Recharts, shadcn/ui components
- **Database:** MongoDB for storing transactions and budgets
- **State Management:** React state & context API
- **Backend API:** Next.js API routes for data fetching

---

## **Getting Started**
### 1️⃣ **Clone the repository**
```sh
git clone https://github.com/your-username/nextjs-budget-tracker.git
cd nextjs-budget-tracker
```

### 2️⃣ **Install dependencies**
```sh
npm install  # or yarn install
```

### 3️⃣ **Setup Environment Variables**
Create a `.env.local` file and add:
```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4️⃣ **Run the application**
```sh
npm run dev  # or yarn dev
```

---

## **Contributing**
Contributions are welcome! Feel free to fork the repo, make changes, and submit a pull request.

---

## **License**
This project is licensed under the **MIT License**.

