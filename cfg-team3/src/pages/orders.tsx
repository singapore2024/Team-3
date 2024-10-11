import WithSubnavigation from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, HStack, Select } from "@chakra-ui/react";
import { useState } from "react";

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [items, setItems] = useState([
    { id: 1, selectedItem: "", quantity: 1 },
  ]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === "quantity" ? Number(value) : value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, selectedItem: "", quantity: 1 },
    ]);
  };

  const handleSave = () => {
    // Handle save logic here, like sending data to an API
    console.log("Items:", items);
    // Close the dialog after saving (if needed)
  };
  return (
    <>
      <WithSubnavigation />
      <div className="flex flex-col p-7">
        <div className="flex flex-row justify-between items-center font-semibold">
          <h1 className="text-5xl">Orders</h1>
          <div className="flex flex-row gap-10">
            <Dialog>
              <DialogTrigger asChild>
                <HStack w="full" justifyContent="center" alignItems={"center"}>
                  <button className="bg-slate-300 p-5 text-4xl rounded-lg">
                    Add Order
                  </button>
                </HStack>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Order</DialogTitle>
                  <DialogDescription>
                    Choose the items for your order and specify the quantity.
                  </DialogDescription>
                </DialogHeader>

                {/* Dynamic Fields for Items */}
                <div className="mt-4 space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="space-y-2">
                      <div>
                        <label
                          htmlFor={`item-${item.id}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Select Item
                        </label>
                        <Select
                          id={`item-${item.id}`}
                          value={item.selectedItem}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "selectedItem",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        >
                          <option value="" disabled>
                            Select an item
                          </option>
                          <option value="Bento A">Bento A</option>
                          <option value="Bento B">Bento B</option>
                          <option value="Bento C">Bento C</option>
                        </Select>
                      </div>
                      <div>
                        <label
                          htmlFor={`quantity-${item.id}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Quantity
                        </label>
                        <Select
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", e.target.value)
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        >
                          {[...Array(10).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                              {num + 1}
                            </option>
                          ))}
                        </Select>
                      </div>
                      {/* Render "Add Item" button after selecting quantity */}
                      {index === items.length - 1 && item.quantity > 0 && (
                        <div className="mt-2">
                          <Button
                            variant="secondary"
                            onClick={addItem}
                            type="button"
                            className="mt-1"
                          >
                            Add Another Item
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <DialogFooter>
                  <Button
                    variant="secondary"
                    onClick={handleSave}
                    type="button"
                  >
                    Save Order
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
