import { Slot, component$ } from '@builder.io/qwik';
import { Link, useLocation, type LinkProps } from '@builder.io/qwik-city';
 
type NavLinkProps = LinkProps & { activeClass?: string, disabledClass?: string };
 
export const NavLink = component$(
  ({ activeClass, disabledClass, ...props }: NavLinkProps) => {
    const location = useLocation();
    const toPathname = props.href ?? '';
    const locationPathname = location.url.pathname;
 
    const isActive = locationPathname === toPathname || locationPathname === toPathname + '/';
 
    return (
      <Link
        {...props}
        class={`${props.class || ''} ${isActive ? activeClass : disabledClass || ''}`}
        
      >
        <Slot />
      </Link>
    );
  }
);