import  { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Function to set user as admin
export const makeUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const userDocRef = doc(db, "users", userId);
    
    // Check if user exists first
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      console.error("User does not exist");
      return false;
    }
    
    // Update user document to set isAdmin flag to true
    await setDoc(userDocRef, {
      isAdmin: true
    }, { merge: true });

    console.log("User is now an admin!");
    return true;
  } catch (error) {
    console.error("Error making user an admin:", error);
    return false;
  }
};

// Function to check if user is admin
export const checkIfUserIsAdmin = async (userId: string): Promise<boolean> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists() && userDoc.data().isAdmin === true) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
 