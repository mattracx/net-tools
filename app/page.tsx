"use client";
import Image from "next/image";
import { Tabs, Table, Checkbox, TextInput, Button } from "flowbite-react";
import mDNS from "./mDNS";
import portScanner from "./pages/portScanner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Tabs.Group aria-label="Default tabs" style="default">
          <Tabs.Item active={true} title="mDNS">
            {mDNS()}
          </Tabs.Item>
          <Tabs.Item title="Port Scanner">{portScanner()}</Tabs.Item>
          <Tabs.Item title="Saved Networks" disabled={true}>
            Settings content
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </main>
  );
}
