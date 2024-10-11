import WithSubnavigation from "@/components/Navbar";
import { Tooltip } from "@chakra-ui/react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const slotNames = ["Breakfast", "Delivery", "Lunch"];

// Sample data to populate the slots
const slotContents = [
  [1, 3, 5],
  [2, 5, 4],
  [3, 3, 5],
  [4, 1, 5],
  [5, 4, 3],
];

const people = [
  "Andy",
  "Bob",
  "Charlie",
  "David",
  "Eve",
]

export default function orders() {
  return (
    <>
      <WithSubnavigation />
      <div className="flex flex-col p-7">
        <div className="flex flex-row justify-between items-center font-semibold">
          <h1 className="text-5xl">Shifts</h1>
          <div className="flex flex-row gap-10">
            <button className="bg-slate-300 p-5 text-3xl rounded-lg">
              Add Shift
            </button>
            <button className="bg-slate-300 p-5 text-3xl rounded-lg">
              Remove Shift
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
                <Tooltip
                  key={index}
                  label={Array.from(
                    { length: content },
                    (_, i) => people[i % people.length]
                  ).join(",\n")}
                  placement="top"
                  hasArrow
                  bg="white"
                  color="black"
                  fontSize="lg"
                  border="1px"
                  borderColor="gray.300"
                  p={4} // Padding to make the tooltip larger
                >
                  <div
                    className={`border-b last:border-b-0 p-4 flex justify-center items-center transition duration-200 cursor-pointer ${
                      content > 2 ? "bg-green-300" : "bg-red-300"
                    }`}
                  >
                    {content} {content > 1 ? "People" : "Person"}
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
