import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Gift {
  id: number;
  title: string;
  description?: string;
  image_url?: string;
  product_link?: string;
  created_at?: string;
}

interface GiftsListProps {
  userId: number;
  onRefresh?: () => void; // callback para atualizar lista
}

const GiftsList: React.FC<GiftsListProps> = ({ userId, onRefresh }) => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchGifts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}/gifts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGifts(res.data);
      if (onRefresh) onRefresh();
    } catch (err) {
      setError('Erro ao carregar presentes');
    }
  };

  useEffect(() => {
    fetchGifts();
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
              <a href={gift.product_link} target="_blank" rel="noopener noreferrer">
                Ver produto
              </a>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default GiftsList;
