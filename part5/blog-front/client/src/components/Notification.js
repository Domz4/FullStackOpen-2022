const Notification = ({ msg }) => {
  if (msg === null) return null;
  if (msg.includes("error")) {
    return <div className="error">{msg.substring(5)}</div>;
  }
  return <div className="success">{msg}</div>;
};

export default Notification;
