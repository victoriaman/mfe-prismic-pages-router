import clsx from "clsx";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const basePath = publicRuntimeConfig.basePath || '';

type LogoutButtonProps = {
  className?: string,
}

export default function LogoutButton({
  className,
  ...restProps
}: LogoutButtonProps) {
  const handleLogout = async () => {
    await fetch("/api/logout"); // clears cookie + redirects
    window.location.href = `${basePath}/login`;
  };

  return (
    <button onClick={handleLogout} className={clsx(className)}
      {...restProps}>
      Logout
    </button>
  );
}
