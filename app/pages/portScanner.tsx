import { Tabs, TextInput, Button, Table, Checkbox } from "flowbite-react";
import React, { useState } from "react";

export default function MyForm() {
  const [formData, setFormData] = useState({
    host: "",
    port: "",
  });
  const [formErrors, setFormErrors] = useState({
    host: "",
    port: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check form validation
    const errors = {} as any;
    if (!formData.host) {
      errors.name = "Please enter a valid CIDR";
    }
    if (!formData.port) {
      errors.email = "Please enter a port within the range [0-65525]";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      startScanning(formData);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="host">Host/CIDR:</label>
        <TextInput
          id="host"
          name="host"
          type="text"
          placeholder="CIDR (eg: 192.168.1.0/24)"
          required={true}
          value={formData.host}
          onChange={handleInputChange}
        />
        {formErrors.host && <div>{formErrors.host}</div>}
      </div>
      <div>
        <label htmlFor="port">Port:</label>
        <TextInput
          id="port"
          name="port"
          type="text"
          placeholder="Port [0-65535]"
          required={true}
          value={formData.port}
          onChange={handleInputChange}
        />
        {formErrors.port && <div>{formErrors.port}</div>}
      </div>
      <Button type="submit">Start Scanning</Button>
    </form>
  );
}

function startScanning(formData: { host: string; port: string }) {
  console.log(formData);
}
