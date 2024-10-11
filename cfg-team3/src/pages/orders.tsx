import WithSubnavigation from "@/components/Navbar";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const slotNames = ["Breakfast", "Delivery", "Lunch"];

// Sample data to populate the slots
const slotContents = [
  ["Breakfast 1", "", "Bento 10"],
  ["Breakfast 2", "Bento 5", "Bento 2"],
  ["Breakfast 3", "Bento 3", ""],
  ["Breakfast 4", "Bento 14", "Bento 12"],
  ["Breakfast 5", "", "Bento 16"],
];

export default function orders() {
  return (
    <>
      <WithSubnavigation />
      <div className="flex flex-col p-7">
        <div className="flex flex-row justify-between items-center font-semibold">
          <h1 className="text-5xl">Orders</h1>
          <div className="flex flex-row gap-10">
            <button className="bg-slate-300 p-5 text-3xl rounded-lg">
              Add Order
            </button>
            <button className="bg-slate-300 p-5 text-3xl rounded-lg">
              Remove Order
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 p-4 text-2xl">
        {/* Column for slot names */}
        <div className="flex flex-col justify-around">
          <div className="font-bold text-center mb-2"></div>
          {slotNames.map((slot) => (
            <div key={slot} className="font-semibold text-center">
              {slot}
            </div>
          ))}
        </div>

        {/* Columns for each day */}
        {days.map((day, dayIndex) => (
          <div key={day} className="flex flex-col">
            <div className="font-bold text-center mb-2">{day}</div>
            <div className="flex-grow border rounded-lg">
              {slotContents[dayIndex].map((content, index) => (
                <div
                  key={index}
                  className={`border-b last:border-b-0 p-4 flex justify-center items-center transition duration-200 cursor-pointer ${
                    content ? "bg-green-300" : "hover:bg-gray-100"
                  }`}
                >
                  {content ? content : "Not-booked"}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
