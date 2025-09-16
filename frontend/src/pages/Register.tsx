import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { name, email, password });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err: any) {
      if (err.response) setError(err.response.data.error || 'Erro no cadastro');
      else setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <div>
      <h2>Cadastro de Amigos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;