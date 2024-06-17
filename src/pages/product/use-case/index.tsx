import UseCaseSelect from "../../../components/@report/use-case";

const UseCasePage = () => {
  // const dispatch = useAppDispatch();
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/new-report") {
  //     dispatch(getNewSession());
  //     dispatch(
  //       setSession({
  //         session_data: {},
  //       }),
  //     );
  //   }
  // }, [dispatch, location.pathname]);

  return (
    <>
      <UseCaseSelect />
    </>
  );
};

export default UseCasePage;
