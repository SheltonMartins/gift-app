// src/styles/FriendProfile.Styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  margin: 30px auto;
  padding: 25px;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #4a90e2;
`;

export const Name = styled.h2`
  font-size: 26px;
  color: #333;
  margin: 0;
`;

export const Bio = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: 5px;
`;

export const GiftsSection = styled.div`
  margin-top: 30px;
`;

export const ButtonsContainer = styled.div`
  margin-top: 25px;
  display: flex;
  gap: 10px;
`;

export const Button = styled.button<{ danger?: boolean }>`
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ danger }) => (danger ? '#ff4d4f' : '#4a90e2')};
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ danger }) => (danger ? '#d9363e' : '#357ab8')};
  }

  &:active {
    background-color: ${({ danger }) => (danger ? '#b72b2f' : '#2d5e91')};
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-weight: bold;
  margin-bottom: 15px;
`;
