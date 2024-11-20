import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Login() {
  const handleCallbackResponse = (response: any) => {
    const decodedToken: any = jwtDecode(response.credential);
    console.log("Decoded Token:", decodedToken);
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "987969491643-hjg3qumc7lhl39bkufiads8mhvtohm9b.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return <div id="signInDiv"></div>;
}

export default Login;
