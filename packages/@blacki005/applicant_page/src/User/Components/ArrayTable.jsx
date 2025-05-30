import React from "react";
import { Table } from "react-bootstrap";

/**
 * Generic array table for displaying a list of objects as rows.
 * @param {Object} props
 * @param {Array} props.data - Array of objects to display
 * @param {Array} [props.columns] - Array of column definitions: { key, label }
 * @param {string} [props.title] - Optional table title
 */
export const ArrayTable = ({ data, columns, title }) => {
  if (!Array.isArray(data) || data.length === 0) return null;
  // If columns not provided, use all keys from first row
  const cols = columns || Object.keys(data[0]).map(key => ({ key, label: key }));
  return (
    <div style={{ marginBottom: 24 }}>
      {title && <h5 style={{ marginBottom: 12 }}>{title}</h5>}
      <Table striped bordered hover size="sm" style={{ background: "#fff" }}>
        <thead>
          <tr>
            {cols.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {cols.map(col => (
                <td key={col.key}>{String(row[col.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
