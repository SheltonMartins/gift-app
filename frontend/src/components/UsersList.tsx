import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Gift {
  id: number;
  title: string;
  description?: string;
  image_url?: string;
  product_link?: string;
}

interface GiftsListProps {
  userId: number;
}

const GiftsList: React.FC<GiftsListProps> = ({ userId }) => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get(`/users/${userId}/gifts`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setGifts(res.data))
      .catch(() => setError('Erro ao carregar presentes'));
  }, [userId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (gifts.length === 0) return <p>Nenhum presente encontrado</p>;

  return (
    <ul>
      {gifts.map(gift => (
        <li key={gift.id} style={{ marginBottom: '15px' }}>
          <h4>{gift.title}</h4>
          {gift.description && <p>{gift.description}</p>}
          {gift.image_url && <img src={gift.image_url} alt={gift.title} width={100} />}
          {gift.product_link && (
            <p>
              <a href={gift.product_link} target="_blank" rel="noopener noreferrer">Ver produto</a>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default GiftsList;