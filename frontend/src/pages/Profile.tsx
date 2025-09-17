import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import GiftsList from '../components/GiftsList';
import GiftForm from '../components/GiftForm';
import { Button, Card, FriendsList, Input, ProfileContainer, SectionTitle, UserHeader } from '../styles/Profile.styles';


interface User {
  id: number;
  name: string;
  nickname: string;
  email: string;
  bio?: string;
  profile_picture?: string;
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [friendNickname, setFriendNickname] = useState('');

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
      const res = await api.get(`/friends`, { headers: { Authorization: `Bearer ${token}` } });
      setFriends(res.data);
    } catch {
      console.log('Erro ao carregar amigos');
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchFriends();
  }, [userId]);

  const handleAddFriend = async () => {
    if (!friendNickname) return;
    try {
      const token = localStorage.getItem('token');
      await api.post(`/friends`, { nickname: friendNickname }, { headers: { Authorization: `Bearer ${token}` } });
      setFriendNickname('');
      fetchFriends();
    } catch (err: any) {
      alert(err.response?.data.error || 'Erro ao adicionar amigo');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Carregando...</p>;

  return (
    <ProfileContainer>
      <Card>
        <UserHeader>
          {user.profile_picture && <img src={user.profile_picture} alt={user.name} />}
          <h2>{user.name}</h2>
        </UserHeader>
        {user.bio && <p>{user.bio}</p>}
      </Card>

      <Card>
        <SectionTitle>Adicionar Presente</SectionTitle>
        <GiftForm userId={user.id} onGiftAdded={fetchProfile} />
      </Card>

      <Card>
        <SectionTitle>Minha Lista de Presentes</SectionTitle>
        <GiftsList userId={user.id} />
      </Card>

      <Card>
        <SectionTitle>Adicionar Amigo</SectionTitle>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Input
            placeholder="Digite o nickname do amigo"
            value={friendNickname}
            onChange={e => setFriendNickname(e.target.value)}
          />
          <Button onClick={handleAddFriend}>Adicionar</Button>
        </div>
      </Card>

      <Card>
        <SectionTitle>Meus Amigos</SectionTitle>
        <FriendsList>
          {friends.map(friend => (
            <li key={friend.id}>
              <Link to={`/friend/${friend.id}`}>{friend.name}</Link>
            </li>
          ))}
        </FriendsList>
      </Card>
    </ProfileContainer>
  );
};

export default Profile;
