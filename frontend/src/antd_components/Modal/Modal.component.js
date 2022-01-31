import React from 'react';
import PropTypes from 'prop-types';
import * as S from './Modal.styled';

function Modal({
  title,
  width,
  visible,
  onCancel,
  onOk,
  confirmLoading,
  okText,
  footer,
  maxHeight,
  minHeight,
  bodyStyle,
  children,
}) {
  return (
    <S.Modal
      title={title}
      width={width}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      okText={okText}
      maxHeight={maxHeight}
      minHeight={minHeight}
      bodyStyle={bodyStyle}
      destroyOnClose
      maskClosable={false}
      footer={footer ? Modal.footer : null}
    >
      {children}
    </S.Modal>
  );
}

export default Modal;

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
  visible: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  confirmLoading: PropTypes.bool,
  okText: PropTypes.string,
  maxHeight: PropTypes.string,
  minHeight: PropTypes.string,
  footer: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Modal.defaultProps = {
  width: 520,
  visible: false,
  onOk: null,
  confirmLoading: false,
  okText: Modal.okText,
  maxHeight: '70vh',
  minHeight: '',
  footer: null,
};

Modal.confirm = S.Modal.confirm;
