import React, { useState } from 'react';
import api from '../services/api';
import { Button, ErrorMessage, FormContainer, Input, InputGroup } from '../styles/GiftForm.Styles';


interface Props {
  userId?: number;
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
    <FormContainer onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <InputGroup>
        <Input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      </InputGroup>

      <InputGroup>
        <Input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
      </InputGroup>

      <InputGroup>
        <Input placeholder="URL da imagem" value={image_url} onChange={e => setImageUrl(e.target.value)} />
      </InputGroup>

      <InputGroup>
        <Input placeholder="Link do produto" value={product_link} onChange={e => setProductLink(e.target.value)} />
      </InputGroup>

      <Button type="submit">Adicionar presente</Button>
    </FormContainer>
  );
};

export default GiftForm;
