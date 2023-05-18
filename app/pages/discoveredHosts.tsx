import React, { useState } from "react";
import { Table, Checkbox } from "flowbite-react";

export default function Home() {
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
