import React from "react";
import { Table } from "react-bootstrap";

/**
 * Generic key-value table for displaying object data.
 * @param {Object} props
 * @param {Object} props.data - Object with key-value pairs to display
 * @param {Object} [props.keyLabels] - Optional mapping of keys to display labels
 * @param {string} [props.title] - Optional table title
 */
export const KeyValueTable = ({ data, keyLabels = {}, title }) => {
  if (!data) return null;
  return (
    <div style={{ marginBottom: 24 }}>
      {title && <h5 style={{ marginBottom: 12 }}>{title}</h5>}
      <Table striped bordered hover size="sm" style={{ background: "#fff" }}>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <th style={{ width: "40%", background: "#f8f9fa", fontWeight: 600 }}>
                {keyLabels[key] || key}
              </th>
              <td style={{ width: "60%" }}>{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
