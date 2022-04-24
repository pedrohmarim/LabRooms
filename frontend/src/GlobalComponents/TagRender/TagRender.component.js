import React from "react";
import { Tag } from "../../antd_components";

const TagRender = (props) => {
  const { label, closable, onClose, margin } = props;
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
