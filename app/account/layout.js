import SideNavigation from "@/app/_components/SideNavigation1";

function Layout({ children }) {
  return (
    <div className="h-full md:grid md:gap-12 md:grid-cols-[4rem_1fr] lg:grid-cols-[16rem_1fr]">
      <SideNavigation />
      <div className="pt-8 md:py-1 md:pt-0">{children}</div>
    </div>
  );
}

export default Layout;
