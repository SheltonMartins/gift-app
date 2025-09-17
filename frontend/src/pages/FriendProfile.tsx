import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import GiftsList from '../components/GiftsList';
import {
  Container,
  Header,
  ProfileImage,
  Name,
  Bio,
  GiftsSection,
  ButtonsContainer,
  Button,
  ErrorMessage
} from '../styles/FriendProfile.Styles';

interface Friend {
  id: number;
  name: string;
  bio?: string;
  profile_picture?: string;
}

const FriendProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [friend, setFriend] = useState<Friend | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFriend = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriend(res.data);
    } catch {
      setError('Erro ao carregar perfil do amigo');
    }
  };

  useEffect(() => {
    if (id) fetchFriend();
  }, [id]);

  const handleRemoveFriend = async () => {
    if (!id) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/friends/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Amizade removida!');
      navigate('/profile/' + localStorage.getItem('userId'));
    } catch (err: any) {
      alert(err.response?.data.error || 'Erro ao remover amizade');
    }
  };

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!friend) return <p>Carregando...</p>;

  return (
    <Container>
      <Header>
        {friend.profile_picture && <ProfileImage src={friend.profile_picture} alt={friend.name} />}
        <div>
          <Name>{friend.name}</Name>
          {friend.bio && <Bio>{friend.bio}</Bio>}
        </div>
      </Header>

      <GiftsSection>
        <h3>Lista de Presentes</h3>
        <GiftsList userId={friend.id} />
      </GiftsSection>

      <ButtonsContainer>
        <Button onClick={() => navigate(`/profile/${localStorage.getItem('userId')}`)}>
          Voltar ao meu perfil
        </Button>
        <Button danger onClick={handleRemoveFriend}>
          Remover amizade
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default FriendProfile;
