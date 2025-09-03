/*

BACK END:

  const [open, setOpen] = useState(true);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      {open && (
        <Modal
          bin={{
            UUIDv4: "c103d77e-0593-40b3-a07a-0cdf7418c630",
            auth_token: "_RUxATXAvHPVYVdw_L6PHezY7QUo9RWrs-zvf6CryDwa",
            url: "https://example.com"
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );

*/

const Modal = ({ bin = {}, onClose }) => {
  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h1 style={styles.body}>Created</h1>
        <div>
          Basket '{bin.UUIDv4.slice(0, 8)}' has been successfully created!
        </div>
        <div style={styles.token}>Your token is: {bin.auth_token}</div>

        <div style={styles.actions}>
          <button 
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={onClose}>Close</button>
          <button onClick={() => window.open(bin.url, "_blank")}>
            Open Basket
          </button>
        </div>
      </div>
    </div>
  )
};

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", // darker backdrop
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    maxWidth: "480px",
    width: "90%",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    fontFamily: "system-ui, sans-serif",
    lineHeight: 1.4,
    color: "#333",
  },
  header: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
    fontWeight: "600",
    borderBottom: "1px solid #eee",
    paddingBottom: "0.5rem",
  },
  body: {
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  token: {
    marginTop: "0.5rem",
    padding: "0.5rem",
    backgroundColor: "#f6f8fa",
    borderRadius: "6px",
    fontFamily: "monospace",
    fontSize: "0.9rem",
    overflowWrap: "anywhere",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
    marginTop: "1.5rem",
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  primaryButton: {
    backgroundColor: "#0a66ff",
    color: "#fff",
    border: "1px solid #0a66ff",
  },
};


export default Modal;