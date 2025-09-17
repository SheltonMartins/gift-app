// src/components/Profile.styles.ts
import styled from 'styled-components';

export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #007bff;
  }

  h2 {
    margin: 0;
    font-size: 1.8rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;

    img {
      width: 60px;
      height: 60px;
    }
  }
`;

export const SectionTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: #007bff;
`;

export const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
  margin-right: 0.5rem;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0,123,255,0.5);
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const FriendsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  li {
    background: #f0f0f0;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    a {
      text-decoration: none;
      color: #007bff;
      font-weight: 500;
    }
  }
`;
