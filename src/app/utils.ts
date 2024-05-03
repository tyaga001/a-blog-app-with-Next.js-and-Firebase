import { signInWithPopup, signOut } from "firebase/auth";
import { auth} from "../../firebase";


export const handleSignIn = (provider: any, authProvider: any) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = authProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            if (token) {
              const user = result.user;
                console.log({ displayName: user.displayName, u_id: user.uid })
                localStorage.setItem("user", JSON.stringify({ displayName: user.displayName, u_id: user.uid }))
                window.location.replace("/")
            }
        })
      .catch((error) => {
         alert(`Refresh page! An error occurred while signing out - ${error.message}`)
      });
};

export const handleSignOut = () => { 
    signOut(auth).then(() => {
        localStorage.removeItem("user")
        window.location.replace("/")
    }).catch((error) => {
        alert(`Refresh page! An error occurred while signing out - ${error.message}`)
    });
}

export const getCurrentDate = (): string => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const suffixes = ["th", "st", "nd", "rd"];
  const suffix = suffixes[(day - 1) % 10 > 3 ? 0 : (day - 1) % 10];

  const months = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", 
    "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
  ];
  const month = months[monthIndex];

  return `${day}${suffix} ${month} ${year}`;
};

export const slugifySentences = (sentence: string): string => {
  // Remove special characters and replace spaces with hyphens
  const slug = sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  // Generate 5 random letters
  const randomLetters = Array.from({ length: 5 }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26))
  ).join("");

  return `${slug}-${randomLetters}`;
};

export const extractSlugFromURL = (url: string): string => {
  const parts = url.split("/");
  const slug = parts.slice(2).join("/"); 
  return slug;
};
