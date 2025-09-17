// src/styles/GiftForm.Style.ts
import styled from 'styled-components';

export const FormContainer = styled.form`
  max-width: 500px;
  margin: 20px auto;
  padding: 25px;
  background-color: #fefefe;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border 0.2s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357ab8;
  }

  &:active {
    background-color: #2d5e91;
  }
`;
