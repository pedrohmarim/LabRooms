import React from "react";
import { Tag } from "../../antd_components";

const TagRender = ({ label, closable, onClose, margin }) => {
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      style={{ margin: margin }}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
    >
      {label}
    </Tag>
  );
};

export default TagRender;
