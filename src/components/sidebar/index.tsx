import { Avatar } from 'radix-ui';
import { Logo } from './Logo';
import { Navigation } from '../navigation';

export function SideBar() {
  return (
    <aside className="flex h-screen flex-col border-r bg-blue-ra-900 px-5 py-8">
      <Navigation />

      <div className="mt-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <Avatar.Root>
            <Avatar.Image
              className="h-12 w-12 rounded-full object-cover"
              src="https://media.licdn.com/dms/image/v2/C4D03AQGGvm_iXeyLGA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1646667922019?e=1744243200&v=beta&t=5vRR7b-iJfZH1bxM02ISq2G_3x8c_HxHPIKX_rKaHH4"
              alt="Colm Tuite"
            />
            <Avatar.Fallback className="" delayMs={600}>
              CT
            </Avatar.Fallback>
          </Avatar.Root>

          <div>
            <h3 className="text-2xl font-bold text-white">Fernando Y.</h3>
            <p className="text-xs text-blue-50 opacity-45">
              fernando.yasumoto@gmail.com
            </p>
          </div>
        </div>

        <span className="block h-0.5 w-11/12 bg-white" />

        <Logo />
      </div>
    </aside>
  );
}
