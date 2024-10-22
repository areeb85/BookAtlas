'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useSession } from 'next-auth/react';
import '../../../globals.css';
import Navbar from '@/app/components/Navbar/page';
import { Divider } from 'primereact/divider';
import './signIn.css';

export default function SignInPage() {
    
    const { status } = useSession();

    const handleSignIn = () => {
        signIn('google', { callbackUrl: '/' });
    }

    if (status === "loading") {
        return (
            <div className="spinner-container">
            <ProgressSpinner />
            </div>
        );
    }

    return (
    <div className='animate-fade-in'>
        <Navbar />
        <div className="centered-container">
            <div className="form-container">
                <Button
                    label="Sign in with Google"
                    icon="pi pi-google"
                    className="p-button-rounded p-button-success google-signin-button"
                    onClick={handleSignIn}
                />
            </div>
        </div>
    </div>

    );
}
