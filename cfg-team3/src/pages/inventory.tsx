import WithSubnavigation from "@/components/Navbar";
import { Button } from "@chakra-ui/react";

export default function Inventory() {
  return (
    <>
      <WithSubnavigation />
      <div className="flex flex-col p-7">
        <div className="flex flex-row justify-between items-center font-semibold">
          <h1 className="text-5xl">Inventory</h1>
          <div className="flex flex-row gap-10">
            <button className="bg-slate-300 p-5 text-3xl rounded-lg">
              Add Item
            </button>
            <button className="bg-slate-300 p-5 text-3xl rounded-lg">
              Remove Item
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
          </tbody>
        </table>
      </div>
      ;
    </>
  );
}
