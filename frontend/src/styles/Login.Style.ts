import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
  padding: 1rem;
`;

export const FormWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;

  h2 {
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3f51b5;
    box-shadow: 0 0 0 2px rgba(63,81,181,0.2);
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: #3f51b5;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #303f9f;
  }
`;

export const GoogleButton = styled(Button)`
  background-color: #db4437;
  &:hover {
    background-color: #c1351d;
  }
`;

export const Separator = styled.div`
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #666;
`;

export const Error = styled.p`
  color: red;
  margin-bottom: 1rem;
`;
