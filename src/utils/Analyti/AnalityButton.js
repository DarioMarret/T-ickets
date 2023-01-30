import { useRef } from "react";
import useScript from ".";

export default function GoogleLogin({
    onGoogleSignIn = () => { },
    text = "signin_with",
    // feel free to add more options here
}) {
    const googleSignInButton = useRef(null);

    useScript("https://accounts.google.com/gsi/client", () => {
        window.google.accounts.id.initialize({
            client_id: "381358769148-30tglog14ossvhoe4oenpgocjvuem4b3.apps.googleusercontent.com",
            callback: onGoogleSignIn,
        });
        window.google.accounts.id.renderButton(
            googleSignInButton.current,
            { theme: "outline", size: "large", text, width: "250" } // customization attributes
        );
    });

    return <div className="test" ref={googleSignInButton}></div>;
}