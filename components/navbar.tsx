'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { HelpCircle, SlidersHorizontal } from 'lucide-react';
import { useTour } from '@reactour/tour';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

import useAuthModal from '@/hooks/use-auth-modal';
import { useUser } from '@/hooks/use-user';
import { createClient } from '@/utils/supabase/client';
import { useSearchModal } from '@/hooks/use-search-modal';

const Navbar = () => {
  const supabaseClient = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsOpen } = useTour();

  const [avatarUrl, setAvatarUrl] = useState('');
  const searchModal = useSearchModal((state) => state);

  const { onOpen } = useAuthModal();
  const { user, userDetails } = useUser();

  useEffect(() => {
    async function downloadImage() {
      try {
        const { data, error } = await supabaseClient.storage
          .from('avatars')
          .download(userDetails?.avatar_url!);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    downloadImage();
  }, [supabaseClient, setAvatarUrl, userDetails]);

  const handleTour = useCallback(() => {
    if (pathname !== '/') {
      router.push('/');
    }
    setIsOpen(true);
  }, [pathname, router, setIsOpen]);

  return (
    <header className="z-20 border-b">
      <nav>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-end sm:justify-between mx-auto py-4 px-4 md:px-0">
          <Link href="/" className="hidden sm:flex sm:items-center">
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
              DIGEST
            </span>
          </Link>

          <div>
            <ul className="font-medium flex w-full items-center gap-x-4 md:p-0 md:gap-x-4 md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild className="mt-2">
                      <button onClick={handleTour}>
                        <HelpCircle size={18} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Guide me</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <Button onClick={() => searchModal.onOpen()} variant="outline">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                </Button>
              </li>
              <li>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <Avatar>
                        <AvatarImage
                          src={
                            avatarUrl ? avatarUrl : '/images/placeholder.jpg'
                          }
                          alt="avatar"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      side="bottom"
                    >
                      <DropdownMenuLabel>
                        {userDetails?.full_name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => router.push('/account')}
                          className="cursor-pointer"
                        >
                          Profile
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <form action="/auth/sign-out" method="post">
                          <button type="submit">Log out</button>
                        </form>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <button onClick={() => onOpen()}>
                    <Avatar>
                      <AvatarImage
                        src={avatarUrl ? avatarUrl : '/images/placeholder.jpg'}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
