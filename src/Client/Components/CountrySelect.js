import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";

const CountrySelect = ({ countryProduct }) => {
  const data = [
    {
      label: "All Country",
      value: "All Country",
    },
    {
      label: "London",
      value: "London",
    },
    {
      label: "Birmingham",
      value: "Birmingham",
    },
    {
      label: "Liverpool",
      value: "Liverpool",
    },
    {
      label: "Scotland",
      value: "Scotland",
    },
  ];
  return (
    <div>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Baklava Box Order now</h1>
        <h1 className="text-3xl">Select Availability in Your Location</h1>
      </div>

      <Tabs value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => {
                countryProduct(value);
              }}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default CountrySelect;
