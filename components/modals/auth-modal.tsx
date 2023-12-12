'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSessionContext } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import Modal from './modal';
import useAuthModal from '@/hooks/use-auth-modal';
import { createClient } from '@/utils/supabase/client';

const AuthModal = () => {
  const router = useRouter();

  const supabaseClient = createClient();
  const { session } = useSessionContext();

  const { isOpen, onClose } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      title="Welcome back!"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        socialLayout="horizontal"
        supabaseClient={supabaseClient}
        providers={['google', 'facebook']}
        appearance={{
          theme: ThemeSupa,
        }}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email address',
              password_label: 'Password',
            },
          },
        }}
        redirectTo={`${location.origin}/auth/callback`}
      />
    </Modal>
  );
};

export default AuthModal;
