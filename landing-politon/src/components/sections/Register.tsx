/**
 * Register.tsx — POLITÓN 2026
 *
 * Cierre de la página: solo el hashtag del evento, centrado.
 */
import React from 'react'

const Register: React.FC = () => (
  <footer id="registro" className="reg-section reg-footer">
    {/* Grain de fondo */}
    <div className="reg-grain" aria-hidden="true" />

    <p className="reg-hashtag">#POLITÓN2026</p>
  </footer>
)

export default Register
