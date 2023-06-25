import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

const CountryModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [cityname, setcityname] = useState("");
  // localStorage.removeItem("City");
  console.log(cityname);

  useEffect(() => {
    const city = localStorage.getItem("City");
    setcityname(city);
    if (!city) {
      console.log("not found");
      setOpen(true);
    } else {
      console.log(city);
    }
  });

  return (
    <>
      <React.Fragment className="md:max-w-fit">
        {/* <Button id="openbutton" onClick={handleOpen}>
          Sign In
        </Button> */}

        <Dialog
          size="xl"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="">
            <CardBody className="flex flex-col gap-4">
              {/* <Input label="City" size="lg" /> */}
              <p className="text-center">
                Baklavabox provides location base products to maintain quality
              </p>
              <label for="cars">Please choose your location:</label>

              <select
                name="cities"
                id="cities"
                className=" rounded-md bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                onChange={(e) => {
                  localStorage.setItem("City", e.target.value);
                  setcityname(e.target.value);
                }}
              >
                <option>Select Your City</option>
                <option value="Luton">Luton</option>
                <option value="Dunstable">Dunstable</option>
                <option value="Hitchin">Hitchin</option>
                <option value="Hemel Hempstead">Hemel Hempstead</option>
                <option value="Watford">Watford</option>
                <option value="St Albans">St Albans</option>
                <option value="Bedford">Bedford</option>
                <option value="Milton Keynes">Milton Keynes</option>
                <option value="Other City">Other City</option>
              </select>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                onClick={() => {
                  handleOpen();
                }}
                fullWidth
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default CountryModal;
