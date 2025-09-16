// src/pages/FriendProfile.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import GiftsList from '../components/GiftsList';

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
      navigate('/profile/' + localStorage.getItem('userId')); // volta ao perfil pessoal
    } catch (err: any) {
      alert(err.response?.data.error || 'Erro ao remover amizade');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!friend) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{friend.name}</h2>
      {friend.bio && <p>{friend.bio}</p>}
      {friend.profile_picture && (
        <img src={friend.profile_picture} alt={friend.name} width={120} />
      )}

      <h3>Lista de Presentes</h3>
      <GiftsList userId={friend.id} />

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate(`/profile/${localStorage.getItem('userId')}`)}>
          Voltar ao meu perfil
        </button>
        <button onClick={handleRemoveFriend} style={{ marginLeft: '10px', color: 'red' }}>
          Remover amizade
        </button>
      </div>
    </div>
  );
};

export default FriendProfile;
