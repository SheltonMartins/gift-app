// src/components/GiftForm.tsx
import React, { useState } from 'react';
import api from '../services/api';

interface Props {
  userId?: number; // pode ser passado, mas agora o backend pega o user via token
  onGiftAdded?: () => void;
}

const GiftForm: React.FC<Props> = ({ onGiftAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [product_link, setProductLink] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError('Título é obrigatório');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await api.post('/gifts',
        { title, description, image_url, product_link },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle('');
      setDescription('');
      setImageUrl('');
      setProductLink('');
      setError(null);
      if (onGiftAdded) onGiftAdded();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao adicionar presente');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <input placeholder="URL da imagem" value={image_url} onChange={e => setImageUrl(e.target.value)} />
      </div>
      <div>
        <input placeholder="Link do produto" value={product_link} onChange={e => setProductLink(e.target.value)} />
      </div>
      <button type="submit">Adicionar presente</button>
    </form>
  );
};

export default GiftForm;
