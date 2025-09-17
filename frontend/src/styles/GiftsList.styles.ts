// src/components/GiftsList.styles.ts
import styled from 'styled-components';

export const GiftsContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const GiftCard = styled.li`
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  img {
    max-width: 150px;
    border-radius: 8px;
    object-fit: cover;
  }

  h4 {
    margin: 0;
    color: #007bff;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  button {
    align-self: flex-start;
    padding: 0.3rem 0.6rem;
    border-radius: 8px;
    border: none;
    background-color: #dc3545;
    color: #fff;
    cursor: pointer;
    font-size: 0.9rem;
    transition: 0.2s;

    &:hover {
      background-color: #b02a37;
    }
  }

  @media (max-width: 600px) {
    img {
      max-width: 100px;
    }
  }
`;
