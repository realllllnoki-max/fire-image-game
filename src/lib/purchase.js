// Client-side purchase state management
// Phase 2: localStorage-based (will be replaced by Supabase verification in Phase 3)

const STORAGE_KEY = "fire-conference-access";

export function hasAccess() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "granted";
  } catch {
    return false;
  }
}

export function grantAccess(sessionId) {
  try {
    localStorage.setItem(STORAGE_KEY, "granted");
    if (sessionId) localStorage.setItem(`${STORAGE_KEY}-session`, sessionId);
  } catch {
    // localStorage unavailable; user will need to purchase again
  }
}

export function revokeAccess() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(`${STORAGE_KEY}-session`);
  } catch {
    // noop
  }
}

// Read ?purchase=success&session_id=cs_test_... from URL and grant access
export function checkPurchaseRedirect() {
  if (typeof window === "undefined") return { status: "idle" };
  const params = new URLSearchParams(window.location.search);
  const purchase = params.get("purchase");
  const sessionId = params.get("session_id");

  if (purchase === "success" && sessionId) {
    grantAccess(sessionId);
    // Clean URL
    window.history.replaceState({}, "", window.location.pathname);
    return { status: "success", sessionId };
  }
  if (purchase === "cancelled") {
    window.history.replaceState({}, "", window.location.pathname);
    return { status: "cancelled" };
  }
  return { status: "idle" };
}
