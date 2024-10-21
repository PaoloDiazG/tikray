import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  return (
    <GoogleOAuthProvider clientId="849933662298-sd8u66b5mot8pavhoknk0q2j6mrvqcs3.apps.googleusercontent.com">
      <div>
        <h1>Iniciar Sesión en Tikray</h1>
        <GoogleLogin
          onSuccess={(response) => console.log('Autenticación exitosa', response)}
          onError={() => console.log('Error en la autenticación')}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
