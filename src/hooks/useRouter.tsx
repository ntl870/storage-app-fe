import {
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";

const useRouter = () => {
  const navigate = useNavigate();
  const { pathname, state: locationState } = useLocation();
  const params = useParams();

  const [searchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams.entries());

  const splittedPathname = pathname.split("/").slice(1);

  const goBack = () => {
    navigate(-1);
  };

  return {
    params,
    pathname,
    locationState,
    searchParamsObject,
    navigate,
    splittedPathname,
    goBack,
  };
};

export default useRouter;
