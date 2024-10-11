import WithSubnavigation from "@/components/Navbar";
import { Button } from "@chakra-ui/react";

export default function Inventory() {
  return (
    <>
      <WithSubnavigation />
      <div className="flex flex-col p-7">
        <div className="flex flex-row justify-between items-center font-semibold">
          <h1 className="text-6xl">Calculator</h1>
          <h1 className="text-5xl font-medium"> 14 Oct 2024 - 18 Oct 2024</h1>
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
              <td>80 Units</td>
            </tr>
            <tr>
              <td>Frozen Fish Fillet</td>
              <td>20 Units</td>
            </tr>
            <tr>
              <td>Eggs</td>
              <td>50 Units</td>
            </tr>
          </tbody>
        </table>
      </div>
      ;
    </>
  );
}
