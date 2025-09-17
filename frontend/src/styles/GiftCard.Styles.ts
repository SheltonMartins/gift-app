// src/styles/GiftCard.Styles.ts
import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  }
`;

export const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 20px;
  color: #333;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

export const Image = styled.img`
  width: 150px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const ProductLink = styled.a`
  color: #4a90e2;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
