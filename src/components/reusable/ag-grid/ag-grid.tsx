// Theme
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "./ag-grid-theme-builder.css";
import React from "react";

interface IAGGridProps<T> {
  rowData: T[];
  colDefs: ColDef<T>[];
  onRowClicked?: (event: any) => void;
  isLoading: boolean;
}

// Create new GridExample component
export default function AgGrid<T>({ rowData, colDefs, onRowClicked, isLoading }: IAGGridProps<T>) {
  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={"w-full h-[90%] "}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onRowClicked={onRowClicked}
        loading={isLoading}
        rowSelection="multiple"
      />
    </div>
  );
}
