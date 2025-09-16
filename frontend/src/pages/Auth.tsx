import React, { useState } from 'react';
import axios from 'axios';
import UsersRegister from '../components/UsersRegister';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('userName', res.data.name);
      // Redirecionar para a página de perfil
      window.location.href = `/profile/${res.data.userId}`;
    } catch (err: any) {
      if (err.response) {
        setLoginError(err.response.data.error);
      } else {
        setLoginError('Erro ao conectar com o servidor');
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '50px' }}>
      <div>
        <h2>Login</h2>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>

      <div>
        <h2>Registrar</h2>
        <UsersRegister />
      </div>
    </div>
  );
};

export default Auth;