import React, { useState, useEffect } from "react";
import Schema from "./Schema";
import { saveSegment, segments } from "./common";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import Footer from "./Footer";
import { toast } from "react-toastify";

export default function SavingSegment({ closeModal }) {
  const [segmentName, setSegmentName] = useState("");
  const [schemaName, setSchemaName] = useState("");
  const [schemaList, setschemaList] = useState([]);
  const [filteredSegments, setFilteredSegments] = useState(segments);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    let filteredSegments = segments.filter((segment) =>
      schemaList.every((data) => segment.value !== data.value)
    );
    setFilteredSegments(filteredSegments);
  }, [schemaList]);

  const filterSchema = (schema) => {
    setschemaList([...schemaList, schema]);
  };
  const updateSchema = (list, schema, value) => {
    let schemas = list;
    let schemaId = schemas.findIndex((data) => data.value === schema.value);
    schemas[schemaId] = value;
    return schemas;
  };
  const replaceSchema = (schema, value) => {
    let schemas = updateSchema(schemaList, schema, value);
    let segments = updateSchema(filteredSegments, value, schema);
    setschemaList(schemas);
    setFilteredSegments(segments);
  };
  const addSegment = () => {
    filterSchema(schemaName);
    setSchemaName("");
  };
  const changeHandler = (value) => {
    setSchemaName(value);
  };
  const onSave = () => {
    let schema = schemaList.map((data) => ({ [data.value]: data.label }));
    let payload = { segment_name: segmentName, schema };
    setIsLoading(true);
    saveSegment(payload)
      .then((response) => {
        console.log("CheckSuccess::", response);
        setIsLoading(false);
        toast.success("segment saved successfully", { hideProgressBar: true });
        closeModal();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("segment saving failed", { hideProgressBar: true });
        console.error("CheckFailure::", error);
      });
  };
  const removeSchemaFromList = (id) => {
    let schemas = schemaList;
    let removedSchema = schemaList[id];
    let schema = [
      ...schemas.slice(0, Number(id)),
      ...schemas.slice(Number(id) + 1),
    ];
    setschemaList(schema);
    setFilteredSegments([removedSchema, ...filteredSegments]);
  };
  return (
    <div>
      <p>Enter the Name of the Segment</p>
      <TextField
        className="segmentName"
        value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}
        placeholder="Name of the segment"
      />
      <p>To save your segment,you need add the schemas to build the query</p>
      {schemaList.map((schema, index) => (
        <Schema
          key={index}
          id={index}
          remove={removeSchemaFromList}
          schema={schema}
          replaceSchema={replaceSchema}
          schemaList={filteredSegments}
        />
      ))}
      <div>
        <Select
          value={schemaName}
          onChange={changeHandler}
          options={filteredSegments}
          placeholder="Add schema to Segment"
        />
        <br />
        <a onClick={schemaName ? addSegment : null}>+ Add new segment</a>
      </div>
      <br />
      <Footer
        closeModal={closeModal}
        onSave={onSave}
        schemaList={schemaList}
        segmentName={segmentName}
        isLoading={isLoading}
      />
    </div>
  );
}
