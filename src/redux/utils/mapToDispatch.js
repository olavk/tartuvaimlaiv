export default function mapToDispatch(func, dispatch) {
  return (...args) => {
    dispatch(func(...args));
  };
}
