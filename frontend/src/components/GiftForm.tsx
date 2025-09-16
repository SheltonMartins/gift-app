import React, { useState } from 'react';
import axios from 'axios';

interface GiftFormProps {
  userId: number;
  onGiftAdded: () => void; // callback para atualizar a lista
}

const GiftForm: React.FC<GiftFormProps> = ({ userId, onGiftAdded }) => {
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
      await axios.post(`${process.env.REACT_APP_API_URL}/gifts`, 
        { title, description, image_url, product_link },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle('');
      setDescription('');
      setImageUrl('');
      setProductLink('');
      setError(null);
      onGiftAdded(); // atualiza lista
    } catch (err) {
      setError('Erro ao adicionar presente');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="URL da Imagem" value={image_url} onChange={e => setImageUrl(e.target.value)} />
      <input placeholder="Link do Produto" value={product_link} onChange={e => setProductLink(e.target.value)} />
      <button type="submit">Adicionar Presente</button>
    </form>
  );
};

export default GiftForm;
