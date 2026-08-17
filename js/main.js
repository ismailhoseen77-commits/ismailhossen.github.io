// Google Login with Popup & Redirect Fallback
function loginWithGoogle() {
    auth.signInWithPopup(googleProvider).catch(error => {
        if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
            // পপ-আপ ব্লক হলে রিডাইরেক্ট লগইন করবে
            auth.signInWithRedirect(googleProvider);
        } else {
            alert("লগইন সমস্যা: " + error.message);
        }
    });
}

// Redirect Result Handle
auth.getRedirectResult().then(result => {
    if (result && result.user) {
        console.log("Logged in via redirect:", result.user);
    }
}).catch(e => {
    console.error("Redirect login error:", e);
});

