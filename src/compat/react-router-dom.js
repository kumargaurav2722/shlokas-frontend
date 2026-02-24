import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const Link = ({ to, href, ...props }) => {
  const target = href || to || "/";
  return <NextLink href={target} {...props} />;
};

export const useNavigate = () => {
  const router = useRouter();
  return (to) => router.push(to);
};

export const useParams = () => {
  const router = useRouter();
  return router.query || {};
};

export const useSearchParams = () => {
  const router = useRouter();
  const params = useMemo(() => {
    const query = router.asPath.split("?")[1] || "";
    return new URLSearchParams(query);
  }, [router.asPath]);

  const setParams = (next) => {
    const nextParams = next instanceof URLSearchParams ? next : new URLSearchParams(next);
    router.push(`${router.pathname}?${nextParams.toString()}`);
  };

  return [params, setParams];
};

export const Navigate = ({ to }) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.replace(to);
  }
  return null;
};
