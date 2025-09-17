import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, Title, ErrorMessage, Form, Input, Button } from '../styles/Register.Style';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { name, email, password, nickname });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err: any) {
      if (err.response) setError(err.response.data.error || 'Erro no cadastro');
      else setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <Container>
      <Title>Cadastre-se para começar a ganhar presentes!</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleRegister}>
        <Input 
          placeholder="Nome" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <Input 
          placeholder="Nickname" 
          value={nickname} 
          onChange={e => setNickname(e.target.value)} 
          required 
        />
        <Input 
          placeholder="Email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <Input 
          placeholder="Senha" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  );
};

export default Register;
