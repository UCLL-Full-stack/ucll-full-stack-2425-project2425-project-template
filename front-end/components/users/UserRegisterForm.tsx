import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onSubmit: (data: any) => void;
};

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = t('register.nameRequired');
    if (!email.trim()) newErrors.email = t('register.emailRequired');
    if (!password.trim()) newErrors.password = t('register.passwordRequired');
    if (!role.trim()) newErrors.role = t('register.roleRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name, email, password, role });
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{t('register.label.name')}</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label>{t('register.label.email')}</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>{t('register.label.password')}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div>
        <label>{t('register.label.role')}</label>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        {errors.role && <p className="error">{errors.role}</p>}
      </div>
      <button type="submit">{t('register.button')}</button>
    </form>
  );
};

export default RegisterForm;