import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // seu axios configurado
import * as S from '../styles/Login.Style';

interface GoogleWindow extends Window {
  google: any;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Login tradicional
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('userName', res.data.name);
      navigate(`/profile/${res.data.userId}`);
    } catch (err: any) {
      setError(err.response?.data.error || 'Erro ao logar');
    }
  };

  // Inicializa botão de login Google
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      const win = window as unknown as GoogleWindow;
      win.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // use sua variável de ambiente
        callback: handleGoogleResponse,
      });
      win.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large', width: '250' }
      );
    };
  }, []);

  // Callback do Google
  const handleGoogleResponse = async (response: { credential: string }) => {
    const idToken = response.credential;
    try {
      const res = await api.post('/auth/google', { id_token: idToken }); // CORREÇÃO: id_token
      const data = res.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.name);
      navigate(`/profile/${data.userId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data.error || 'Erro ao logar com Google');
    }
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <h2>Login</h2>
        {error && <S.Error>{error}</S.Error>}

        {/* Formulário tradicional */}
        <S.Form onSubmit={handleLogin}>
          <S.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <S.Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <S.Button type="submit">Entrar</S.Button>
        </S.Form>

        <S.Separator>ou</S.Separator>

        {/* Botão do Google */}
        <div
          id="google-signin-button"
          style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
        />
      </S.FormWrapper>
    </S.Container>
  );
};

export default Login;
