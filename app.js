import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

let currentUser = null;

window.loginGoogle = async function () {
    try {
        const result = await signInWithPopup(auth, provider);
        currentUser = result.user;

        document.getElementById("login").classList.add("hidden");
        document.getElementById("profile").classList.remove("hidden");
    } catch (e) {
        alert("Erro ao logar");
    }
};

window.createAccount = async function () {
    const nick = document.getElementById("username").value;
    const senha = document.getElementById("password").value;

    if (!nick || !senha) {
        alert("Preencha tudo");
        return;
    }

    await setDoc(doc(db, "users", currentUser.uid), {
        email: currentUser.email,
        nickname: nick,
        password: senha
    });

    document.getElementById("profile").classList.add("hidden");
    document.getElementById("launcher").classList.remove("hidden");
};

window.play = function () {
    alert("Entrando no servidor...");
};
