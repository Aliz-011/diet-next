import AccountBodyInfo from '@/components/account/account-body-info';
import AccountProfileForm from '@/components/account/account-profile-form';
import AccountWeightForm from '@/components/account/account-weight-form';

const AccountPage = () => {
  return (
    <>
      {/* profile form */}
      <AccountProfileForm />

      {/* weight form */}
      <AccountWeightForm />

      {/* bmi & other stuffs */}
      <AccountBodyInfo />
    </>
  );
};

export default AccountPage;
