"use client";

import WithSubnavigation from "@/components/Navbar";
import { Button, HStack, Input, Select } from "@chakra-ui/react";
import {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"

  
  

export default function Orders() {
    const [items, setItems] = useState([{ id: 1, selectedItem: '', quantity: 1 }]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = field === 'quantity' ? Number(value) : value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { id: items.length + 1, selectedItem: '', quantity: 1 }]);
    };

    const handleSave = () => {
        // Handle save logic here, like sending data to an API
        console.log('Items:', items);
        // Close the dialog after saving (if needed)
    };
  return (
    <>
      <WithSubnavigation />
      <div className="flex flex-col p-7">
        <div className="flex flex-row justify-between items-center font-semibold">
          <h1 className="text-6xl">Orders</h1>
          <div className="flex flex-row gap-10">
            <button className="bg-slate-400 p-5 text-4xl rounded-lg">
              Add Order
            </button>
            <button className="bg-slate-400 p-5 text-4xl rounded-lg">
              Remove Order
            </button>
          </div>
        </div>{" "}
        <table className="dashboard-table my-8">
          <thead>
            <tr>
              <th className="expand">Item</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Frozen Chicken Cutlet</td>
              <td>500 Units</td>
            </tr>
            <tr>
              <td>Frozen Fish Fillet</td>
              <td>50 Units</td>
            </tr>
            <tr>
              <td>Eggs</td>
              <td>100 Units</td>
            </tr>
            <tr>
              <td>Rice</td>
              <td>100 Units</td>
            </tr>
            <tr>
              <td>Soya Sauce</td>
              <td>100 Units</td>
            </tr>
            <tr>
              <td>Vegetables</td>
              <td>100 Units</td>
            </tr>
          </tbody>
        </table>
        <Dialog>
            <DialogTrigger asChild>
                <HStack w="full" justifyContent="center" alignItems={'center'}>
                <Button variant="outline" size='lg' width='16rem'>Edit Order</Button>
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
                                        handleItemChange(index, 'selectedItem', e.target.value)
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
                                        handleItemChange(index, 'quantity', e.target.value)
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
                    <Button variant="secondary" onClick={handleSave} type="button">
                        Save Order
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

      </div>
      ;
    </>
  );
}
