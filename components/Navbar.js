export default function Navbar({ setActiveTab }) {
    return (
        <nav className="bg-blue-600 p-4 text-white w-full flex flex-wrap justify-center gap-2">
        <button onClick={() => setActiveTab("dashboard")} className="px-4 py-2 hover:bg-blue-700 rounded">
          Dashboard
        </button>
        <button onClick={() => setActiveTab("form")} className="px-4 py-2 hover:bg-blue-700 rounded">
          Add Transaction
        </button>
        <button onClick={() => setActiveTab("list")} className="px-4 py-2 hover:bg-blue-700 rounded">
          Transaction List
        </button>
        <button onClick={() => setActiveTab("chart")} className="px-4 py-2 hover:bg-blue-700 rounded">
          Expense Chart
        </button>
        <button onClick={() => setActiveTab("monthly budget")} className="px-4 py-2 hover:bg-blue-700 rounded">
          Monthly Expense
        </button>
      </nav>
      
    );
  }
  