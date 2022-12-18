import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    fontSize: 20,
    padding: 10,
    borderWidth: 5,
    color: "#aaa198",
    borderRadius: 10,
    backgroundColor: "#faf1e3",
  };
  return notification && <div style={style}>{notification}</div>;
};

export default Notification;
