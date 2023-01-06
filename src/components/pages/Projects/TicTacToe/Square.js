function Square(props) {
  return (
    <>
      <div className={props.className} {...props}>
        {props.x ? "x" : props.o ? "o" : ""}
      </div>
    </>
  );
}

export default Square;
