import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import GiftsList from '../components/GiftsList';
import GiftForm from '../components/GiftForm';

interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
  profile_picture?: string;
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const userId = Number(id || localStorage.getItem('userId'));

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get(`/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
      setUser(res.data);
    } catch {
      setError('Erro ao carregar perfil');
    }
  };

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/users', { headers: { Authorization: `Bearer ${token}` } });
      // Remove o próprio usuário da lista de amigos
      setFriends(res.data.filter((u: User) => u.id !== userId));
    } catch {
      console.log('Erro ao carregar amigos');
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchFriends();
  }, [userId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      {user.bio && <p>{user.bio}</p>}
      {user.profile_picture && <img src={user.profile_picture} alt={user.name} width={120} />}

      <h3>Adicionar Presente</h3>
      <GiftForm userId={user.id} onGiftAdded={fetchProfile} />

      <h3>Minha Lista de Presentes</h3>
      <GiftsList userId={user.id} />

      <h3>Amigos</h3>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            <Link to={`/profile/${friend.id}`}>{friend.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
