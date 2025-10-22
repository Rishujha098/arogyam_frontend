import { getApps } from "firebase/app";
import {



    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";

// Reuse the already-configured Firebase app to avoid double initialization
// and ensure we use the correct project keys defined in firebase.js
import { app } from "./firebase";
// Ensure at least one app exists (firebase.js already initializes with keys)
// Fallback is not needed here; if no app exists something is wrong with setup
const auth = getAuth(app);

// Helper to normalize error messages
function _formatError(err) {
    if (!err) return "Unknown error";
    if (err.message) return err.message;
    return String(err);
}

/**
 * Sign up with email and password. Optionally set displayName.
 * Returns { user, success, error }
 */
async function signUpWithEmail(email, password, displayName) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
            await updateProfile(res.user, { displayName });
        }
        return { success: true, user: res.user, error: null };
    } catch (err) {
        return { success: false, user: null, error: _formatError(err) };
    }
}

/**
 * Sign in with email and password.
 * Returns { user, success, error }
 */
async function signInWithEmail(email, password) {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: res.user, error: null };
    } catch (err) {
        return { success: false, user: null, error: _formatError(err) };
    }
}

/**
 * Sign out current user.
 * Returns { success, error }
 */
async function signOutUser() {
    try {
        await signOut(auth);
        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: _formatError(err) };
    }
}

/**
 * Send password reset email.
 * Returns { success, error }
 */
async function sendPasswordReset(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: _formatError(err) };
    }
}

/**
 * Sign in with Google popup.
 * Returns { user, success, error }
 */
async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        return { success: true, user: res.user, error: null };
    } catch (err) {
        return { success: false, user: null, error: _formatError(err) };
    }
}


/**
 * Subscribe to auth state changes.
 * callback receives (user) where user is null when signed out.
 * Returns unsubscribe function.
 */
function subscribeToAuthChanges(callback) {
    return onAuthStateChanged(auth, callback);
}

export {
    auth,
    signUpWithEmail,
    signInWithEmail,
    signOutUser,
    sendPasswordReset,
    signInWithGoogle,
    subscribeToAuthChanges,
};