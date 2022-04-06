import React from "react";
import { Tag } from "../../antd_components";

const TagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color='blue'
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ margin: 6 }}
    >
      {label}
    </Tag>
  );
};

export default TagRender;
