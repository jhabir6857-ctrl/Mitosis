import { TestsPage } from "../page";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#f8fafc" }} />}>
      <TestsPage defaultTab="costs" />
    </Suspense>
  );
}
