'use client';

import { useState } from 'react';
import { Avatar } from 'radix-ui';
import { Logo } from './Logo';
import { Navigation } from '../navigation';
import { useUser } from '@/contexts/UserContext';
import { Menu, X } from 'lucide-react';

export function SideBar() {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <button
        className="fixed right-4 top-4 z-50 rounded bg-blue-ra-900 p-2 md:hidden"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X color="white" /> : <Menu color="white" />}
      </button>

      <aside className="hidden h-full flex-col border-r bg-blue-ra-900 px-5 py-8 md:flex">
        <Navigation />

        {user && (
          <div className="mt-auto flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <Avatar.Root>
                <Avatar.Image
                  className="h-12 w-12 rounded-full object-cover"
                  src={user.avatar}
                  alt="Colm Tuite"
                />
                <Avatar.Fallback className="" delayMs={600}>
                  CT
                </Avatar.Fallback>
              </Avatar.Root>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  {user.firstName} {Array.from(user.lastName)[0]}.
                </h3>
                <p className="text-xs text-blue-50 opacity-45">{user.email}</p>
              </div>
            </div>

            <span className="block h-0.5 w-11/12 bg-white" />

            <Logo />
          </div>
        )}
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      <div
        className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-blue-ra-900 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
      >
        <div className="flex h-full flex-col p-6">
          <Navigation />

          {user && (
            <div className="mt-auto flex flex-col items-center gap-6">
              <div className="flex items-center gap-2">
                <Avatar.Root>
                  <Avatar.Image
                    className="h-12 w-12 rounded-full object-cover"
                    src={user.avatar}
                    alt="Colm Tuite"
                  />
                  <Avatar.Fallback className="" delayMs={600}>
                    CT
                  </Avatar.Fallback>
                </Avatar.Root>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {user.firstName} {Array.from(user.lastName)[0]}.
                  </h3>
                  <p className="text-xs text-blue-50 opacity-45">
                    {user.email}
                  </p>
                </div>
              </div>

              <span className="block h-0.5 w-11/12 bg-white" />

              <Logo />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
