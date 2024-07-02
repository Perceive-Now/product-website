// Theme
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "./ag-grid-theme-builder.css";
import React from "react";
import { overflows } from "@headlessui/react/dist/hooks/document-overflow/overflow-store";

interface IAGGrdidProps<T> {
  rowData: T[];
  colDefs: ColDef<T>[];
}

// Create new GridExample component
export default function AgGrid<T>({ rowData, colDefs }: IAGGrdidProps<T>) {
  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={"w-full h-full"}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} rowSelection={"multiple"} />
    </div>
  );
}
