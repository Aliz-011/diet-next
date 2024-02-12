import { cookies } from 'next/headers';
import Link from 'next/link';

import { AccountAdditionalInfo } from '@/components/account/account-additional-info';
import AccountBodyInfo from '@/components/account/account-body-info';
import AccountProfileForm from '@/components/account/account-profile-form';
import AccountWeightForm from '@/components/account/account-weight-form';
import { createClient } from '@/utils/supabase/server';

const AccountPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link href={'/'}>You are not logged in.</Link>
      </main>
    );
  }

  return (
    <>
      {/* profile form */}
      <AccountProfileForm />

      {/* weight form */}
      <AccountWeightForm />

      {/* bmi & other stuffs */}
      <AccountBodyInfo />

      {/* Additional Info */}
      <AccountAdditionalInfo />
    </>
  );
};

export default AccountPage;
