import EmailForm from '../components/EmailForm';
import AppNavbar from '../components/AppNavbar';

function EmailPage() {
  return (
    <>
    <AppNavbar />
    <div className="email-page">
      <EmailForm />
    </div>
    </>
  );
}

export default EmailPage;
