"use client";

import { useLanguage } from "../../lib/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <form action="/login" method="post">
      <div>
        <label htmlFor="email">{t.login.email}</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="password">{t.login.password}</label>
        <input id="password" name="password" type="password" required />
      </div>
      <button type="submit">{t.login.submit}</button>
    </form>
  );
}
