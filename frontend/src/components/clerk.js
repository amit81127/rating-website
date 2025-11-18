// ClerkAuth.js
import React from "react";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

const Clerk = () => {
  const { user } = useUser();

  return (
    <div className="d-flex gap-2 align-items-center">
      {/* Shown when user is NOT signed in */}
      <SignedOut>
        <SignInButton>
          <button className="btn btn-primary">Login</button>
        </SignInButton>
      </SignedOut>

      {/* Shown when user IS signed in */}
      <SignedIn>
        <span className="me-2">
          Welcome, {user?.firstName ? user.firstName : "User"}
        </span>
        <SignOutButton>
          <button className="btn btn-danger">Logout</button>
        </SignOutButton>
      </SignedIn>
    </div>
  );
};

export default Clerk;
