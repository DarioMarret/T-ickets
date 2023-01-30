import { useEffect } from "react";

const useScript = (url, onload) => {
    useEffect(() => {
        const script = document.createElement("script");

        script.src = url;
        script.onload = onload;

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [url, onload]);
};

export default useScript;


const initAuth = () => {
    return window.gapi.auth2.init({
        client_id: "381358769148-bs6mm0ir6otvvk92dilpae0n59sif6n3.apps.googleusercontent.com", //paste your client ID here
        scope: "https://www.googleapis.com/auth/analytics.readonly",
    });
};
export const checkSignedIn = () => {
    return new Promise((resolve, reject) => {
        initAuth() //calls the previous function
            .then(() => {
                const auth = window.gapi.auth2.getAuthInstance(); //returns the GoogleAuth object
                resolve(auth.isSignedIn.get()); //returns whether the current user is currently signed in
            })
            .catch((error) => {
                reject(error);
            }); 
    });
};
export const renderButton = () => {
    window.gapi.signin2.render("signin-button", {
        scope: "profile email",
        width: 240,
        height: 50,
        longtitle: true,
        theme: "dark",
        onsuccess: onSuccess,
        onfailure: onFailure,
    });
};

const onSuccess = (googleUser) => {
    console.log("Logged in as: " + googleUser.getBasicProfile().getName());
};

const onFailure = (error) => {
    console.log(error);
};