export function Stars(props) {
  const {star} = props;
  return (
    <span className="material-icons fz-grade">
      {"grade ".repeat(star)}
    </span>
  );
};