import { Tabs, TextInput, Button, Table, Checkbox } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function MyForm() {
  const [scanning, setScanning] = useState(false); // Scan Button status
  const [message, setMessage] = useState("");
  useEffect(() => {
    // console.log("Message:", message);
  }, [message]);

  const [formData, setFormData] = useState({
    cidr: "",
  });
  const [formErrors, setFormErrors] = useState({
    cidr: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check form validation
    const errors = {} as any;
    if (!formData.cidr) {
      errors.cidr = "Please enter a valid CIDR";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      const response = await fetch(`/api/dns_discovery?cidr=${formData.cidr}`);
      const data = await response.json();
      setMessage(data.message);
      //startScanning(formData);
      if (!scanning) {
        setScanning(true);
        try {
          const result = await startScanning(formData);
          console.log(result);
          discoveredHosts(result);
        } catch (error) {
          console.error(error);
        } finally {
          setScanning(false);
        }
      } else {
        // stopScanning();
        setScanning(false);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateCidr = (cidr: string) => {
    const cidrRegex =
      /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])(\/([0-9]|[12][0-9]|3[0-2]))?$/;
    console.log(formData.cidr, formData.cidr.match(cidrRegex));
    return cidr.match(cidrRegex) !== null;
  };

  const handleCidrInputBlur = () => {
    if (!validateCidr(formData.cidr)) {
      setFormErrors({
        ...formErrors,
        cidr: "Please enter a valid CIDR notation",
      });
    } else {
      setFormErrors({
        ...formErrors,
        cidr: "",
      });
    }
  };
  const label = scanning ? "Stop Scanning" : "Start Scanning";
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cidr">Host/CIDR:</label>
        <TextInput
          id="cidr"
          name="cidr"
          type="text"
          placeholder="CIDR (eg: 192.168.1.0/24)"
          required={true}
          value={formData.cidr}
          onChange={handleInputChange}
          onBlur={handleCidrInputBlur}
        />
        {formErrors.cidr && <div>{formErrors.cidr}</div>}
      </div>
      <Button type="submit">{label}</Button>
    </form>
  );
}

function startScanning(formData: any) {
  console.log(formData);
}

export function discoveredHosts(hosts: any) {
  return (
    <>
      <div className="p-5"></div>
      <Table hoverable={true} className="items-center">
        <Table.Head className="text-center">
          <Table.HeadCell className="!p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Hostname</Table.HeadCell>
          <Table.HeadCell>IPv4</Table.HeadCell>
          <Table.HeadCell>MAC ADDRESS</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y text-center">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="!p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              hostname1.lan
            </Table.Cell>
            <Table.Cell>255.255.255.255</Table.Cell>
            <Table.Cell>00:00:00:00:00:00</Table.Cell>
            <Table.Cell>$9999</Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}
