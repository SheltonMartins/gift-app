import React, { useState } from 'react';
import axios from 'axios';

interface UserForm {
  name: string;
  email: string;
  password: string;
  bio?: string;
  profile_picture?: string;
}

const UsersRegister = () => {
  const [form, setForm] = useState<UserForm>({
    name: '',
    email: '',
    password: '',
    bio: '',
    profile_picture: ''
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, form);
      setMessage(`Usuário cadastrado com sucesso! ID: ${res.data.userId}`);
      setForm({ name: '', email: '', password: '', bio: '', profile_picture: '' });
    } catch (err: any) {
      if (err.response) {
        setMessage(`Erro: ${err.response.data.error}`);
      } else {
        setMessage('Erro ao conectar com a API');
      }
    }
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={form.bio} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Foto (URL):</label>
          <input type="text" name="profile_picture" value={form.profile_picture} onChange={handleChange} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default UsersRegister;