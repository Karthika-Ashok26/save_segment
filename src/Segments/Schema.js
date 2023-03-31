import React, { useEffect, useState } from 'react';
import Select from "react-select";

export default function Schema({ schema, remove, id, replaceSchema, schemaList }) {
    const [schemaName, setSchemaName] = useState(schema)
    useEffect(()=> {
      setSchemaName(schema)
    },[schema])
    const handleChangeSchema = (value) => {
        replaceSchema(schema, value)
        setSchemaName(value)
    }
  return (
    <div className='schema'>
      <Select
              value={schemaName}
              onChange={handleChangeSchema}
              options={schemaList}
            />
            <a onClick={()=>remove(id)}><i className="material-icons" style={{fontSize:"36px"}}>remove</i></a>
    </div>
  );
}
