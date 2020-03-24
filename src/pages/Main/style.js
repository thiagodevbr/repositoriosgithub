import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
  empty: props.empty,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &[empty] {
    cursor: pointer;
  }

  ${(props) =>
    !props.empty &&
    css`
      & {
        cursor: not-allowed;
        opacity: 0.6;
      }
    `}

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 1s linear infinite;
      }
    `}
`;

export const WarningRepository = styled.div`
  font-size: 11px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  color: #f00;
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 8px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    :nth-child(even) {
      background: #eee;
    }

    span {
      flex: 1;
    }

    a {
      color: #7159c1;
      text-decoration: none;
      margin-right: 10px;
    }
  }
`;

export const RemoveButton = styled.button`
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #7159c1;
  padding: 1px;
  border: 0;
  opacity: 0.9;
`;
