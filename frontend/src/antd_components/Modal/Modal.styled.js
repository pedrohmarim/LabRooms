import styled from 'styled-components';
import { Modal as ModalAntDesign } from 'antd';

export const Modal = styled(ModalAntDesign).attrs(props => ({
  bodyStyle: props.bodyStyle || {
    maxHeight: props.maxHeight,
    minHeight: props.minHeight,
    overflow: 'auto',
  },
}))``;
