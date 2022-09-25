import React from "react";
import { useState } from "react";

function News() {
  const [title, setTitle] = useState("");
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

export default News;
