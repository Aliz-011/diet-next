import { Wrapper } from './_components/wrapper';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen-xl mx-auto h-full pb-24 pt-8 px-4 sm:px-0">
      <Wrapper>{children}</Wrapper>
    </div>
  );
};

export default MainLayout;
